"use client";

import { useState } from "react";
import { Shuffle, Flame, Heart, ArrowRight } from "lucide-react";
import { Direction } from "@/lib/bsideLifeTypes";
import { getHottestMajor } from "@/data/bsideLifeMajors";

interface StepDirectionProps {
  year: number;
  onSelect: (direction: Direction, dreamMajor?: string) => void;
}

const directions: {
  type: Direction;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}[] = [
  {
    type: "random",
    icon: <Shuffle className="w-6 h-6" />,
    title: "随机盲盒",
    subtitle: "命运替你翻开下一页",
    color: "from-violet-500 to-purple-600",
  },
  {
    type: "hottest",
    icon: <Flame className="w-6 h-6" />,
    title: "当年最热专业",
    subtitle: "如果跟了风口",
    color: "from-orange-500 to-red-500",
  },
  {
    type: "dream",
    icon: <Heart className="w-6 h-6" />,
    title: "心动的专业",
    subtitle: "那个没敢选的",
    color: "from-pink-500 to-rose-500",
  },
];

export default function StepDirection({ year, onSelect }: StepDirectionProps) {
  const hottestMajor = getHottestMajor(year);
  const [dreamMajor, setDreamMajor] = useState("");
  const [showDreamInput, setShowDreamInput] = useState(false);

  const handleSelect = (type: Direction) => {
    if (type === "dream" && !showDreamInput) {
      setShowDreamInput(true);
      return;
    }
    if (type === "dream" && !dreamMajor.trim()) return;
    onSelect(type, type === "dream" ? dreamMajor.trim() : undefined);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">选择你的B面</h2>
        <p className="text-white/50 text-sm">如果人生可以重来，你想走哪条路？</p>
      </div>

      <div className="space-y-4">
        {directions.map(({ type, icon, title, subtitle, color }) => (
          <div key={type}>
            <button
              onClick={() => handleSelect(type)}
              className="w-full group relative overflow-hidden rounded-2xl p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shrink-0`}>
                  {icon}
                </div>
                <div>
                  <div className="text-white font-medium text-lg">{title}</div>
                  <div className="text-white/50 text-sm">{subtitle}</div>
                  {type === "hottest" && (
                    <div className="text-amber-400/80 text-xs mt-1">
                      {year}年热门：{hottestMajor}
                    </div>
                  )}
                </div>
              </div>
            </button>

            {type === "dream" && showDreamInput && (
              <div className="mt-2 flex gap-2 px-1">
                <input
                  type="text"
                  value={dreamMajor}
                  onChange={(e) => setDreamMajor(e.target.value)}
                  placeholder="输入你心动的专业..."
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && dreamMajor.trim()) {
                      onSelect("dream", dreamMajor.trim());
                    }
                  }}
                  className="flex-1 bg-white/5 border border-pink-400/20 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-pink-400/50 transition-colors text-sm"
                />
                <button
                  onClick={() => dreamMajor.trim() && onSelect("dream", dreamMajor.trim())}
                  disabled={!dreamMajor.trim()}
                  className={`px-4 rounded-xl flex items-center justify-center transition-colors ${
                    dreamMajor.trim()
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                      : "bg-white/5 text-white/20"
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
