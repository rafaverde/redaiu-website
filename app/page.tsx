import Hero from "@/src/components/home/Hero";
import { getHomeData } from "@/src/lib/api/home";

export default async function Home() {
  const homeData = await getHomeData();

  if (!homeData) return null;

  const { pageData } = homeData;

  return (
    <>
      <Hero
        title={pageData?.heroTitle}
        subtitle={pageData?.heroSubtitle}
        images={pageData.heroImagesArray}
      />
    </>
  );
}
