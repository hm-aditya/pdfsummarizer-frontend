"use client";

import { CoffeeIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="w-full h-[60px] px-8  fixed border-b border-gray-400/10  z-50 backdrop-blur-sm  flex items-center justify-between  top-0">
      <Link href="/" className="flex items-center gap-2">
        <h2 className="font-bold text-2xl tracking-tight bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent ">
          PdfSummarizer
        </h2>
      </Link>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
          <Link
            href="https://www.buymeacoffee.com/hm_aditya"
            target="_blank"
            className="flex items-center gap-2"
          >
            <span className="hidden md:block">Buy me a coffee</span>{" "}
            <CoffeeIcon className="w-5 h-5 text-blue-400" />
          </Link>
        </button>
        <div>
          <button className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
            <Link
              href="https://github.com/hm-aditya/pdfsummarizer-frontend"
              target="_blank"
              className="flex items-center gap-2"
            >
              <span className="hidden md:block">Star my repository</span>{" "}
              <StarIcon className="w-5 h-5 text-blue-400" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
