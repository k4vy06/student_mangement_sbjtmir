const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`} />
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <SkeletonBlock className="h-44 w-full rounded-2xl" />
    <div className="grid gap-4 md:grid-cols-3">
      <SkeletonBlock className="h-36" />
      <SkeletonBlock className="h-36" />
      <SkeletonBlock className="h-36" />
    </div>
    <SkeletonBlock className="h-64 rounded-2xl" />
  </div>
);

export const TableSkeleton = ({ rows = 7 }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="border-b border-slate-200 p-4 dark:border-slate-800">
      <SkeletonBlock className="h-5 w-48" />
    </div>
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="grid grid-cols-6 gap-4 p-4">
          <SkeletonBlock className="col-span-1 h-5" />
          <SkeletonBlock className="col-span-1 h-5" />
          <SkeletonBlock className="col-span-1 h-5" />
          <SkeletonBlock className="col-span-1 h-5" />
          <SkeletonBlock className="col-span-1 h-5" />
          <SkeletonBlock className="col-span-1 h-5" />
        </div>
      ))}
    </div>
  </div>
);
