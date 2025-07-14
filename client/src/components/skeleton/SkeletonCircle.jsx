export default function SkeletonCircle({ size = "w-10 h-10" }) {
  return (
    <div className={`bg-slate-700 rounded-full animate-pulse ${size}`} />
  );
}
