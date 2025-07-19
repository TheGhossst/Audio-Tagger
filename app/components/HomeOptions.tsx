"use client";

import { Music, Download } from "lucide-react";
import Link from "next/link";

export default function HomeOptions() {
  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/tag:opacity-100 transition-all duration-500 ease-out">
        <h1 className="text-6xl md:text-8xl font-light text-white/10 select-none whitespace-nowrap">
          Tag your music
        </h1>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/download:opacity-100 transition-all duration-500 ease-out">
        <h1 className="text-6xl md:text-8xl font-light text-white/10 select-none whitespace-nowrap">
          YT Music downloader
        </h1>
      </div>

      <div className="relative flex items-center justify-between p-8">
        <Link
          href="/Tag"
          className="cursor-pointer group/tag transition-all duration-300 ease-out hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm font-mono group-hover/tag:text-gray-300 transition-colors duration-300">
              01
            </span>
            <Music className="w-5 h-5 text-gray-400 group-hover/tag:text-white transition-colors duration-300" />
            <h2 className="text-xl font-medium text-gray-400 group-hover/tag:text-white transition-colors duration-300">
              Tag your music
            </h2>
          </div>
        </Link>

        <Link
          className="cursor-pointer group/download transition-all duration-300 ease-out hover:scale-105"
          href="YoutubeTag"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-gray-400 group-hover/download:text-white transition-colors duration-300">
              YT Music downloader
            </h2>
            <Download className="w-5 h-5 text-gray-400 group-hover/download:text-white transition-colors duration-300" />
            <span className="text-gray-500 text-sm font-mono group-hover/download:text-gray-300 transition-colors duration-300">
              02
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
