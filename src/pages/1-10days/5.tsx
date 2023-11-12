import { TaskLayout } from "@/components/task-layout";
import {
  getPrevWeek,
  generateData,
  colorPerGraph,
  companyPerGraph,
} from "./helpers";
import { useMemo, useState } from "react";
import { Chart, maxX, maxY, columnsNumber } from "./5-chart";
import "./5-grapth.scss";
import { cn } from "@/lib/utils";
import { useOutletContext } from "react-router-dom";

export const FifthDay = ({ id }: { id: string }) => {
  const { monday, sunday, mondayFullDate } = getPrevWeek();
  const [chartCount, setChartCount] = useState(1);
  const context = useOutletContext<{ isPageView?: boolean } | undefined>();
  const { data: defaultData } = useMemo(
    () => generateData(mondayFullDate, chartCount),
    [mondayFullDate, chartCount]
  );
  const [data, setData] = useState(defaultData);

  const sum = data.reduce(
    (prev, curr) => (prev += curr.values.reduce((pc, cc) => (pc += cc), 0)),
    0
  );

  return (
    <TaskLayout
      day={id}
      disabled={!context?.isPageView}
      style={{ zoom: context?.isPageView ? "1.5" : "1" }}
    >
      <div
        className={cn(
          "relative bg-[#42a7a1] flex justify-center items-center h-full rounded-xl"
        )}
      >
        <div className="flex flex-col justify-center items-start gap-3">
          <button
            className="border-red-100 p-1 bg-white rounded-md"
            onClick={() => {
              const { data: newData } = generateData(
                mondayFullDate,
                chartCount
              );
              setData(newData);
            }}
          >
            Regenerate data 🔄
          </button>
          <div className="flex gap-4 p-1 rounded-md">
            <span className="text-white">Companies amount:</span>
            <select
              className="bg-white rounded-sm"
              onChange={(e) => {
                const newCount = Number(e.target.value);
                setChartCount(newCount);
                const { data: newData } = generateData(
                  mondayFullDate,
                  newCount
                );
                setData(newData);
              }}
              defaultValue={chartCount}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <div className="shadow-2xl rounded-md">
            {/* Header */}
            <div
              className="flex justify-between bg-[#f1ba64] text-white rounded-t-md p-4 "
              style={{ width: `${maxX}px` }}
            >
              <div className="min-w-max">
                <h3 className="uppercase font-semibold text-sm">
                  weekly report
                </h3>
                <span className="text-xs">
                  {monday} - {sunday} {mondayFullDate.getFullYear()}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-end">Revenue</span>
                <span className="text-xs text-end">
                  {chartCount > 1 && `(${chartCount} companies)`}
                </span>
                <span className="font-semibold text-md">$ {sum}</span>
              </div>
            </div>
            {/* lines info */}
            <div className="flex gap-2 bg-white justify-end flex-wrap max-w-full pr-5">
              {Array.from(Array(chartCount).keys()).map((chartIndex) => {
                return (
                  <div className="flex items-center gap-1">
                    <hr
                      className="w-4 h-1 border-0 rounded"
                      style={{ backgroundColor: colorPerGraph[chartIndex] }}
                    />
                    <span className="text-xs">
                      {companyPerGraph[chartIndex]}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* body */}
            <div
              className="flex flex-col justify-end bg-white rounded-b-md p-5"
              style={{
                width: `${maxX}px`,
                height: `${maxY}px`,
              }}
            >
              <Chart data={data} chartCount={chartCount} />

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
      </div>
    </TaskLayout>
  );
};
