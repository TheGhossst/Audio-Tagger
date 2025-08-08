import TagCard from "./components/TagCard";
import TagHeader from "./components/TagHeader";

export default function Tag() {
  return (
    <div className="min-h-screen bg-black text-white">
      <TagHeader />
      <TagCard />
    </div>
  );
}
