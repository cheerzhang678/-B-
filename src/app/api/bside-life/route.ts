import { NextResponse } from "next/server";
import { BsideLifeRequest, BsideLifeResponse } from "@/lib/bsideLifeTypes";
import { buildPrompt } from "@/lib/bsideLifePrompt";
import { generateMockResponse } from "@/lib/bsideLifeMock";

export async function POST(request: Request) {
  try {
    const body: BsideLifeRequest = await request.json();
    const { direction, dreamMajor } = body;

    let bsideMajor: string;
    switch (direction) {
      case "hottest":
        const { getHottestMajor } = await import("@/data/bsideLifeMajors");
        bsideMajor = getHottestMajor(body.year);
        break;
      case "dream":
        bsideMajor = dreamMajor || "哲学";
        break;
      default:
        const { getRandomMajor } = await import("@/data/bsideLifeMajors");
        bsideMajor = getRandomMajor(body.actualMajor);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      const mockResponse = generateMockResponse(body, bsideMajor);
      return NextResponse.json(mockResponse);
    }

    const prompt = buildPrompt(body, bsideMajor);

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "你是一位命运分叉叙事大师，擅长写出克制、真实、有质感的人生故事。始终以JSON格式回复。" },
          { role: "user", content: prompt },
        ],
        temperature: 0.85,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error("LLM API error:", response.status, await response.text());
      const mockResponse = generateMockResponse(body, bsideMajor);
      return NextResponse.json(mockResponse);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");

      const parsed: BsideLifeResponse = JSON.parse(jsonMatch[0]);
      parsed.bsideMajor = bsideMajor;
      return NextResponse.json(parsed);
    } catch {
      console.error("Failed to parse LLM response as JSON, falling back to mock");
      const mockResponse = generateMockResponse(body, bsideMajor);
      return NextResponse.json(mockResponse);
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
