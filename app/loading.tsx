import Logo from "@/src/components/layout/Logo";
import { LuLoaderCircle } from "react-icons/lu";

export default function LoadingPage() {
  return (
    <section className="bg-redaiu-blue-700/98 fixed top-0 left-0 z-50 grid h-full w-full items-center justify-center">
      <div className="flex animate-pulse items-center justify-center gap-3">
        <LuLoaderCircle className="size-8 animate-spin text-white opacity-60" />
        <div className="max-w-[200px] opacity-50">
          <Logo isCompact />
        </div>
      </div>
    </section>
  );
}
