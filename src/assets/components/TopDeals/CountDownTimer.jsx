import React from "react";

function CountdownTimer() {
  // In a real implementation, this would be dynamic with useState and useEffect
  // For now, using static values as shown in the design
  const timeUnits = [
    { value: "00", label: "Days" },
    { value: "02", label: "Hours" },
    { value: "18", label: "Mins" },
    { value: "46", label: "Secs" },
  ];

  return (
    <div className="flex gap-2 items-center mx-0 mt-2 mb-6 max-sm:mx-0 max-sm:my-4">
      {timeUnits.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col gap-1 items-center">
            <div className="text-2xl leading-9 text-white">{unit.value}</div>
            <div className="text-xs tracking-wide uppercase text-white text-opacity-80">
              {unit.label}
            </div>
          </div>

          {index < timeUnits.length - 1 && (
            <div className="text-2xl text-white text-opacity-60">:</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default CountdownTimer;
