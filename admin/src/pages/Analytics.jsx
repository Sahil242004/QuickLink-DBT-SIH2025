//

// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   LineChart,
//   Line,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Users, CheckCircle, XCircle } from "lucide-react";

// const AnalyticsDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Mock data - replace with your API call
//   useEffect(() => {
//     const mockData = {
//       success: true,
//       data: {
//         totalUsers: 22,
//         seedingStatus: {
//           seeded: 11,
//           notSeeded: 9,
//         },
//         stateDistribution: [
//           { count: 4, state: "Maharashtra" },
//           { count: 4, state: "Gujarat" },
//           { count: 1, state: "maharashtra" },
//           { count: 4, state: "Uttar Pradesh" },
//           { count: 1, state: null },
//           { count: 4, state: "Madhya Pradesh" },
//           { count: 4, state: "Rajasthan" },
//         ],
//         categoryDistribution: [
//           { count: 1, category: null },
//           { count: 1, category: "general" },
//           { count: 5, category: "OBC" },
//           { count: 5, category: "SC" },
//           { count: 6, category: "General" },
//           { count: 4, category: "ST" },
//         ],
//         totalCheckUsage: 46,
//         topStatesByChecks: [
//           { totalChecks: 13, state: "Rajasthan" },
//           { totalChecks: 11, state: "Maharashtra" },
//           { totalChecks: 10, state: "Gujarat" },
//           { totalChecks: 8, state: "Madhya Pradesh" },
//           { totalChecks: 4, state: "Uttar Pradesh" },
//         ],
//         recentChecks: [
//           {
//             _id: "69243f73bfe01168034b4637",
//             email: "user9@example.com",
//             state: "Maharashtra",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-16T19:40:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b4638",
//             email: "user10@example.com",
//             state: "Rajasthan",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-15T13:14:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b4631",
//             email: "user3@example.com",
//             state: "Gujarat",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-14T14:12:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b463a",
//             email: "user12@example.com",
//             state: "Madhya Pradesh",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-14T10:18:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b463c",
//             email: "user14@example.com",
//             state: "Maharashtra",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-13T12:12:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b4634",
//             email: "user6@example.com",
//             state: "Uttar Pradesh",
//             isSeeded: false,
//             lastCheckedAt: "2025-11-13T08:22:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b4632",
//             email: "user4@example.com",
//             state: "Maharashtra",
//             isSeeded: false,
//             lastCheckedAt: "2025-11-12T16:45:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b4640",
//             email: "user18@example.com",
//             state: "Gujarat",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-12T13:33:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b4642",
//             email: "user20@example.com",
//             state: "Rajasthan",
//             isSeeded: true,
//             lastCheckedAt: "2025-11-11T18:20:00.000Z",
//           },
//           {
//             _id: "69243f73bfe01168034b463b",
//             email: "user13@example.com",
//             state: "Gujarat",
//             isSeeded: false,
//             lastCheckedAt: "2025-11-11T11:40:00.000Z",
//           },
//         ],
//       },
//     };

//     // Simulate API call
//     setTimeout(() => {
//       setData(mockData.data);
//       setLoading(false);
//     }, 500);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-xl text-gray-600">Loading analytics...</div>
//       </div>
//     );
//   }

//   // Clean and aggregate state data
//   const cleanStateData = data.stateDistribution
//     .filter((item) => item.state)
//     .reduce((acc, item) => {
//       const state =
//         item.state.charAt(0).toUpperCase() + item.state.slice(1).toLowerCase();
//       const existing = acc.find((s) => s.state === state);
//       if (existing) {
//         existing.count += item.count;
//       } else {
//         acc.push({ state, count: item.count });
//       }
//       return acc;
//     }, [])
//     .sort((a, b) => b.count - a.count);

//   // Clean category data
//   const cleanCategoryData = data.categoryDistribution
//     .filter((item) => item.category)
//     .map((item) => ({
//       category:
//         item.category.charAt(0).toUpperCase() +
//         item.category.slice(1).toLowerCase(),
//       count: item.count,
//     }))
//     .reduce((acc, item) => {
//       const existing = acc.find((c) => c.category === item.category);
//       if (existing) {
//         existing.count += item.count;
//       } else {
//         acc.push(item);
//       }
//       return acc;
//     }, []);

//   const COLORS = [
//     "#3b82f6",
//     "#8b5cf6",
//     "#ec4899",
//     "#f59e0b",
//     "#10b981",
//     "#06b6d4",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Analytics Dashboard
//         </h1>

//         {/* Counter Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Total Users */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">
//                   Total Users
//                 </p>
//                 <p className="text-3xl font-bold text-gray-800">
//                   {data.totalUsers}
//                 </p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Users className="w-8 h-8 text-blue-500" />
//               </div>
//             </div>
//           </div>

//           {/* Seeded Users */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">
//                   Seeded Users
//                 </p>
//                 <p className="text-3xl font-bold text-gray-800">
//                   {data.seedingStatus.seeded}
//                 </p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-full">
//                 <CheckCircle className="w-8 h-8 text-green-500" />
//               </div>
//             </div>
//           </div>

//           {/* Total Check Usage */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm font-medium mb-1">
//                   Total Checks
//                 </p>
//                 <p className="text-3xl font-bold text-gray-800">
//                   {data.totalCheckUsage}
//                 </p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <XCircle className="w-8 h-8 text-purple-500" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* First Row of Graphs */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* State Distribution Bar Chart */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Users by State
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={cleanStateData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="state"
//                   angle={-45}
//                   textAnchor="end"
//                   height={80}
//                 />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="count" fill="#3b82f6" name="Users" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Category Distribution Pie Chart */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Category Distribution
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={cleanCategoryData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ category, percent }) =>
//                     `${category} ${(percent * 100).toFixed(0)}%`
//                   }
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="count"
//                 >
//                   {cleanCategoryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Second Row of Graphs */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Top States by Check Usage */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Top States by Check Usage
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={data.topStatesByChecks} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" />
//                 <YAxis dataKey="state" type="category" width={100} />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="totalChecks" fill="#8b5cf6" name="Total Checks" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Seeding Status Pie Chart */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Seeding Status
//             </h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={[
//                     { name: "Seeded", value: data.seedingStatus.seeded },
//                     { name: "Not Seeded", value: data.seedingStatus.notSeeded },
//                   ]}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                   outerRadius={100}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   <Cell fill="#10b981" />
//                   <Cell fill="#ef4444" />
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Checks Over Time - Full Width */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Check Activity Over Time
//           </h2>
//           <ResponsiveContainer width="100%" height={350}>
//             <LineChart
//               data={(() => {
//                 // Process recentChecks data to group by date
//                 const checksByDate = data.recentChecks.reduce((acc, check) => {
//                   const date = new Date(check.lastCheckedAt).toLocaleDateString(
//                     "en-US",
//                     {
//                       month: "short",
//                       day: "numeric",
//                     }
//                   );
//                   const existing = acc.find((item) => item.date === date);
//                   if (existing) {
//                     existing.checks += 1;
//                     if (check.isSeeded) existing.seeded += 1;
//                     else existing.notSeeded += 1;
//                   } else {
//                     acc.push({
//                       date,
//                       checks: 1,
//                       seeded: check.isSeeded ? 1 : 0,
//                       notSeeded: check.isSeeded ? 0 : 1,
//                       timestamp: new Date(check.lastCheckedAt).getTime(),
//                     });
//                   }
//                   return acc;
//                 }, []);

//                 // Sort by date
//                 return checksByDate.sort((a, b) => a.timestamp - b.timestamp);
//               })()}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="checks"
//                 stroke="#3b82f6"
//                 strokeWidth={2}
//                 name="Total Checks"
//                 dot={{ r: 4 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="seeded"
//                 stroke="#10b981"
//                 strokeWidth={2}
//                 name="Seeded Users"
//                 dot={{ r: 4 }}
//               />
//               <Line
//                 type="monotone"
//                 dataKey="notSeeded"
//                 stroke="#ef4444"
//                 strokeWidth={2}
//                 name="Not Seeded Users"
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Stats Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Quick Stats
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-blue-600">
//                 {data.totalUsers}
//               </p>
//               <p className="text-sm text-gray-600">Total Users</p>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-green-600">
//                 {((data.seedingStatus.seeded / data.totalUsers) * 100).toFixed(
//                   1
//                 )}
//                 %
//               </p>
//               <p className="text-sm text-gray-600">Seeding Rate</p>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-purple-600">
//                 {(data.totalCheckUsage / data.totalUsers).toFixed(1)}
//               </p>
//               <p className="text-sm text-gray-600">Avg Checks/User</p>
//             </div>
//             <div className="text-center p-4 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-orange-600">
//                 {cleanStateData.length}
//               </p>
//               <p className="text-sm text-gray-600">Active States</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsDashboard;

import React, { useState, useEffect } from "react";
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, CheckCircle, XCircle } from "lucide-react";

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        // Fetch backend URL from environment variable
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("printing backend url ", backendUrl); // For Vite
        // OR
        // const backendUrl = process.env.REACT_APP_BACKEND_URL; // For Create React App

        const response = await fetch(`${backendUrl}/api/admin/getanalytics`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authorization if needed:
            // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
        });
        // console.log(response);
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        // const result = await response.json();
        // console.log(result);
        // if (result.success) {
        //   setData(result.data);
        // } else {
        //   console.error("API returned success: false");
        // }
        const result = await response.json();
        console.log(result);
        if (result.success) {
          setData(result.data);
          // ADD ↓

          setAiInsights(result.data.aiInsights);
        } else {
          console.error("API returned success: false");
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    console.log(aiInsights);
  }, [aiInsights]);

  // useEffect(() => {
  //   const mockData = {
  //     success: true,
  //     data: {
  //       totalUsers: 22,
  //       seedingStatus: {
  //         seeded: 11,
  //         notSeeded: 9,
  //       },
  //       stateDistribution: [
  //         { count: 4, state: "Maharashtra" },
  //         { count: 4, state: "Gujarat" },
  //         { count: 1, state: "maharashtra" },
  //         { count: 4, state: "Uttar Pradesh" },
  //         { count: 1, state: null },
  //         { count: 4, state: "Madhya Pradesh" },
  //         { count: 4, state: "Rajasthan" },
  //       ],
  //       categoryDistribution: [
  //         { count: 1, category: null },
  //         { count: 1, category: "general" },
  //         { count: 5, category: "OBC" },
  //         { count: 5, category: "SC" },
  //         { count: 6, category: "General" },
  //         { count: 4, category: "ST" },
  //       ],
  //       totalCheckUsage: 46,
  //       topStatesByChecks: [
  //         { totalChecks: 13, state: "Rajasthan" },
  //         { totalChecks: 11, state: "Maharashtra" },
  //         { totalChecks: 10, state: "Gujarat" },
  //         { totalChecks: 8, state: "Madhya Pradesh" },
  //         { totalChecks: 4, state: "Uttar Pradesh" },
  //       ],
  //       recentChecks: [
  //         {
  //           _id: "69243f73bfe01168034b4637",
  //           email: "user9@example.com",
  //           state: "Maharashtra",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-16T19:40:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b4638",
  //           email: "user10@example.com",
  //           state: "Rajasthan",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-15T13:14:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b4631",
  //           email: "user3@example.com",
  //           state: "Gujarat",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-14T14:12:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b463a",
  //           email: "user12@example.com",
  //           state: "Madhya Pradesh",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-14T10:18:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b463c",
  //           email: "user14@example.com",
  //           state: "Maharashtra",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-13T12:12:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b4634",
  //           email: "user6@example.com",
  //           state: "Uttar Pradesh",
  //           isSeeded: false,
  //           lastCheckedAt: "2025-11-13T08:22:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b4632",
  //           email: "user4@example.com",
  //           state: "Maharashtra",
  //           isSeeded: false,
  //           lastCheckedAt: "2025-11-12T16:45:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b4640",
  //           email: "user18@example.com",
  //           state: "Gujarat",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-12T13:33:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b4642",
  //           email: "user20@example.com",
  //           state: "Rajasthan",
  //           isSeeded: true,
  //           lastCheckedAt: "2025-11-11T18:20:00.000Z",
  //         },
  //         {
  //           _id: "69243f73bfe01168034b463b",
  //           email: "user13@example.com",
  //           state: "Gujarat",
  //           isSeeded: false,
  //           lastCheckedAt: "2025-11-11T11:40:00.000Z",
  //         },
  //       ],
  //     },
  //   };

  //   setTimeout(() => {
  //     setData(mockData.data);
  //     setLoading(false);
  //   }, 500);
  // }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-600">Loading analytics...</div>
      </div>
    );
  }

  // Clean and aggregate state data
  const cleanStateData = data.stateDistribution
    .filter((item) => item.state)
    .reduce((acc, item) => {
      const state =
        item.state.charAt(0).toUpperCase() + item.state.slice(1).toLowerCase();
      const existing = acc.find((s) => s.state === state);
      if (existing) {
        existing.count += item.count;
      } else {
        acc.push({ state, count: item.count });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count);

  // Clean category data
  const cleanCategoryData = data.categoryDistribution
    .filter((item) => item.category)
    .map((item) => ({
      category:
        item.category.charAt(0).toUpperCase() +
        item.category.slice(1).toLowerCase(),
      count: item.count,
    }))
    .reduce((acc, item) => {
      const existing = acc.find((c) => c.category === item.category);
      if (existing) {
        existing.count += item.count;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);

  // Seeded vs Not Seeded per State
  const stateSeededData = data.recentChecks.reduce((acc, check) => {
    if (!check.state) return acc;
    const state =
      check.state.charAt(0).toUpperCase() + check.state.slice(1).toLowerCase();
    const existing = acc.find((s) => s.state === state);
    if (existing) {
      if (check.isSeeded) existing.seeded += 1;
      else existing.notSeeded += 1;
    } else {
      acc.push({
        state,
        seeded: check.isSeeded ? 1 : 0,
        notSeeded: check.isSeeded ? 0 : 1,
      });
    }
    return acc;
  }, []);

  // Checks by Seeding Status over time
  const checksBySeeding = (() => {
    const checksByDate = data.recentChecks.reduce((acc, check) => {
      const date = new Date(check.lastCheckedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.checks += 1;
        if (check.isSeeded) existing.seeded += 1;
        else existing.notSeeded += 1;
      } else {
        acc.push({
          date,
          checks: 1,
          seeded: check.isSeeded ? 1 : 0,
          notSeeded: check.isSeeded ? 0 : 1,
          timestamp: new Date(check.lastCheckedAt).getTime(),
        });
      }
      return acc;
    }, []);
    return checksByDate.sort((a, b) => a.timestamp - b.timestamp);
  })();

  // Awareness Score by State (checks per user ratio)
  const awarenessScoreData = data.topStatesByChecks
    .map((stateCheck) => {
      const stateUserCount =
        cleanStateData.find((s) => s.state === stateCheck.state)?.count || 1;
      return {
        state: stateCheck.state,
        score: (stateCheck.totalChecks / stateUserCount).toFixed(2),
      };
    })
    .sort((a, b) => b.score - a.score);

  const COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Analytics Dashboard
        </h1>

        {/* When no data */}
        {aiInsights && (
          <div className="space-y-6">
            {/* Summary */}
            {aiInsights.summary && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-800 mb-1">📌 Summary</p>
                <p className="text-sm text-blue-900">{aiInsights.summary}</p>
              </div>
            )}

            {/* Top Insights */}
            {aiInsights.topInsights?.length > 0 && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800 mb-2">
                  ✨ Top Insights
                </p>
                <ul className="text-sm space-y-1 text-green-900">
                  {aiInsights.topInsights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Issues */}
            {aiInsights.issues?.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-semibold text-red-800 mb-2">⚠️ Issues</p>
                <ul className="text-sm space-y-1 text-red-900">
                  {aiInsights.issues.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Suggestions */}
            {aiInsights.suggestions?.length > 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-semibold text-yellow-800 mb-2">
                  🛠 Suggestions
                </p>
                <ul className="text-sm space-y-1 text-yellow-900">
                  {aiInsights.suggestions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>•</span> <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Alerts */}
            {aiInsights.alerts?.length > 0 && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="font-semibold text-purple-800 mb-2">🚨 Alerts</p>
                <ul className="text-sm space-y-1">
                  {aiInsights.alerts.map((alert, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start gap-2 ${
                        alert.level === "critical"
                          ? "text-red-700"
                          : alert.level === "warning"
                          ? "text-orange-700"
                          : "text-purple-900"
                      }`}
                    >
                      <span>•</span>
                      <span>
                        <strong>{alert.level.toUpperCase()}</strong>:{" "}
                        {alert.message}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <br />

        {/* Counter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {data.totalUsers}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Seeded Users
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {data.seedingStatus.seeded}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">
                  Total Checks
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {data.totalCheckUsage}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <XCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Row 1: Seeding Status Donut & State Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Seeding Status Donut Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Seeding Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Seeded", value: data.seedingStatus.seeded },
                    { name: "Not Seeded", value: data.seedingStatus.notSeeded },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* State Distribution Bar Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              State Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cleanStateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="state"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Row 2: Category Distribution & Top States by Checks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cleanCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) =>
                    `${category} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {cleanCategoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top States by Checks */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top States by Checks
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topStatesByChecks} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="state" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalChecks" fill="#8b5cf6" name="Total Checks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full Width: Recent Checks Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Checks Timeline
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={checksBySeeding}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="checks"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Total Checks"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="seeded"
                stroke="#10b981"
                strokeWidth={2}
                name="Seeded Users"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="notSeeded"
                stroke="#ef4444"
                strokeWidth={2}
                name="Not Seeded Users"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Row 3: Seeded vs Not Seeded per State & Checks by Seeding Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Seeded vs Not Seeded per State */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Seeded vs Not Seeded per State
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stateSeededData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="state"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="seeded" fill="#10b981" name="Seeded" />
                <Bar dataKey="notSeeded" fill="#ef4444" name="Not Seeded" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Checks by Seeding Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Checks by Seeding Status
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={checksBySeeding}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="seeded"
                  fill="#10b981"
                  name="Seeded"
                  stackId="a"
                />
                <Bar
                  dataKey="notSeeded"
                  fill="#ef4444"
                  name="Not Seeded"
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full Width: Awareness Score by State */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Awareness Score by State (Checks per User)
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={awarenessScoreData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#f59e0b" name="Awareness Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {data.totalUsers}
              </p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {((data.seedingStatus.seeded / data.totalUsers) * 100).toFixed(
                  1
                )}
                %
              </p>
              <p className="text-sm text-gray-600">Seeding Rate</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {(data.totalCheckUsage / data.totalUsers).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Avg Checks/User</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {cleanStateData.length}
              </p>
              <p className="text-sm text-gray-600">Active States</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

// ---------------------------------------------------------------------------------
