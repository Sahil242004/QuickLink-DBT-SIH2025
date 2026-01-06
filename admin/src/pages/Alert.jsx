// import React, { useEffect, useState } from "react";

// export default function AdminAlertTexts() {
//   const [messages, setMessages] = useState(["", "", ""]);
//   const [loading, setLoading] = useState(false);

//   // ------------------- Fetch existing messages from backend -------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Replace URL with your API endpoint
//         const res = await fetch("http://localhost:5000/api/alerts");
//         const data = await res.json();

//         // Expected from backend: { msg1: "...", msg2: "...", msg3: "..." }
//         setMessages([data.msg1 || "", data.msg2 || "", data.msg3 || ""]);
//       } catch (err) {
//         console.error("Error fetching messages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChange = (i, value) => {
//     const updated = [...messages];
//     updated[i] = value;
//     setMessages(updated);
//   };

//   // ------------------- Send updated messages to backend -------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/alerts/update", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           msg1: messages[0],
//           msg2: messages[1],
//           msg3: messages[2],
//         }),
//       });

//       const data = await res.json();
//       alert("Messages updated successfully!");
//       console.log("Backend response:", data);
//     } catch (err) {
//       console.error("Error updating messages:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
//       <h2 className="text-xl font-semibold">Update Alert Messages</h2>

//       {loading && <p className="text-gray-500">Loading...</p>}

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         {[0, 1, 2].map((i) => (
//           <div className="flex flex-col gap-2" key={i}>
//             <label className="font-medium">Message {i + 1}</label>
//             <textarea
//               className="border px-3 py-2 rounded-lg w-full outline-none min-h-[120px]"
//               placeholder={`Enter message ${i + 1}`}
//               value={messages[i]}
//               onChange={(e) => handleChange(i, e.target.value)}
//               maxLength={300} // optional
//             />
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { backendUrl } from "../App"; // replace with your backend base URL
import { toast } from "react-toastify";

export default function AdminAlertMessages() {
  const [messages, setMessages] = useState([]); // [{ _id, text }]
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------- FETCH EXISTING MESSAGES -------------------
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${backendUrl}/api/message/messages`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ------------------- ADD NEW MESSAGE -------------------
  const addMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`${backendUrl}/api/message/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newMessage }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages([data.message, ...messages]);
        setNewMessage("");
        toast.success("Message added!");
      } else {
        toast.error(data.message || "Cannot add message");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add message");
    }
  };

  // ------------------- DELETE MESSAGE -------------------
  const deleteMessage = async (id) => {
    try {
      await fetch(`${backendUrl}/api/message/messages/${id}`, {
        method: "DELETE",
      });
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success("Message deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-2xl shadow-md flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Admin Alert Messages</h2>

      {loading && <p className="text-gray-500">Loading...</p>}

      {/* ------------------- EXISTING MESSAGES ------------------- */}
      <div className="flex flex-col gap-3">
        {messages.length === 0 && <p>No messages uploaded yet.</p>}
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="flex items-center gap-4 p-2 border rounded"
          >
            <p className="flex-1">{msg.text}</p>
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => deleteMessage(msg._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ------------------- ADD NEW MESSAGE ------------------- */}
      <div className="flex flex-col gap-2 mt-4">
        <textarea
          className="border px-3 py-2 rounded-lg w-full outline-none min-h-[80px]"
          placeholder={
            messages.length >= 3
              ? "Max 3 messages reached"
              : "Type a new message"
          }
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={messages.length >= 3}
          maxLength={300}
        />
        <button
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={addMessage}
          disabled={messages.length >= 3 || !newMessage.trim()}
        >
          Add Message
        </button>
      </div>
    </div>
  );
}
