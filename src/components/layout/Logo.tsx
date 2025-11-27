interface LogoProps {
  isCompact?: boolean;
  className?: string;
}

export default function Logo({ isCompact = false, className = "" }: LogoProps) {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-extralight">
        RED <span className="font-medium">AIU</span>
      </h2>

      <div
        className={`overflow-hidden transition-all duration-600 ease-in-out ${
          isCompact ? "max-h-0 opacity-0" : "max-h-[100px] opacity-100"
        }`}
      >
        <h3 className="text-redaiu-blue-300">
          <span className="font-bold">R</span>ed de{" "}
          <span className="font-bold">A</span>rquitectura e{" "}
          <span className="font-bold">I</span>ngeniería de{" "}
          <span className="font-bold">U</span>ruguay
        </h3>
      </div>
    </div>
  );
}
