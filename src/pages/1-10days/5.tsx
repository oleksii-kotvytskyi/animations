import { TaskLayout } from "@/components/task-layout";
import { getPrevWeek, createCoordinate, generateData } from "./helpers";
import { useCallback, useMemo, useState } from "react";

const maxX = 290;
const maxY = 156;
const aspectRatioValue = 2.5;
const columnsNumber = 6;

type ChartProps = {
  data: ReturnType<typeof generateData>["data"];
};

const Chart = ({ data }: ChartProps) => {
  const maxValue = Math.max(...data.map((v) => v.value));

  // we need 2 more values to make sure our points don't cut in the viewbox
  const correctingValueY = 0.1 * maxValue;
  const correctingValueX = correctingValueY * 2.5;

  // After found the optimal view for the chart was discovered aspect-ratio value as 2.5/1
  // so width will be more then height in 2.5 times

  const coordinates = data
    .map((item, i) => {
      return createCoordinate(
        i * Math.ceil((maxValue / columnsNumber) * aspectRatioValue) +
          correctingValueX * 0.5,
        item.value - correctingValueY * 0.5
      );
    })
    .join(" ");

  const Ticks = useCallback(() => {
    const tickStyles = {
      stroke: "grey",
      strokeWidth: `${0.005 * maxValue}px`,
    };

    return data.map((_, i) => {
      const xValue =
        i * Math.ceil((maxValue / columnsNumber) * aspectRatioValue) +
        correctingValueX * 0.5;

      return (
        <line
          x1={xValue}
          y1={-correctingValueY}
          x2={xValue}
          y2={-correctingValueY * 0.5}
          style={tickStyles}
        />
      );
    });
  }, [correctingValueX, correctingValueY, data, maxValue]);

  const Points = useCallback(() => {
    return data.map((item, i) => {
      const xValue =
        i * Math.ceil((maxValue / columnsNumber) * aspectRatioValue) +
        correctingValueX * 0.5;

      return (
        <circle
          cx={xValue}
          cy={item.value - correctingValueY * 0.5}
          r={maxValue * 0.04}
        >
          <title>{item.value}</title>
        </circle>
      );
    });
  }, [data, maxValue, correctingValueX, correctingValueY]);

  const VerticalLines = useCallback(() => {
    return [0, 0.5, 1].map((scale) => {
      return (
        <line
          x1="0"
          y1={scale * maxValue - 0.5 * correctingValueY}
          x2={maxValue * 2.5 + correctingValueX}
          y2={scale * maxValue - 0.5 * correctingValueY}
          style={{ stroke: "gray", strokeWidth: `${0.002 * maxValue}px` }}
        />
      );
    });
  }, [correctingValueX, correctingValueY, maxValue]);

  return (
    <svg
      viewBox={`0 0 ${Math.ceil(
        maxValue * aspectRatioValue + correctingValueX
      )} ${maxValue + correctingValueY}`}
      width="100%"
      height="100%"
    >
      {/* rotate to position where bottom-left is start position */}
      <g transform={`translate(100, ${maxValue})`}>
        <g transform="scale(1,-1)">
          <Ticks />

          <polyline
            style={{
              stroke: "red",
              strokeWidth: `${0.01 * maxValue}px`,
              strokeLinecap: "square",
              fill: "none",
              height: "100%",
            }}
            points={`${coordinates}`}
          />
          <VerticalLines />

          <g stroke="red" fill="red">
            <Points />
          </g>
        </g>
      </g>
    </svg>
  );
};

export const FifthDay = ({ id }: { id: string }) => {
  const { monday, sunday, mondayFullDate } = getPrevWeek();
  const { data: defaultData } = useMemo(
    () => generateData(mondayFullDate),
    [mondayFullDate]
  );
  const [data, setData] = useState(defaultData);

  const sum = data.reduce((prev, curr) => (prev += curr.value), 0);

  return (
    <TaskLayout day={id}>
      <div className="relative bg-[#42a7a1] flex justify-center items-center h-full rounded-xl">
        <button
          className="absolute top-5 border-red-100 p-1 bg-white rounded-md"
          onClick={() => {
            const { data: newData } = generateData(mondayFullDate);
            setData(newData);
          }}
        >
          Regenerate 🔄
        </button>
        <div className="shadow-2xl rounded-md">
          {/* Header */}
          <div
            className="flex justify-between bg-[#f1ba64] text-white rounded-t-md p-4 "
            style={{ width: `${maxX}px` }}
          >
            <div>
              <h3 className="uppercase font-semibold text-sm">weekly report</h3>
              <span className="text-xs">
                {monday} - {sunday} {mondayFullDate.getFullYear()}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm">Revenue</span>
              <span className="font-semibold text-md">$ {sum}</span>
            </div>
          </div>
          {/* body */}
          <div
            className="flex flex-col justify-end bg-white rounded-b-md p-5"
            style={{
              width: `${maxX}px`,
              height: `${maxY}px`,
            }}
          >
            <Chart data={data} />
            {/* footer */}
            <div className="flex w-full justify-between">
              {data.map((v, index) => {
                return (
                  <div
                    className="text-xs text-gray-500"
                    style={{
                      width: `${Math.ceil(maxX / columnsNumber)}px`,
                      transform: `translateX(${Math.ceil(
                        (index / columnsNumber) * 50
                      )}%)`,
                    }}
                  >
                    {v.day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </TaskLayout>
  );
};
