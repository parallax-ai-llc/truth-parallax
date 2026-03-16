import { getAllScriptures, getTotalContentFiles } from "@/lib/scriptures";
import { HomeClient } from "./home-client";

export const revalidate = 3600;

export default function HomePage() {
  const scriptures = getAllScriptures();
  const totalFiles = getTotalContentFiles();

  return <HomeClient scriptures={scriptures} totalFiles={totalFiles} />;
}
