import { getAllScriptures, getTotalContentFiles } from "@/lib/scriptures";
import { HomeClient } from "./home-client";

// Content only changes on deploy, so cache until the next deploy.
export const revalidate = false;

export default function HomePage() {
  const scriptures = getAllScriptures();
  const totalFiles = getTotalContentFiles();

  return <HomeClient scriptures={scriptures} totalFiles={totalFiles} />;
}
