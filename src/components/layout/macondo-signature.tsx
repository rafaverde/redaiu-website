import Image from "next/image";
import Link from "next/link";
import macondoLogo from "@/public/logo-macondo-marketing.svg";

export default function MacondoSignature() {
  return (
    <section className="bg-background text-foreground w-full py-4">
      <div className="container mx-auto">
        <Link
          href="https://www.macondo.com.uy"
          target="_blank"
          className="mx-auto flex w-fit items-center justify-center gap-3 transition-opacity duration-500 ease-in-out hover:opacity-70"
        >
          <p className="text-xs leading-0">Desarrollado por</p>
          <Image
            src={macondoLogo}
            alt="Macondo Marketing y Comunicación"
            height={20}
          />
        </Link>
      </div>
    </section>
  );
}
