"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface StepInputProps {
  onSubmit: (year: number, score: number, actualMajor: string) => void;
}

const popularMajors = [
  "计算机科学与技术", "金融学", "法学", "临床医学", "英语",
  "会计学", "工商管理", "土木工程", "建筑学", "新闻学",
  "心理学", "人工智能", "电子信息工程", "国际经济与贸易", "汉语言文学",
];

export default function StepInput({ onSubmit }: StepInputProps) {
  const [year, setYear] = useState(2015);
  const [score, setScore] = useState(600);
  const [actualMajor, setActualMajor] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const canSubmit = actualMajor.trim().length > 0;

  const filteredMajors = popularMajors.filter(
    (m) => m.includes(actualMajor) && m !== actualMajor
  );

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">你的高考记忆</h2>
        <p className="text-white/50 text-sm">那段改变一切的时光</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-white/70 text-sm">高考年份</label>
          <input
            type="range"
            min={1977}
            max={2025}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="flex justify-between text-white/40 text-xs">
            <span>1977</span>
            <span className="text-amber-400 text-lg font-bold">{year}</span>
            <span>2025</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white/70 text-sm">高考分数</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            min={200}
            max={750}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-center text-xl focus:outline-none focus:border-amber-400/50 transition-colors"
          />
        </div>

        <div className="space-y-2 relative">
          <label className="text-white/70 text-sm">实际就读专业</label>
          <input
            type="text"
            value={actualMajor}
            onChange={(e) => {
              setActualMajor(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="输入你的专业..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-amber-400/50 transition-colors"
          />
          {showSuggestions && filteredMajors.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-white/10 rounded-lg overflow-hidden shadow-xl">
              {filteredMajors.slice(0, 5).map((m) => (
                <button
                  key={m}
                  onMouseDown={() => {
                    setActualMajor(m);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 text-white/80 hover:bg-white/10 transition-colors text-sm"
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => canSubmit && onSubmit(year, score, actualMajor.trim())}
        disabled={!canSubmit}
        className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
          canSubmit
            ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
            : "bg-white/5 text-white/20 cursor-not-allowed"
        }`}
      >
        下一步
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
