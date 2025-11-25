import { Diferencial } from "@/src/types/global";
import type { IconType } from "react-icons";
import {
  LuChartColumn,
  LuGlobe,
  LuHandshake,
  LuRefreshCcwDot,
} from "react-icons/lu";

const iconMap: { [key: string]: IconType } = {
  LuGlobe: LuGlobe,
  LuChartColumn: LuChartColumn,
  LuRefreshCcwDot: LuRefreshCcwDot,
  LuHandshake: LuHandshake,
};

interface WhyUruguayProps {
  title: string;
  cards: Diferencial[];
}

export default function WhyUruguay({ title, cards }: WhyUruguayProps) {
  return (
    <section className="bg-white">
      <div className="container mx-auto space-y-10 px-4 py-15 md:px-0">
        <div
          className="text-redaiu-blue-700 [&_strong]:text-redaiu-blue-300 text-center text-3xl leading-tight font-light md:text-5xl"
          dangerouslySetInnerHTML={{ __html: title || "" }}
        ></div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {cards.map((card, index) => {
            const IconComponent =
              iconMap[card.diferenciaisFg.iconName[0]] || LuGlobe;
            return (
              <div
                key={index + card.title}
                className={`p-8 ${index === 0 && "bg-redaiu-gray-800"} ${index === 3 && "bg-redaiu-gray-800"} ${index === 1 && "bg-redaiu-gray-600"} ${index === 2 && "bg-redaiu-gray-500"} space-y-2 first:rounded-l-4xl last:rounded-r-4xl nth-[2]:rounded-r-4xl nth-[3]:rounded-l-4xl md:nth-[2]:rounded-none md:nth-[3]:rounded-none`}
              >
                <div className="mb-4">
                  <IconComponent className="size-8" />
                </div>

                <h3 className="text-lg leading-tight font-bold lg:text-2xl">
                  {card.title}
                </h3>

                <p>{card.diferenciaisFg.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
