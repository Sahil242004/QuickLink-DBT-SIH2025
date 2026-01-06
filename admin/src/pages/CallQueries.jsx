// import React, { useEffect, useState } from "react";

// export default function CallQueries() {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ------------------- Fetch call queries from backend -------------------
//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost:5000/api/call-queries");
//         const data = await res.json(); // backend should return array of queries
//         setQueries(data);
//       } catch (err) {
//         console.error("Error fetching queries:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQueries();
//   }, []);

//   // ------------------- Update status -------------------
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/call-queries/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       const data = await res.json();
//       console.log("Updated status:", data);

//       // Update locally
//       setQueries((prev) =>
//         prev.map((q) => (q._id === id ? { ...q, status: newStatus } : q))
//       );
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       {loading && <p className="text-gray-500">Loading...</p>}

//       {queries.map((query) => (
//         <div
//           key={query._id}
//           className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md"
//         >
//           <div className="flex flex-col">
//             <p className="font-bold">{query.phoneNumber}</p>
//             <p className="text-gray-500 text-sm">
//               {new Date(query.callTime).toLocaleString()}
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <span
//               className={`px-3 py-1 rounded-lg text-white ${
//                 query.status === "pending"
//                   ? "bg-yellow-500"
//                   : query.status === "called"
//                   ? "bg-green-500"
//                   : "bg-red-500"
//               }`}
//             >
//               {query.status}
//             </span>

//             <select
//               value={query.status}
//               onChange={(e) => handleStatusChange(query._id, e.target.value)}
//               className="border px-2 py-1 rounded-lg outline-none"
//             >
//               <option value="pending">pending</option>
//               <option value="called">called</option>
//               <option value="failed">failed</option>
//             </select>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState } from "react";

export default function AdminCallQueries() {
  const [queries, setQueries] = useState([
    {
      _id: "1",
      phoneNumber: "+91-9876543210",
      callTime: new Date(),
      status: "pending",
    },
    {
      _id: "2",
      phoneNumber: "+91-9123456789",
      callTime: new Date(),
      status: "called",
    },
    {
      _id: "3",
      phoneNumber: "+91-9988776655",
      callTime: new Date(),
      status: "failed",
    },
    {
      _id: "4",
      phoneNumber: "+91-9012345678",
      callTime: new Date(),
      status: "pending",
    },
    {
      _id: "5",
      phoneNumber: "+91-9234567890",
      callTime: new Date(),
      status: "called",
    },
  ]);

  // ------------------- Update status -------------------
  const handleStatusChange = (id, newStatus) => {
    setQueries((prev) =>
      prev.map((q) => (q._id === id ? { ...q, status: newStatus } : q))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Call queries</h2>
      {queries.map((query) => (
        <div
          key={query._id}
          className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md"
        >
          <div className="flex flex-col">
            <p className="font-bold">{query.phoneNumber}</p>
            <p className="text-gray-500 text-sm">
              {new Date(query.callTime).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-lg text-white ${
                query.status === "pending"
                  ? "bg-yellow-500"
                  : query.status === "called"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {query.status}
            </span>

            <select
              value={query.status}
              onChange={(e) => handleStatusChange(query._id, e.target.value)}
              className="border px-2 py-1 rounded-lg outline-none"
            >
              <option value="pending">pending</option>
              <option value="called">called</option>
              <option value="failed">failed</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
