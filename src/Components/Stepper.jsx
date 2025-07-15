const Stepper = ({
  stepsCount = 0,
  currentStep = 0,
  accentColor = "#FCC822",
}) => {
  const steps = Array.from({ length: stepsCount }, (_, i) => i + 1);
  return (
    <div className="w-[70%] flex justify-center mx-auto overflow-auto pt-15">
      <ol className="flex items-center w-full mb-4 sm:mb-5 ">
        {steps.map((_, index) => {
          const isCompleted = index < currentStep;

          const isActive = index === currentStep;

          const circleColor = isCompleted || isActive ? accentColor : "#BDBDBD";
          const lineColor = isCompleted
            ? "after:border-[#FCC822]"
            : "after:border-[#D1D1D1]";

          return (
            <li
              key={index}
              className={`flex w-full items-center ${
                index < steps.length - 1
                  ? `after:content-[''] after:w-full after:h-1 after:border-b ${lineColor} after:border-4 after:inline-block`
                  : ""
              }`}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 text-[#33333380] font-medium"
                style={{ backgroundColor: circleColor }}
              >
                {index + 1}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Stepper;
