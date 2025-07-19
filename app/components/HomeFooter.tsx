import { Sparkles } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="flex justify-between items-end p-6 md:p-8 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        <div>
          <div>Music Organization Tool</div>
          <div>Built for audiophiles</div>
        </div>
      </div>
      <div className="text-right">
        <div>Aspiring to organize</div>
        <div>your music perfectly</div>
      </div>
    </footer>
  );
}
