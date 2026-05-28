"use client";

import { motion } from "framer-motion";

export default function StepGenerating() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center space-y-8 py-20">
      <div className="relative w-64 h-40">
        {/* Fork line */}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 256 160" className="w-full h-full">
            <motion.path
              d="M 128 0 L 128 60"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M 128 60 Q 128 90 80 130 L 60 150"
              stroke="#64748b"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.path
              d="M 128 60 Q 128 90 176 130 L 196 150"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            <motion.circle
              cx="128"
              cy="60"
              r="4"
              fill="white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
            />
            <motion.circle
              cx="60"
              cy="150"
              r="3"
              fill="#64748b"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6 }}
            />
            <motion.circle
              cx="196"
              cy="150"
              r="3"
              fill="#f59e0b"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6 }}
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute left-3 bottom-0 text-slate-400 text-xs"
        >
          A面
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute right-3 bottom-0 text-amber-400 text-xs"
        >
          B面
        </motion.div>
      </div>

      <div className="text-center space-y-3">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-lg"
        >
          命运正在分叉...
        </motion.div>
        <p className="text-white/30 text-sm">另一个时空的你正在苏醒</p>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-amber-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
