"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { LuArrowLeft, LuCircleX } from "react-icons/lu";

export default function NotFound() {
  return (
    <section className="bg-redaiu-gray-800 h-[calc(100vh-100px)] w-full text-white">
      <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-6 p-4 text-center md:w-4xl">
        <LuCircleX className="text-redaiu-blue-300 size-60" />
        <div>
          <h2 className="text-redaiu-blue-300 text-6xl md:text-9xl">404</h2>
          <p>La página que estás buscando no existe o se ha movido.</p>
          <Button
            asChild
            size="lg"
            className="bg-redaiu-blue-500 hover:bg-redaiu-blue-700 mt-8"
          >
            <Link href="/">
              <LuArrowLeft /> Volver arriba
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
