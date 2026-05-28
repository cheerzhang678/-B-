"use client";

import { useRef, useState } from "react";
import { Download, RefreshCw, X } from "lucide-react";
import { BsideLifeResponse } from "@/lib/bsideLifeTypes";

interface ShareOverlayProps {
  response: BsideLifeResponse;
  year: number;
  score: number;
  actualMajor: string;
  onClose: () => void;
  onRegenerate: () => void;
}

export default function ShareOverlay({
  response,
  year,
  score,
  actualMajor,
  onClose,
  onRegenerate,
}: ShareOverlayProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: "#0f172a",
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `人生B面-${actualMajor}-${response.bsideMajor}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to save image:", err);
    } finally {
      setSaving(false);
    }
  };

  const topNodes = response.timeline.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Share card */}
        <div
          ref={cardRef}
          className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 space-y-5"
        >
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-400">你的人生B面</h3>
            <p className="text-white/40 text-sm mt-1">
              {year}年 · {score}分 · {actualMajor} → {response.bsideMajor}
            </p>
          </div>

          {/* Compact timeline */}
          <div className="space-y-3">
            {topNodes.map((node) => (
              <div key={node.year} className="flex gap-2 text-xs">
                <div className="w-10 text-white/30 shrink-0">{node.year}</div>
                <div className="flex-1 text-blue-300/60 truncate">{node.aSide.title}</div>
                <div className="flex-1 text-amber-300/60 truncate">{node.bSide.title}</div>
              </div>
            ))}
          </div>

          {/* Destiny footnote */}
          <div className="border-t border-amber-400/10 pt-3">
            <div className="text-amber-400/40 text-xs mb-1">命运注脚 · {response.destinyFootnote.sense}</div>
            <div className="text-amber-100/80 text-sm" style={{ fontFamily: "Georgia, serif" }}>
              {response.destinyFootnote.detail}
            </div>
          </div>

          {/* Branding */}
          <div className="text-center text-white/20 text-xs">
            AI生成，仅供娱乐
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onRegenerate}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            重新生成
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 rounded-xl bg-amber-400 text-slate-900 font-medium flex items-center justify-center gap-2 hover:bg-amber-300 transition-colors disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {saving ? "保存中..." : "保存图片"}
          </button>
        </div>
      </div>
    </div>
  );
}
