"use client";

import React, { useEffect, useState } from "react";
import Logo from "./layout/Logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { ChevronDown, Menu } from "lucide-react";
import { CompanyMenuItem } from "../types/menu";
import { cn, groupCompaniesByCategory } from "../lib/utils";

interface HeaderProps {
  companies: CompanyMenuItem[];
}

export default function Header({ companies }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompaniesMobileMenuOpen, setIsCompaniesMobileMenuOpen] =
    useState(false);
  const pathname = usePathname();

  // Agrupa empresas por categoria automaticamente
  const groupedCompanies = React.useMemo(
    () => groupCompaniesByCategory(companies),
    [companies],
  );
  const categories = Object.keys(groupedCompanies);

  // Estilo base compartilhado para os links e o trigger para garantir consistência
  const linkStyle = (isActive: boolean) =>
    cn(
      "group inline-flex h-10 w-max items-center justify-center px-4 py-2 transition-colors duration-500", // Base layout
      "bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent", // Remove backgrounds padrão
      "text-base text-white hover:text-redaiu-blue-300 focus:text-redaiu-blue-200", // Cores de texto
      "border-b-2 border-transparent hover:border-redaiu-blue-300!", // Animação da borda
      "rounded-none", // Remove arredondamento
      isActive && "text-redaiu-blue-300 border-redaiu-blue-300! font-bold", // Estado ativo
    );

  // Fecha menu mobile e reseta dropdown submenu ao mudar de rota
  useEffect(() => {
    setIsOpen(false);
    setIsCompaniesMobileMenuOpen(false);
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
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-redaiu-blue-700 shadow-redaiu-gray-800 w-full shadow-sm">
        <div className="container m-auto flex items-center justify-between gap-8 p-5 md:gap-2 md:px-0">
          <Link href="/">
            <Logo isCompact={isScrolled} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="rounded-none">
                    <Link
                      href="/la-red"
                      className={linkStyle(pathname === "/la-red")}
                    >
                      La Red
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="data-[state=open]:text-redaiu-blue-300 hover:text-redaiu-blue-300 hover:border-redaiu-blue-300! focus:text-redaiu-blue-300 cursor-pointer rounded-none border-b-2 border-transparent bg-transparent!">
                    Empresas
                  </NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <div className="flex gap-8 p-6 outline-0">
                      {categories.map((category, index) => (
                        <div
                          key={index + category}
                          className="space-y-4 first:border-r first:pr-8"
                        >
                          <h4 className="text-redaiu-blue-700 text-xs font-semibold tracking-widest uppercase">
                            {category}
                          </h4>

                          <ul className="space-y-3">
                            {groupedCompanies[category].map(
                              (company, index) => (
                                <li key={index + company.title}>
                                  <NavigationMenuLink
                                    asChild
                                    className="bg-transparent"
                                  >
                                    <Link
                                      href={`/empresas/${company.slug}`}
                                      className="text-redaiu-gray-600! text-sm"
                                    >
                                      {company.title}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className="rounded-none">
                    <Link
                      href="/contacto"
                      className={linkStyle(pathname === "/contacto")}
                    >
                      Contacto
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

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
                  <Menu className="text-redaiu-blue-100 h-8 w-8" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="top"
                className="bg-redaiu-blue-700/90 h-full w-full"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Menu de Navegación Mobile
                </SheetDescription>
                <nav className="mt-8 flex h-full flex-col items-center justify-center gap-8">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-redaiu-blue-300 text-2xl font-medium"
                  >
                    Home
                  </Link>

                  <Link
                    href="/la-red"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-redaiu-blue-300 text-2xl font-medium"
                  >
                    La Red
                  </Link>

                  <div className="flex w-full flex-col items-center">
                    <button
                      onClick={() =>
                        setIsCompaniesMobileMenuOpen(!isCompaniesMobileMenuOpen)
                      }
                      className="hover:text-redaiu-blue-300 flex items-center gap-2 text-2xl font-medium transition-colors"
                    >
                      Empresas
                      <ChevronDown
                        className={`h-6 w-6 transition-transform duration-300 ${isCompaniesMobileMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`grid w-full transition-all duration-300 ease-in-out ${isCompaniesMobileMenuOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="w-full space-y-2 overflow-hidden px-4 text-center">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className="rounded-xl bg-white/5 p-4"
                          >
                            <h5 className="text-redaiu-blue-300 mb-4 border-b border-white/10 pb-2 text-sm font-bold tracking-widest uppercase">
                              {category}
                            </h5>
                            <div className="flex flex-col gap-2">
                              {groupedCompanies[category].map((empresa) => (
                                <Link
                                  key={empresa.slug}
                                  href={`/empresas/${empresa.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="text-lg text-gray-200 transition-all hover:translate-x-1 hover:text-white"
                                >
                                  {empresa.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    onClick={() => setIsOpen(false)}
                    className="hover:text-redaiu-blue-300 text-2xl font-medium"
                  >
                    Contacto
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
