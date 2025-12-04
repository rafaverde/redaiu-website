"use client";

import { WPImage } from "@/src/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { shuffleArray } from "@/src/lib/utils";

interface HeroProps {
  title?: string;
  subtitle?: string;
  images: WPImage[];
}

export default function Hero({ title, subtitle, images }: HeroProps) {
  const [shuffledImages, setShuffledImages] = useState<WPImage[]>([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setShuffledImages(images);
    }
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setShuffledImages((prev) => shuffleArray(prev));
        setIsFading(false);
      }, 700);
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffledImages]);

  if (shuffledImages.length === 0) {
    return (
      <div className="bg-redaiu-gray-100 grid h-[700px] w-full animate-pulse items-center justify-center">
        <LoaderCircle className="text-redaiu-gray-600 size-7 animate-spin" />
      </div>
    );
  }

  return (
    <section
      id="Hero"
      className="bg-redaiu-gray-800 relative min-h-[600px] w-full overflow-hidden md:h-[700px]"
    >
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2">
        {shuffledImages.slice(0, 6).map((img, index) => (
          <div key={index} className="relative h-full w-full overflow-hidden">
            <img
              src={img.node.sourceUrl}
              alt="RedAiu Projectos"
              className={`h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto flex h-full flex-col items-start justify-center px-4 py-20 md:px-0">
        <div className="max-w-3xl space-y-4">
          <div className="bg-redaiu-gray-800/85 rounded-4xl p-9">
            <div
              className="[&_strong]:text-redaiu-blue-300 text-4xl leading-tight font-bold text-white drop-shadow-lg md:text-6xl"
              dangerouslySetInnerHTML={{ __html: title || "" }}
            ></div>
            <p className="max-w-2xl text-lg leading-relaxed font-light text-gray-100 drop-shadow-md md:text-xl">
              {subtitle}
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-redaiu-blue-300 hover:bg-redaiu-blue-500 px-8 py-6 text-lg font-semibold text-white transition-colors duration-300 ease-in-out"
            >
              <Link href="/contacto">Contactar →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
