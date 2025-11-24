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
      <div className="container mx-auto px-4 md:px-0 py-15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl text-redaiu-blue-700 font-light">
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
                <div className="h-3 w-3 bg-redaiu-blue-300"></div>
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
