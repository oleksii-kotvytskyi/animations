import { TaskLayout } from "@/components/task-layout";
import { useChartData, getPrevWeek, createCoordinate } from "./helpers";

const maxX = 290;
const maxY = 156;

type ChartProps = {
  data: ReturnType<typeof useChartData>["data"];
};

const Chart = ({ data }: ChartProps) => {
  const maxValue = Math.max(...data.map((v) => v.value));

  // After found the optimal view for the chart was discovered aspect-ratio value as 2.5/1
  // so width will be more then height in 2.5

  const aspectRatioValue = 2.5;
  const columnsNumber = 7;

  const coordinates = data
    .map((item, i) => {
      if (i === 0) createCoordinate(item.value, 0);
      return createCoordinate(
        i * Math.ceil((maxValue / (columnsNumber - 1)) * aspectRatioValue),
        item.value
      );
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${Math.ceil(maxValue * 2.5) + 100} ${maxValue + 100}`}
      width="100%"
      height="100%"
    >
      {/* rotate to position where bottom-left is start position */}
      <g transform={`translate(0, ${maxValue})`}>
        <g transform="scale(1,-1)">
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

          {/* <line
            style={{
              stroke: "red",
              strokeWidth: "50px",
              strokeLinecap: "square",
              // fill: "none",
              // height: "100%",
            }}
            x1="0"
            y1="0"
            x2="0"
            y2={0.05 * maxValue}
          /> */}

          {/* <polyline
                    style={{
                      stroke: "red",
                      strokeWidth: "50px",
                      strokeLinecap: "square",
                      fill: "none",
                      height: "100%",
                    }}
                    points={`
                  ${createTicks(0, 0.05 * maxValue)}
                  ${createTicks(
                    Math.ceil((maxValue / 6) * 2.5),
                    0.05 * maxValue
                  )}
                  ${createTicks(
                    2 * Math.ceil((maxValue / 6) * 2.5),
                    0.05 * maxValue
                  )}
                  ${createTicks(
                    3 * Math.ceil((maxValue / 6) * 2.5),
                    0.05 * maxValue
                  )}
                  ${createTicks(
                    4 * Math.ceil((maxValue / 6) * 2.5),
                    0.05 * maxValue
                  )}
                  ${createTicks(
                    5 * Math.ceil((maxValue / 6) * 2.5),
                    0.05 * maxValue
                  )}
                  ${createTicks(
                    6 * Math.ceil((maxValue / 6) * 2.5),
                    0.05 * maxValue
                  )}
                  ${createTicks(Math.ceil(maxValue * 2.5), 0.05 * maxValue)}
                  
                `}
                  ></polyline> */}
        </g>
      </g>

      {/* <g stroke="black" fill="black">
                <circle id="pointA" cx="0" cy="0" r="5" />
                <circle id="pointB" cx="200" cy="0" r="5" />
                <circle id="pointC" cx="2" cy="500" r="2" />
                <circle id="pointC" cx="247" cy="109" r="5" />
              </g> */}
    </svg>
  );
};

export const FifthDay = ({ id }: { id: string }) => {
  const { monday, sunday, mondayFullDate } = getPrevWeek();
  const { data } = useChartData(mondayFullDate);

  const sum = data.reduce((prev, curr) => (prev += curr.value), 0);

  return (
    <TaskLayout day={id}>
      <div className="bg-[#42a7a1] flex justify-center items-center h-full rounded-xl">
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
              {data.map((v) => {
                return <div className="text-xs text-gray-500">{v.day}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </TaskLayout>
  );
};
