"use client";

import { motion } from "framer-motion";
import { TimelineNode } from "@/lib/bsideLifeTypes";

interface TimelineDisplayProps {
  timeline: TimelineNode[];
  actualMajor: string;
  bsideMajor: string;
}

export default function TimelineDisplay({ timeline, actualMajor, bsideMajor }: TimelineDisplayProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header with major labels */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="text-center">
          <div className="text-slate-400 text-xs mb-1">A面 · 现实</div>
          <div className="text-blue-300 font-medium">{actualMajor}</div>
        </div>
        <div className="text-white/20 text-sm">vs</div>
        <div className="text-center">
          <div className="text-amber-400/70 text-xs mb-1">B面 · 平行</div>
          <div className="text-amber-300 font-medium">{bsideMajor}</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent hidden md:block" />

        <div className="space-y-8">
          {timeline.map((node, index) => (
            <motion.div
              key={node.year}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              {/* Year badge - center on desktop, left on mobile */}
              <div className="flex items-center justify-center mb-3">
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                  {node.year}年
                </div>
              </div>

              {/* A/B comparison cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* A Side */}
                <div className="group rounded-xl border border-blue-400/10 bg-blue-400/5 p-4 transition-colors hover:border-blue-400/20">
                  <div className="text-blue-300/80 text-xs font-medium mb-1.5">
                    {node.aSide.title}
                  </div>
                  <div className="text-white/70 text-sm leading-relaxed">
                    {node.aSide.description}
                  </div>
                </div>

                {/* B Side */}
                <div className="group rounded-xl border border-amber-400/10 bg-amber-400/5 p-4 transition-colors hover:border-amber-400/20">
                  <div className="text-amber-300/80 text-xs font-medium mb-1.5">
                    {node.bSide.title}
                  </div>
                  <div className="text-white/70 text-sm leading-relaxed">
                    {node.bSide.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
