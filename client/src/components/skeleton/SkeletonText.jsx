export default function SkeletonText({ lines = 2, className = "" }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="bg-slate-700 h-4 w-full rounded animate-pulse" />
      ))}
    </div>
  );
}
