import { Clock } from "lucide-react";

export interface TestScoreCardProps {
  title: string;
  score: number;
  description: string;
  startTime: string;
  endTime: string;
}

export function TestScoreCard({
  title,
  score,
  description,
  startTime,
  endTime,
}: TestScoreCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-orange-300/50 bg-[linear-gradient(135deg,#FFF4EC_0%,#FFF8F3_40%,#FFFFFF_100%)] shadow-sm px-6 py-8 sm:px-8 sm:py-10">
      {/* Background layers refined: softer stripes + diffused circle behind score */}
      <div className="absolute inset-0 pointer-events-none">
        {/* primary orange bars (subtle opacity to blend with light background) */}
        <span
          className="absolute -top-28 -left-40 h-[110px] w-[170%] rotate-[33deg] rounded-[140px] opacity-[0.12]"
          style={{
            background:
              "linear-gradient(90deg,#ff5a1f 0%, #ff7a1a 60%, #ff8c1a 100%)",
          }}
        />
        <span
          className="absolute top-0 -left-36 h-[92px] w-[160%] rotate-[33deg] rounded-[140px] opacity-[0.10]"
          style={{
            background:
              "linear-gradient(90deg,#ff5a1f 0%, #ff7a1a 60%, #ff8c1a 100%)",
          }}
        />
        <span
          className="absolute top-40 -left-32 h-[78px] w-[150%] rotate-[33deg] rounded-[140px] opacity-[0.09]"
          style={{
            background:
              "linear-gradient(90deg,#ff5a1f 0%, #ff7a1a 60%, #ff8c1a 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-6">
          <div className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 shadow-sm rounded-xl">
            {title}
          </div>
        </div>

        <p className="mb-6 text-sm font-medium leading-relaxed text-center text-gray-700 sm:text-base">
          {description}
        </p>

        {/* Score display */}
        <div className="mb-8">
          <p className="text-6xl font-bold tracking-tight text-orange-500">
            {score.toFixed(2)}
          </p>
        </div>

        <div className="w-full mt-2 space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Mulai : {startTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Selesai : {endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
