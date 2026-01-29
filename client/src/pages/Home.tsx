import { lazy, Suspense } from "react";
import SpaceNavbar from "@/components/SpaceNavbar";
import SpaceHero from "@/components/SpaceHero";
import SpaceAbout from "@/components/SpaceAbout";
import SpaceSkills from "@/components/SpaceSkills";
import SpaceProjects from "@/components/SpaceProjects";
import SpaceContact from "@/components/SpaceContact";

const StarsCanvas = lazy(() => import("@/components/StarBackground"));

export default function Home() {
  return (
    <div className="h-full w-full bg-[#030014] overflow-y-scroll overflow-x-hidden">
      <Suspense fallback={<div className="w-full h-full fixed inset-0 z-[20] bg-[#030014]" />}>
        <StarsCanvas />
      </Suspense>
      <SpaceNavbar />
      <main className="h-full w-full">
        <div className="flex flex-col gap-20">
          <SpaceHero />
          <SpaceAbout />
          <SpaceSkills />
          <SpaceProjects />
          <SpaceContact />
        </div>
      </main>
    </div>
  );
}
