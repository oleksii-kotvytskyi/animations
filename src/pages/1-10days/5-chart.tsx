import { createCoordinate, generateData, colorPerGraph } from "./helpers";
import { RefObject, useRef } from "react";
import "./5-grapth.scss";

export const maxX = 290;
export const maxY = 156;
export const aspectRatioValue = 2.5;
export const columnsNumber = 6;

type DataType = ReturnType<typeof generateData>["data"];

type ChartProps = {
  data: DataType;
  chartCount: number;
};

type MainProps = {
  data: ChartProps["data"];
  maxValue: number;
  correctingValueX: number;
  correctingValueY: number;
};

type PointProps = {
  xValue: number;
  yValue: number;
  radius: number;
  popRef: RefObject<HTMLDivElement>;
  dataValue: number;
  color: string;
};

type PointsProps = MainProps & {
  popRef: RefObject<HTMLDivElement>;
  chartCount: ChartProps["chartCount"];
};

const Point = ({
  xValue,
  yValue,
  radius,
  popRef,
  dataValue,
  color,
}: PointProps) => {
  const cRef = useRef<SVGCircleElement>(null);
  const p1 = document.createElement("p");
  const showPopup = () => {
    const pointPos = cRef.current?.getBoundingClientRect();

    if (popRef.current && pointPos) {
      popRef.current.style.display = "block";
      p1.innerHTML = `${Math.round(dataValue)}`;
      popRef.current.appendChild(p1);

      // circle width is 7, we have to move tooltip to center of the element, so need to do next calculation
      popRef.current.style.left =
        pointPos.left - popRef.current.clientWidth / 2 + 3.5 + "px";
      popRef.current.style.top = pointPos.top - 25 + "px";
      popRef.current.style.backgroundColor = color;
    }
  };

  const hidePopup = () => {
    if (popRef.current) {
      popRef.current.innerHTML = "";
      popRef.current.style.display = "none";
    }
  };

  return (
    <circle
      fill={color}
      ref={cRef}
      cx={xValue}
      cy={yValue}
      r={radius}
      onMouseOver={showPopup}
      onMouseLeave={hidePopup}
    />
  );
};

const Ticks = ({
  correctingValueX,
  correctingValueY,
  data,
  maxValue,
}: MainProps) => {
  const tickStyles = {
    stroke: "grey",
    strokeWidth: `${0.005 * maxValue}px`,
  };

  return data.map((_, i) => {
    const xValue =
      i * Math.round((maxValue / columnsNumber) * aspectRatioValue) +
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
};

const Points = ({
  popRef,
  data,
  maxValue,
  correctingValueX,
  correctingValueY,
  chartCount,
}: PointsProps) => {
  console.log(data);

  return data.map((dataItem, i) => {
    const xValue = Math.round(
      i * (maxValue / columnsNumber) * aspectRatioValue + correctingValueX * 0.5
    );

    return Array.from(Array(chartCount).keys()).map((chartIndex) => {
      const yValue = dataItem.values[chartIndex] - correctingValueY * 0.5;

      return (
        <Point
          color={colorPerGraph[chartIndex] || "red"}
          dataValue={dataItem.values[chartIndex]}
          xValue={xValue}
          yValue={yValue}
          radius={maxValue * 0.04}
          popRef={popRef}
        />
      );
    });
  });
};

const VerticalLines = ({
  correctingValueX,
  correctingValueY,
  maxValue,
}: Omit<MainProps, "data">) => {
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
};

export const Chart = ({ data, chartCount }: ChartProps) => {
  const maxValue = Math.max(...data.map((v) => v.values).flat());
  const popRef = useRef<HTMLDivElement>(null);
  // we need 2 more values to make sure our points don't cut in the viewbox
  const correctingValueY = Math.round(0.1 * maxValue);
  const correctingValueX = Math.round(correctingValueY * 2.5);

  // console.log(maxValue * aspectRatioValue + correctingValueX);

  // After found the optimal view for the chart was discovered aspect-ratio value as 2.5/1
  // so width will be more then height in 2.5 times

  const coordinatesByDays = data.map((obj, i) => {
    return obj.values.map((item) => {
      console.log(
        maxValue * aspectRatioValue + correctingValueX,
        i,
        i *
          Math.round(
            (maxValue / columnsNumber) * aspectRatioValue +
              correctingValueX * 0.5
          )
      );

      return createCoordinate(
        Math.round(
          i * (maxValue / columnsNumber) * aspectRatioValue +
            correctingValueX * 0.5
        ),
        Math.round(item - correctingValueY * 0.5)
      );
    });
  });

  const polylineData = Array.from(Array(chartCount).keys()).map(
    (chartIndex) => {
      return coordinatesByDays.map((coordinate) => coordinate[chartIndex]);
    }
  );

  return (
    <>
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
            <Ticks
              data={data}
              correctingValueX={correctingValueX}
              correctingValueY={correctingValueY}
              maxValue={maxValue}
            />
            {polylineData.map((coordinatesData, index) => {
              return (
                <polyline
                  style={{
                    stroke: colorPerGraph[index],
                    strokeWidth: `${0.01 * maxValue}px`,
                    strokeLinecap: "square",
                    fill: "none",
                    height: "100%",
                  }}
                  points={`${coordinatesData.join(" ")}`}
                />
              );
            })}

            <VerticalLines
              correctingValueX={correctingValueX}
              correctingValueY={correctingValueY}
              maxValue={maxValue}
            />

            <g
            // fill="black"
            >
              <Points
                chartCount={chartCount}
                popRef={popRef}
                data={data}
                correctingValueX={correctingValueX}
                correctingValueY={correctingValueY}
                maxValue={maxValue}
              />
            </g>
          </g>
        </g>
      </svg>
      <div
        ref={popRef}
        className="popup hidden fixed rounded-sm p-[2px] text-white text-[8px] bg-red-400 z-10"
      />
    </>
  );
};
