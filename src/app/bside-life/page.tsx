"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, Share2, RotateCcw } from "lucide-react";
import Link from "next/link";
import { BsideLifeResponse, Direction, PageState } from "@/lib/bsideLifeTypes";
import StepInput from "@/components/bside-life/StepInput";
import StepDirection from "@/components/bside-life/StepDirection";
import StepGenerating from "@/components/bside-life/StepGenerating";
import TimelineDisplay from "@/components/bside-life/TimelineDisplay";
import DestinyFootnote from "@/components/bside-life/DestinyFootnote";
import ShareOverlay from "@/components/bside-life/ShareOverlay";

export default function BsideLifePage() {
  const [pageState, setPageState] = useState<PageState>("input");
  const [year, setYear] = useState(2015);
  const [score, setScore] = useState(600);
  const [actualMajor, setActualMajor] = useState("");
  const [direction, setDirection] = useState<Direction>("random");
  const [dreamMajor, setDreamMajor] = useState<string>();
  const [response, setResponse] = useState<BsideLifeResponse | null>(null);

  const generate = useCallback(async () => {
    setPageState("generating");

    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 3000));

    try {
      const res = await fetch("/api/bside-life", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year,
          score,
          actualMajor,
          direction,
          dreamMajor,
        }),
      });

      const data: BsideLifeResponse = await res.json();
      await minDelay;
      setResponse(data);
      setPageState("result");
    } catch (err) {
      console.error("Generation failed:", err);
      await minDelay;
      setPageState("result");
    }
  }, [year, score, actualMajor, direction, dreamMajor]);

  const handleInputSubmit = (y: number, s: number, m: string) => {
    setYear(y);
    setScore(s);
    setActualMajor(m);
    setPageState("direction");
  };

  const handleDirectionSelect = (dir: Direction, dream?: string) => {
    setDirection(dir);
    setDreamMajor(dream);
    generate();
  };

  const handleRegenerate = () => {
    setResponse(null);
    generate();
  };

  const handleStartOver = () => {
    setResponse(null);
    setPageState("input");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Link>

          {pageState === "result" && (
            <div className="flex gap-2">
              <button
                onClick={handleStartOver}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white/80 text-sm transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重来
              </button>
              <button
                onClick={() => setPageState("sharing")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 text-amber-400/70 hover:text-amber-400 text-sm transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                分享
              </button>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="px-4 py-8 md:px-8 md:py-12">
          {pageState === "input" && (
            <div className="flex flex-col items-center">
              <div className="mb-10 text-center space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                  你的人生B面
                </h1>
                <p className="text-white/40 text-base md:text-lg max-w-md mx-auto">
                  如果当初选了另一条路，现在的你会是什么样？
                </p>
              </div>
              <StepInput onSubmit={handleInputSubmit} />
            </div>
          )}

          {pageState === "direction" && (
            <div className="flex flex-col items-center">
              <StepDirection year={year} onSelect={handleDirectionSelect} />
            </div>
          )}

          {pageState === "generating" && (
            <div className="flex flex-col items-center">
              <StepGenerating />
            </div>
          )}

          {pageState === "result" && response && (
            <div className="flex flex-col items-center">
              <TimelineDisplay
                timeline={response.timeline}
                actualMajor={actualMajor}
                bsideMajor={response.bsideMajor}
              />
              <DestinyFootnote footnote={response.destinyFootnote} />
            </div>
          )}

          {pageState === "sharing" && response && (
            <ShareOverlay
              response={response}
              year={year}
              score={score}
              actualMajor={actualMajor}
              onClose={() => setPageState("result")}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
