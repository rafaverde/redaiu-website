import CompanyGrid from "@/src/components/home/CompanyGrid";
import Hero from "@/src/components/home/Hero";
import WhyRedAiu from "@/src/components/home/WhyRedAiu";
import WhyUruguay from "@/src/components/home/WhyUruguay";
import { getGlobalData } from "@/src/lib/api/global";
import { getHomeData } from "@/src/lib/api/home";
import { shuffleArray } from "@/src/lib/utils";
import { LoaderCircle } from "lucide-react";

export const revalidateTime = 60;

export default async function Home() {
  const [homeData, globalData] = await Promise.all([
    getHomeData(),
    getGlobalData(),
  ]);

  if (!homeData || !globalData) {
    return (
      <div className="grid h-[700px] w-full items-center justify-center">
        <LoaderCircle className="text-redaiu-gray-600 size-7 animate-spin" />
      </div>
    );
  }

  const { pageData, companies } = homeData;
  const shuffledCompanies = shuffleArray(companies);

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

      <CompanyGrid
        companies={shuffledCompanies}
        title={pageData.companyGridTitle}
      />

      <WhyUruguay
        title={globalData.whyUruguayTitle}
        cards={globalData.whyUruguayCards?.nodes || []}
      />
    </>
  );
}
