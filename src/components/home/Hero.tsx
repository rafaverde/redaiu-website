"use client";

import { WPImage } from "@/src/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

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
        setShuffledImages((prev) => {
          const newArr = [...prev];
          for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
          }
          return newArr;
        });
        setIsFading(false);
      }, 700);
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffledImages]);

  if (shuffledImages.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] bg-redaiu-800" />
    );
  }

  return (
    <section
      id="Hero"
      className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-redaiu-gray-800"
    >
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2">
        {shuffledImages.slice(0, 6).map((img, index) => (
          <div key={index} className="relative w-full h-full overflow-hidden">
            <img
              src={img.node.sourceUrl}
              alt="RedAiu Projectos"
              className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-0 h-full flex flex-col justify-center items-start">
        <div className="max-w-3xl space-y-4">
          <div className="rounded-4xl bg-redaiu-gray-800/85 p-9">
            <div
              className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg [&_strong]:text-redaiu-blue-300"
              dangerouslySetInnerHTML={{ __html: title || "" }}
            ></div>
            <p className="text-lg md:text-xl text-gray-100 font-light leading-relaxed drop-shadow-md max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-redaiu-blue-300 hover:bg-redaiu-blue-500 transition-colors duration-300 ease-in-out text-white font-semibold text-lg px-8 py-6"
            >
              <Link href="/contacto">Contactarme →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
