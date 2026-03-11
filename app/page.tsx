import { getAllScriptures } from "@/lib/scriptures";
import { HomeClient } from "./home-client";

export default function HomePage() {
  const scriptures = getAllScriptures();

  return <HomeClient scriptures={scriptures} />;
}
