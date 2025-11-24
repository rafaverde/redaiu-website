import Hero from "@/src/components/home/Hero";
import WhyRedAiu from "@/src/components/home/WhyRedAiu";
import { getHomeData } from "@/src/lib/api/home";
import { LoaderCircle, LoaderIcon } from "lucide-react";

export default async function Home() {
  const homeData = await getHomeData();

  if (!homeData) {
    return (
      <div className="h-[700px] w-full grid items-center justify-center">
        <LoaderCircle className="size-7 text-redaiu-gray-600 animate-spin" />
      </div>
    );
  }

  const { pageData } = homeData;

  return (
    <>
      <Hero
        title={pageData?.heroTitle}
        subtitle={pageData?.heroSubtitle}
        images={pageData.heroImagesArray}
      />

      <WhyRedAiu
        title={pageData?.whyAiuTitle}
        body={pageData?.whyAiuBody}
        areas={pageData?.whyAiuAreas}
      />
    </>
  );
}
