// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// import { backendUrl } from "../App";
// import { assets } from "../assets/assets.js";

// export default function PdfUploadComponent() {
//   const [pdfs, setPdfs] = useState([{ file: null, title: "" }]); // for new uploads
//   const [existingPdfs, setExistingPdfs] = useState([]); // already uploaded

//   // -----------------------------
//   // FETCH EXISTING PDFs
//   // -----------------------------
//   const fetchExistingPdfs = async () => {
//     try {
//       const res = await axios.get(`${backendUrl}/api/file/files`);
//       if (res.data.success) setExistingPdfs(res.data.files);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchExistingPdfs();
//   }, []);

//   // -----------------------------
//   // HANDLE NEW PDF SELECTION
//   // -----------------------------
//   const handlePdfChange = (index, file) => {
//     const updated = [...pdfs];
//     updated[index].file = file;
//     updated[index].title = file.name.replace(".pdf", "");
//     setPdfs(updated);
//   };

//   // -----------------------------
//   // REMOVE NEW PDF
//   // -----------------------------
//   const removePdf = (index) => {
//     const updated = [...pdfs];
//     updated[index] = { file: null, title: "" };
//     setPdfs(updated);
//   };

//   // -----------------------------
//   // DELETE EXISTING PDF
//   // -----------------------------
//   const deleteExistingPdf = async (id) => {
//     try {
//       await axios.delete(`${backendUrl}/api/file/delete/${id}`);
//       setExistingPdfs(existingPdfs.filter((pdf) => pdf._id !== id));
//       toast.success("PDF deleted successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete PDF");
//     }
//   };

//   // -----------------------------
//   // UPLOAD NEW PDF
//   // -----------------------------
//   const handleUpload = async (index) => {
//     const item = pdfs[index];
//     if (!item.file) {
//       toast.error("Please select a PDF first");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", item.file);
//     formData.append("title", item.title);

//     try {
//       const res = await axios.post(`${backendUrl}/api/file/upload`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         toast.success("PDF uploaded successfully!");
//         fetchExistingPdfs();
//         removePdf(index); // reset input
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Upload failed");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8">
//       {/* -------------------- UPLOAD NEW PDF -------------------- */}
//       <div>
//         <h2 className="text-lg font-bold mb-3">Upload New PDFs</h2>
//         {pdfs.map((item, index) => (
//           <div key={index} className="flex items-center gap-6 relative">
//             {/* Upload / PDF icon */}
//             <label htmlFor={`pdfUpload-${index}`} className="cursor-pointer">
//               <img
//                 className="w-20"
//                 src={!item.file ? assets.upload_area : assets.pdficon}
//               />
//             </label>

//             <input
//               id={`pdfUpload-${index}`}
//               type="file"
//               hidden
//               accept="application/pdf"
//               onChange={(e) => handlePdfChange(index, e.target.files[0])}
//             />

//             {/* Remove button */}
//             {item.file && (
//               <button
//                 type="button"
//                 onClick={() => removePdf(index)}
//                 className="absolute top-0 left-[70px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//               >
//                 ×
//               </button>
//             )}

//             {/* Name input */}
//             <input
//               className="w-full max-w-[400px] px-3 py-2 border rounded"
//               type="text"
//               placeholder="Document title"
//               value={item.title}
//               onChange={(e) => {
//                 const updated = [...pdfs];
//                 updated[index].title = e.target.value;
//                 setPdfs(updated);
//               }}
//               required={!!item.file}
//             />

//             {/* Upload button */}
//             <button
//               type="button"
//               className="px-3 py-1 bg-blue-600 text-white rounded"
//               onClick={() => handleUpload(index)}
//             >
//               Upload
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* -------------------- EXISTING PDFs -------------------- */}

//       <div>
//         <h2 className="text-lg font-bold mb-3">Already Uploaded</h2>
//         {existingPdfs.length === 0 && <p>No PDFs uploaded yet.</p>}

//         <div className="flex flex-col gap-3">
//           {existingPdfs.map((pdf) => (
//             <div
//               key={pdf._id}
//               className="flex items-center gap-4 p-2 border rounded"
//             >
//               <img src={assets.pdficon} className="w-10" />
//               <p className="flex-1">{pdf.title}</p>
//               <a
//                 href={pdf.fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-3 py-1 bg-green-600 text-white rounded"
//               >
//                 Download
//               </a>
//               <button
//                 className="px-3 py-1 bg-red-600 text-white rounded"
//                 onClick={() => deleteExistingPdf(pdf._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { backendUrl } from "../App";
import { assets } from "../assets/assets.js";

export default function PdfUploadComponent() {
  const [pdfs, setPdfs] = useState([
    { file: null, title: "", description: "" },
  ]); // for new uploads

  const [existingPdfs, setExistingPdfs] = useState([]); // already uploaded

  // -----------------------------
  // FETCH EXISTING PDFs
  // -----------------------------
  const fetchExistingPdfs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/file/files`);
      if (res.data.success) setExistingPdfs(res.data.files);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExistingPdfs();
  }, []);

  // -----------------------------
  // HANDLE NEW PDF SELECTION
  // -----------------------------
  const handlePdfChange = (index, file) => {
    const updated = [...pdfs];
    updated[index].file = file;
    updated[index].title = file.name.replace(".pdf", "");
    setPdfs(updated);
  };

  // -----------------------------
  // REMOVE NEW PDF
  // -----------------------------
  const removePdf = (index) => {
    const updated = [...pdfs];
    updated[index] = { file: null, title: "", description: "" }; // Reset all values
    setPdfs(updated);
  };

  // -----------------------------
  // DELETE EXISTING PDF
  // -----------------------------
  const deleteExistingPdf = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/file/delete/${id}`);
      setExistingPdfs(existingPdfs.filter((pdf) => pdf._id !== id));
      toast.success("PDF deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete PDF");
    }
  };

  // -----------------------------
  // UPLOAD NEW PDF
  // -----------------------------
  const handleUpload = async (index) => {
    const item = pdfs[index];
    if (!item.file) {
      toast.error("Please select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", item.file);
    formData.append("title", item.title);
    formData.append("description", item.description); // ⭐ new field

    try {
      const res = await axios.post(`${backendUrl}/api/file/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("PDF uploaded successfully!");
        fetchExistingPdfs();
        removePdf(index); // reset input
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* -------------------- UPLOAD NEW PDF -------------------- */}
      <div>
        <h2 className="text-lg font-bold mb-3">Upload New PDFs</h2>

        {pdfs.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border rounded-xl"
          >
            <div className="flex items-center gap-6 relative">
              {/* Upload / PDF icon */}
              <label htmlFor={`pdfUpload-${index}`} className="cursor-pointer">
                <img
                  className="w-20"
                  src={!item.file ? assets.upload_area : assets.pdficon}
                />
              </label>

              <input
                id={`pdfUpload-${index}`}
                type="file"
                hidden
                accept="application/pdf"
                onChange={(e) => handlePdfChange(index, e.target.files[0])}
              />

              {/* Remove button */}
              {item.file && (
                <button
                  type="button"
                  onClick={() => removePdf(index)}
                  className="absolute top-0 left-[70px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              )}

              {/* Title input */}
              <input
                className="w-full max-w-[400px] px-3 py-2 border rounded"
                type="text"
                placeholder="Document title"
                value={item.title}
                onChange={(e) => {
                  const updated = [...pdfs];
                  updated[index].title = e.target.value;
                  setPdfs(updated);
                }}
                required={!!item.file}
              />
            </div>

            {/* ⭐ Description input (new) */}
            <input
              className="w-full max-w-[400px] px-3 py-2 border rounded"
              type="text"
              placeholder="One-line description"
              value={item.description}
              onChange={(e) => {
                const updated = [...pdfs];
                updated[index].description = e.target.value;
                setPdfs(updated);
              }}
            />

            {/* Upload button */}
            <button
              type="button"
              className="px-3 py-1 bg-blue-600 text-white rounded-md w-fit"
              onClick={() => handleUpload(index)}
            >
              Upload
            </button>
          </div>
        ))}
      </div>

      {/* -------------------- EXISTING PDFs -------------------- */}
      <div>
        <h2 className="text-lg font-bold mb-3">Already Uploaded</h2>

        {existingPdfs.length === 0 && <p>No PDFs uploaded yet.</p>}

        <div className="flex flex-col gap-3">
          {existingPdfs.map((pdf) => (
            <div
              key={pdf._id}
              className="flex items-center gap-4 p-3 border rounded-md"
            >
              <img src={assets.pdficon} className="w-10" />
              <div className="flex-1">
                <p className="font-semibold">{pdf.title}</p>
                <p className="text-gray-600 text-sm">{pdf.description}</p>
              </div>

              <a
                href={pdf.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Download
              </a>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => deleteExistingPdf(pdf._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
