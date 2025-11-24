"use client";

import { useEffect, useState } from "react";
import Logo from "./layout/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { NAV_ITEMS } from "@/src/lib/constants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Fecha menu mobile ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Controla o Scroll para comportamento do Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header className=" w-full sticky top-0 z-50">
      <div className="w-full bg-redaiu-blue-700 shadow-sm shadow-redaiu-gray-800">
        <div className="container m-auto p-5 md:px-0 flex justify-between items-center gap-8 md:gap-2">
          <Link href="/">
            <Logo isCompact={isScrolled} />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 ">
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-redaiu-blue-300 transition-colors duration-500 ${
                    isActive ? "text-redaiu-blue-300 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Sheet*/}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  asChild
                  size="icon"
                  aria-label="Abir menu"
                  className="bg-redaiu-blue-700"
                >
                  <Menu className="text-redaiu-blue-100 w-8 h-8" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="top"
                className="w-full h-full bg-redaiu-blue-700/90"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu de Navegación Mobile
                </SheetDescription>
                <nav className="flex flex-col items-center justify-center h-full gap-8 mt-8">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsOpen(false)} // Fecha ao clicar
                        className={`text-2xl font-medium transition-colors ${
                          isActive
                            ? "text-redaiu-blue-300 font-bold"
                            : "text-white hover:text-redaiu-blue-300"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
