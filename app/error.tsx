"use client";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { LuArrowLeft, LuCloudAlert } from "react-icons/lu";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log do erro para serviço de analytics se quiser
    console.error(error);
  }, [error]);

  return (
    <section className="bg-redaiu-gray-800 h-[calc(100vh-100px)] w-full text-white">
      <div className="container mx-auto flex h-full w-full flex-col items-center justify-center gap-6 p-4 text-center md:w-4xl">
        <LuCloudAlert className="text-redaiu-blue-300 size-60" />
        <div>
          <h2 className="text-redaiu-blue-300 text-3xl md:text-5xl">
            Se ha producido un error crítico.
          </h2>
          <p>
            Nuestro equipo ya ha sido notificado. Intente actualizar la página o
            vuelva más tarde.
          </p>
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
