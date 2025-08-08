"use client";

import { Music, Upload } from "lucide-react";

interface TagIdleProps {
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
}

export function TagIdle({ handleFileUpload }: TagIdleProps) {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)] px-4">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
          <Music className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold">Upload Your Music File</h2>
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-blue-400 transition-colors">
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-300">Click to browse files</p>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}

export function TagUploading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)]">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-bold">Processing...</h2>
        <p className="text-gray-400">Analyzing your music file</p>
      </div>
    </div>
  );
}
