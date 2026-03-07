import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  IoWalletOutline, IoCartOutline, IoPeopleOutline, IoStatsChartOutline,
  IoTimeOutline, IoCheckmarkCircleOutline, IoReloadOutline
} from "react-icons/io5";

const DashboardOverview = () => {
//   satic data 
  const stats = [
    { title: "Total Revenue", value: "$28,450", icon: <IoWalletOutline />, color: "text-gray-800" },
    { title: "Orders", value: "312", icon: <IoCartOutline />, color: "text-gray-800" },
    { title: "Customers", value: "$28,450", icon: <IoPeopleOutline />, color: "text-gray-800" },
    { title: "Avg. Order Value", value: "$91.19", icon: <IoStatsChartOutline />, color: "text-gray-800" },
  ];

  const salesData = [
    { name: 'Jan', value: 186 }, { name: 'Feb', value: 305 }, { name: 'Mar', value: 237 },
    { name: 'Apr', value: 73 }, { name: 'May', value: 209 }, { name: 'Jun', value: 214 },
  ];

  const pieData = [
    { name: 'Category A', value: 400 }, { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 }, { name: 'Category D', value: 200 },
  ];
  const COLORS = ['#8B3D52', '#C48C5D', '#D9C582', '#632A3B'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-sans">
      {/* 1. Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <span className="text-xl text-gray-400">{item.icon}</span>
            </div>
            <h3 className="text-3xl font-bold tracking-tight">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview (Bar Chart) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-1">Sales Overview</h4>
          <p className="text-[10px] text-gray-400 mb-6 uppercase">January - June 2024</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#8B3D52" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend (Line Chart) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-1">Revenue Trend</h4>
          <p className="text-[10px] text-gray-400 mb-6 uppercase">January - June 2024</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8B3D52" strokeWidth={3} dot={{ r: 4, fill: "#8B3D52" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Category (Pie Chart) */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-1">Sales by Category</h4>
          <p className="text-[10px] text-gray-400 mb-6 uppercase">January - June 2024</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Bottom Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-6">Recent Orders</h4>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-50 rounded-full text-gray-400 text-xl">
                    {i % 2 === 0 ? <IoTimeOutline /> : <IoCheckmarkCircleOutline className="text-green-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">ORD-12345</p>
                    <p className="text-xs text-gray-400">Sarah Johnson</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">+$1,999.00</p>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${i % 2 === 0 ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                    {i % 2 === 0 ? 'Processing' : 'Delivered'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            View All
          </button>
        </div>

        {/* Top Performing Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="font-bold text-gray-800 mb-6">Top Performing Products</h4>
          <div className="space-y-6">
            {[
              { name: "Hydrating Essence", sales: "1250 units sold", price: "$1,999.00", img: "https://via.placeholder.com/50" },
              { name: "Brightening Serum", sales: "980 units sold", price: "$1,999.00", img: "https://via.placeholder.com/50" },
              { name: "Nourishing Cream", sales: "875 units sold", price: "$1,999.00", img: "https://via.placeholder.com/50" },
              { name: "Nourishing Cream", sales: "875 units sold", price: "$1,999.00", img: "https://via.placeholder.com/50" },
              { name: "Hydrating Essence", sales: "1250 units sold", price: "$1,999.00", img: "https://via.placeholder.com/50" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={item.img} className="w-12 h-12 rounded-lg object-cover" alt="" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.sales}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{item.price}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;


