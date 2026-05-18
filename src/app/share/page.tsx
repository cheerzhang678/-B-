"use client";

import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

interface ShareData {
  title: string;
  chapters: { title: string; content: string }[];
}

export default function SharePage() {
  const [data, setData] = useState<ShareData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setError(true);
        return;
      }
      const decoded = JSON.parse(decodeURIComponent(atob(hash)));
      if (decoded.title && decoded.chapters) {
        setData(decoded);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h1 className="text-lg font-semibold text-gray-700 mb-2">无法加载内容</h1>
          <p className="text-sm text-gray-400">分享链接无效或已过期</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-sm text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span className="text-sm text-gray-500">创意写作 · 分享阅读</span>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <div className="flex items-center justify-center gap-3">
            <span className="block w-12 h-px bg-gray-200" />
            <span className="block w-2 h-2 rounded-full bg-gray-300" />
            <span className="block w-12 h-px bg-gray-200" />
          </div>
        </div>

        {/* Chapters */}
        {data.chapters.map((chapter, i) => (
          <article key={i} className="mb-16">
            {data.chapters.length > 1 && (
              <div className="text-center mb-8">
                <p className="text-xs text-gray-400 tracking-[0.3em] mb-2">
                  {`第${['一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六'][i] || i + 1}章`}
                </p>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {chapter.title.replace(/^第[一二三四五六七八九十百千万\d]+[章集节回]\s*/, '') || chapter.title}
                </h2>
                <div className="flex items-center justify-center gap-3">
                  <span className="block w-8 h-px bg-gray-200" />
                  <span className="block w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <span className="block w-8 h-px bg-gray-200" />
                </div>
              </div>
            )}
            <div className="text-[15px] text-gray-700 leading-[2] whitespace-pre-wrap font-[serif]">
              {chapter.content}
            </div>
          </article>
        ))}

        {/* Footer */}
        <div className="text-center pt-8 pb-16 border-t border-gray-100">
          <p className="text-xs text-gray-400">— 全文完 —</p>
          <p className="text-xs text-gray-300 mt-4">由 创意写作工作台 生成</p>
        </div>
      </main>
    </div>
  );
}
