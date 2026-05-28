"use client";

import { motion } from "framer-motion";
import { DestinyFootnote as DestinyFootnoteType } from "@/lib/bsideLifeTypes";
import { Eye, Ear, Hand, Wind, Utensils } from "lucide-react";

interface DestinyFootnoteProps {
  footnote: DestinyFootnoteType;
}

const senseIcons: Record<string, React.ReactNode> = {
  视觉: <Eye className="w-5 h-5" />,
  听觉: <Ear className="w-5 h-5" />,
  触觉: <Hand className="w-5 h-5" />,
  嗅觉: <Wind className="w-5 h-5" />,
  味觉: <Utensils className="w-5 h-5" />,
};

export default function DestinyFootnote({ footnote }: DestinyFootnoteProps) {
  const icon = senseIcons[footnote.sense] || <Eye className="w-5 h-5" />;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-amber-400/5 blur-3xl" />

        <div className="relative flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            {icon}
          </div>
          <div className="space-y-2">
            <div className="text-amber-400/60 text-xs tracking-widest uppercase">
              命运注脚 · {footnote.sense}
            </div>
            <div className="text-amber-100/90 text-base md:text-lg leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              {footnote.detail}
            </div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center text-white/20 text-sm mt-8"
      >
        人生没有B面，但每条路都通向自己
      </motion.p>
    </motion.div>
  );
}
