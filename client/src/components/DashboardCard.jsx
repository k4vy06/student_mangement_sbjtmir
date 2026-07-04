const DashboardCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between border border-gray-100 hover:shadow-md transition-shadow">
      <div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-4 rounded-full ${bgColor} text-xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
