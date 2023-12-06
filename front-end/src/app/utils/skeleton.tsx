export default function Skeleton({ rows = 6, width = '28' }) {
  return (
    <div>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <div key={index} role="status" className="max-w-sm animate-pulse">
            <div className={` bg-gray-200 rounded-full dark:bg-gray-700 w-${width} opacity-0`}></div>
            <div className={`h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5`}></div>
          </div>
        ))}
    </div>
  );
}