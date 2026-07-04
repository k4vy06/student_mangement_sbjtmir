import { motion } from "framer-motion";

const Sparkline = ({ negative = false }) => (
  <svg viewBox="0 0 140 36" className="mt-3 h-9 w-full" aria-hidden="true">
    <defs>
      <linearGradient id={negative ? "spark-red" : "spark-blue"} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={negative ? "#ef4444" : "#1d72cf"} stopOpacity="0.38" />
        <stop offset="100%" stopColor={negative ? "#ef4444" : "#1d72cf"} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 30 L12 25 L24 27 L36 20 L48 24 L60 15 L72 21 L84 13 L96 17 L108 7 L120 14 L140 9 L140 36 L0 36 Z"
      fill={`url(#${negative ? "spark-red" : "spark-blue"})`}
    />
    <path
      d="M0 30 L12 25 L24 27 L36 20 L48 24 L60 15 L72 21 L84 13 L96 17 L108 7 L120 14 L140 9"
      fill="none"
      stroke={negative ? "#b91c1c" : "#075fb8"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />
  </svg>
);

const DashboardCard = ({ title, value, icon, tone = "cyan", trend = "+2.4%", negative = false }) => {
  const tones = {
    cyan: "bg-blue-100 text-blue-700 ring-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/50",
    emerald:
      "bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/50",
    amber:
      "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/50",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`grid h-12 w-12 place-items-center rounded-xl ring-1 ${tones[tone] || tones.cyan}`}>
          {icon}
        </div>
        <span className={`mt-12 text-sm font-bold ${negative ? "text-red-700" : "text-green-700"}`}>{trend}</span>
      </div>
      <div>
        <h3 className="mt-3 text-3xl font-black tracking-normal text-slate-950 dark:text-white">{value}</h3>
        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
      </div>
      <Sparkline negative={negative} />
    </motion.div>
  );
};

export default DashboardCard;
