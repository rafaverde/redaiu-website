interface WhyRedAiuProps {
  title?: string;
  body?: string;
  areas?: string;
}
export default function WhyRedAiu({ title, body, areas }: WhyRedAiuProps) {
  const areasList = areas
    ? areas.split("\n").filter((line) => line.trim() !== "")
    : [];

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-15 md:px-0">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-20">
          <div className="space-y-4">
            <h2 className="text-redaiu-blue-700 text-3xl leading-tight font-light md:text-5xl">
              {title}
            </h2>
            <p className="text-redaiu-gray-800">{body}</p>
          </div>

          <ul className="space-y-4">
            {areasList.map((area, index) => (
              <li
                key={index + area}
                className="text-redaiu-gray-800 flex items-center gap-2"
              >
                <div className="bg-redaiu-blue-300 h-3 w-3"></div>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
