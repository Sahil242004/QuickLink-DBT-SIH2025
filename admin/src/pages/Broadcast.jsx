// import React, { useState } from "react";

// export default function Broadcast() {
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");
//   const usersCount = 120; // replace with dynamic count if needed

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ subject, body });
//     alert("Mail sent!");
//   };

//   return (
//     <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
//       <p className="text-lg font-semibold">
//         Email will be broadcasted to users:{" "}
//         <span className="text-blue-600">{usersCount}</span>
//       </p>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Subject</label>
//           <input
//             type="text"
//             className="border px-3 py-2 rounded-lg w-full outline-none"
//             placeholder="Enter subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="font-medium">Body</label>
//           <textarea
//             className="border px-3 py-2 rounded-lg w-full outline-none min-h-[120px]"
//             placeholder="Write email body here"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Send Mail
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App"; // your backend base URL

export default function Broadcast() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersCount, setUsersCount] = useState(0);

  // Fetch count of users with isSeeded != true
  const fetchUserCount = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/user/count-not-seeded`);
      const data = await res.json();
      if (data.success) setUsersCount(data.count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  // ------------------- HANDLE SEND MAIL -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/email/send-alert-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Emails sent successfully!");
        setSubject("");
        setBody("");
      } else {
        toast.error(data.message || "Failed to send emails");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending emails");
    } finally {
      setLoading(false);
      fetchUserCount(); // refresh count after sending
    }
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
      <p className="text-lg font-semibold">
        Email will be broadcasted to users:{" "}
        <span className="text-blue-600">{usersCount}</span>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Subject</label>
          <input
            type="text"
            className="border px-3 py-2 rounded-lg w-full outline-none"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Body</label>
          <textarea
            className="border px-3 py-2 rounded-lg w-full outline-none min-h-[120px]"
            placeholder="Write email body here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={loading}
          ></textarea>
        </div>

        <button
          type="submit"
          className={`bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>
    </div>
  );
}
