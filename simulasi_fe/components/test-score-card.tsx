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
    <div className="relative overflow-hidden rounded-[26px] border border-orange-300/50 shadow-sm px-6 py-8 sm:px-8 sm:py-10 bg-[linear-gradient(135deg,#FFDDCA_0%,#FFEADE_100%)]">
      {/* === Pattern Background === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pattern 1 */}
        <span
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "100px",
            top: "200px",
            left: "-90px",
            transform: "rotate(-150deg)",
            background:
              "linear-gradient(90deg, #FF8A00 0%, #FF6A00 50%, #FF5702 100%)",
            opacity: "0.25",
          }}
        />

        {/* Pattern 2 */}
        <span
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "100px",
            top: "15px",
            left: "-50px",
            transform: "rotate(-150deg)",
            background:
              "linear-gradient(90deg, #FF8A00 0%, #FF6A00 50%, #FF5702 100%)",
            opacity: "0.25",
          }}
        />

        {/* Pattern 3 */}
        <span
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "100px",
            top: "300px",
            left: "-80px",
            transform: "rotate(-150deg)",
            background:
              "linear-gradient(90deg, #FF8A00 0%, #FF6A00 50%, #FF5702 100%)",
            opacity: "0.25",
          }}
        />
      </div>

      {/* === Card Content === */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Title */}
        <div className="mb-6">
          <div className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 shadow-sm rounded-xl">
            {title}
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-sm font-medium leading-relaxed text-gray-700 sm:text-base">
          {description}
        </p>

        {/* Score */}
        <div className="mb-8">
          <p className="text-6xl font-bold tracking-tight text-orange-500">
            {score.toFixed(2)}
          </p>
        </div>

        {/* Time info */}
        <div className="w-full mt-2 space-y-2">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Mulai : {startTime}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Selesai : {endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
