"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { parseBlob } from "music-metadata-browser";
import { TagIdle, TagUploading } from "./TagStates";
import { Music } from "lucide-react";

type UploadState = "idle" | "uploading" | "loaded" | "error";

export default function TagCard() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadState("idle");
      return;
    }

    if (!file.type.startsWith("audio/")) {
      alert("Please upload a valid audio file.");
      setUploadState("error");
      return;
    }

    try {
      setUploadState("uploading");
      const metadata = await parseBlob(file);
      setTitle(metadata.common.title || file.name);
      setArtist(metadata.common.artist || "Unknown Artist");
      setAlbum(metadata.common.album || "Unknown Album");

      if (metadata.common.picture && metadata.common.picture.length > 0) {
        const picture = metadata.common.picture[0];
        const blob = new Blob([new Uint8Array(picture.data)], {
          type: picture.format,
        });
        setCoverImageUrl(URL.createObjectURL(blob));
      }

      console.log("Title:", title);
      console.log("Artist:", artist);
      console.log("Album:", album);
      console.log("Cover Art URL:", coverImageUrl);
      setUploadState("loaded");
    } catch (error) {
      console.error("Metadata parsing/upload failed:", error);
      setUploadState("error");
    }
  };

  if (uploadState === "idle") {
    return <TagIdle handleFileUpload={handleFileUpload} />;
  }

  if (uploadState === "uploading") {
    return <TagUploading />;
  }

  if (uploadState == "error") {
    return <div></div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] px-4 md:px-8 py-8 bg-black">
      <Card className="w-full max-w-5xl bg-gray-900 border-gray-800 shadow-2xl">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-8 flex items-center justify-center bg-gray-900">
            <div className="relative w-full max-w-sm aspect-square">
              <div className="relative w-full h-full bg-gray-800 border border-gray-700 shadow-xl overflow-hidden">
                <Image
                  src={coverImageUrl || "/placeholderaudio.png"}
                  alt="Album cover"
                  fill
                  className="object-cover"
                />
                {!coverImageUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <Music className="w-20 h-20 text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[1px] h-[1px] lg:h-auto bg-gray-700"></div>

          <div className="flex-1 p-8 bg-gray-900">
            <div className="h-full flex flex-col justify-center max-w-md mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-medium text-white">Edit Tags</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadState("idle")}
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-colors"
                >
                  New File
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Title
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter song name"
                    className="h-11 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 transition-colors"
                    value={title || ""}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="artist"
                    className="text-sm font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Artist
                  </Label>
                  <Input
                    id="artist"
                    type="text"
                    placeholder="Enter artist name"
                    className="h-11 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 transition-colors"
                    value={artist || ""}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="album"
                    className="text-sm font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Album
                  </Label>
                  <Input
                    id="album"
                    type="text"
                    placeholder="Enter album name"
                    className="h-11 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-600 focus:ring-0 transition-colors"
                    value={album || ""}
                    onChange={(e) => setAlbum(e.target.value)}
                  />
                </div>
              </div>

              <Button className="w-full h-11 mt-8 bg-white text-black hover:bg-gray-200 font-medium transition-colors">
                Save Tags
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
