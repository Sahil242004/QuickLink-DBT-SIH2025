import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { backendUrl } from "../App";
import { assets } from "../assets/assets.js"; // keep for icons if you want

export default function ResourcesVideo() {
  const [videos, setVideos] = useState([
    { videoId: "", title: "", description: "", duration: "" },
  ]);

  const [existingVideos, setExistingVideos] = useState([]);

  // -----------------------------
  // FETCH EXISTING VIDEOS
  // -----------------------------
  const fetchExistingVideos = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/video/all`);
      console.log(res);
      setExistingVideos(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExistingVideos();
  }, []);

  // -----------------------------
  // HANDLE VIDEO FIELD CHANGE
  // -----------------------------
  const handleChange = (index, field, value) => {
    const updated = [...videos];
    updated[index][field] = value;

    // Auto-generate thumbnail preview when videoId is typed
    if (field === "videoId" && value.length > 3) {
      updated[
        index
      ].thumbnail = `https://img.youtube.com/vi/${value}/maxresdefault.jpg`;
    }

    setVideos(updated);
  };

  // -----------------------------
  // REMOVE NEW VIDEO INPUT BLOCK
  // -----------------------------
  const removeVideo = (index) => {
    const updated = [...videos];
    updated[index] = { videoId: "", title: "", description: "", duration: "" };
    setVideos(updated);
  };

  // -----------------------------
  // DELETE EXISTING VIDEO
  // -----------------------------
  const deleteExistingVideo = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/video/delete/${id}`);
      setExistingVideos(existingVideos.filter((v) => v._id !== id));
      toast.success("Video deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  // -----------------------------
  // UPLOAD NEW VIDEO
  // -----------------------------
  const handleUpload = async (index) => {
    const item = videos[index];

    if (!item.videoId || !item.title) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(`${backendUrl}/api/video/upload`, item);

      toast.success("Video added!");
      fetchExistingVideos();
      removeVideo(index);
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* -------------------- ADD NEW VIDEO -------------------- */}
      <div>
        <h2 className="text-lg font-bold mb-3">Upload New Videos</h2>

        {videos.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 p-4 border rounded-xl"
          >
            <div className="flex items-center gap-6 relative">
              {/* Thumbnail Preview OR Upload Icon */}
              <label className="cursor-pointer">
                <img
                  className="w-32 h-20 object-cover rounded"
                  src={
                    item.videoId
                      ? `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`
                      : assets.upload_area
                  }
                />
              </label>

              {/* Remove Button */}
              {item.videoId && (
                <button
                  type="button"
                  onClick={() => removeVideo(index)}
                  className="absolute top-0 left-[90px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              )}

              {/* Title Input */}
              <input
                className="w-full max-w-[400px] px-3 py-2 border rounded"
                type="text"
                placeholder="Video title"
                value={item.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                required
              />
            </div>

            {/* Video ID */}
            <input
              className="w-full max-w-[400px] px-3 py-2 border rounded"
              type="text"
              placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)"
              value={item.videoId}
              onChange={(e) => handleChange(index, "videoId", e.target.value)}
            />

            {/* Description */}
            <input
              className="w-full max-w-[400px] px-3 py-2 border rounded"
              type="text"
              placeholder="Short description"
              value={item.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
            />

            {/* Duration */}
            <input
              className="w-full max-w-[400px] px-3 py-2 border rounded"
              type="text"
              placeholder="Duration (e.g. 5:30)"
              value={item.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
            />

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

      {/* -------------------- EXISTING VIDEOS -------------------- */}
      <div>
        <h2 className="text-lg font-bold mb-3">Already Uploaded</h2>

        {existingVideos.length === 0 && <p>No videos uploaded yet.</p>}

        <div className="flex flex-col gap-3">
          {existingVideos.map((video) => (
            <div
              key={video._id}
              className="flex items-center gap-4 p-3 border rounded-md"
            >
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                className="w-20 h-14 object-cover rounded"
              />

              <div className="flex-1">
                <p className="font-semibold">{video.title}</p>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Watch
              </a>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => deleteExistingVideo(video._id)}
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
