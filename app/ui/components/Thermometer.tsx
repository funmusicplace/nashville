function Thermometer({
  current,
  goal,
  totalSupporters,
}: {
  current: number;
  goal: number;
  totalSupporters?: number;
}) {
  const percent = Math.min((current / goal) * 100, 100);
  return (
    <div>
      <div className="relative w-full h-10 flex items-center justify-between mb-2">
        <div className="flex flex-row items-end gap-1">
          <span className="text-xl">
            raised:{" "}
            <span className="font-bold text-2xl">
              ${current.toLocaleString()}
            </span>
          </span>
          <span className="italic">from {totalSupporters} supporters</span>
        </div>
        <div className="ml-2 text-xl ">
          of <span className="font-bold">${goal.toLocaleString()}</span> goal
        </div>
      </div>
      <div className="relative w-full h-5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-default transition-all duration-500 relative"
          style={{ width: `${percent}%` }}
          aria-valuenow={current}
          aria-valuemax={goal}
          aria-valuemin={0}
          role="progressbar"
        ></div>
      </div>
    </div>
  );
}
export default Thermometer;
