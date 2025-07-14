export default function SkeletonBox({ className = "w-full h-4" }) {
  return (
    <div className={`bg-slate-700 rounded animate-pulse ${className}`} />
  );
}
