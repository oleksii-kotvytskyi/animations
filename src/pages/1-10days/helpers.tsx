const generateValue = () => Math.ceil(Math.random() * 10000);

const dayByNumber = (day: Date) => {
  return day.toLocaleDateString("default", {
    weekday: "short",
  });
};

const createDayPlusNumber = (dayToStart: Date, dayToSum: number) => {
  const newDate = new Date(
    dayToStart.getFullYear(),
    dayToStart.getMonth(),
    dayToStart.getDate() + dayToSum
  );

  return dayByNumber(newDate);
};

export const getPrevWeek = () => {
  const d = new Date();
  // set to Monday of this week
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  // set to previous Monday
  d.setDate(d.getDate() - 7);

  const prevSunday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 6);

  return {
    mondayFullDate: d,
    monday: d.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    }),
    sunday: prevSunday.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    }),
  };
};

export const useChartData = (date: Date) => {
  return {
    data: [
      {
        day: createDayPlusNumber(date, 0),
        value: generateValue(),
      },
      {
        day: createDayPlusNumber(date, 1),
        value: generateValue(),
      },
      {
        day: createDayPlusNumber(date, 2),
        value: generateValue(),
      },
      {
        day: createDayPlusNumber(date, 3),
        value: generateValue(),
      },
      {
        day: createDayPlusNumber(date, 4),
        value: generateValue(),
      },
      {
        day: createDayPlusNumber(date, 5),
        value: generateValue(),
      },
      {
        day: createDayPlusNumber(date, 6),
        value: generateValue(),
      },
    ],
  };
};

export const createCoordinate = (x: number, y: number) => {
  return `${x},${y}`;
};
