import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { File, MessageCircleQuestionMark } from "lucide-react";

export default function UploadSummarizer() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { user: string; bot: string }[]
  >([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/summarize`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(res.data.summary);
      setChatHistory([]);
    } catch (err: any) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatHistory((prev) => [...prev, { user: userMessage, bot: "..." }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/chat`, {
        summary,
        question: userMessage,
      });

      setChatHistory((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { user: userMessage, bot: res.data.answer }
            : msg
        )
      );
    } catch (err: any) {
      console.error("Chat failed:", err.response?.data || err.message);
      setChatHistory((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { user: userMessage, bot: "Failed to get response" }
            : msg
        )
      );
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className=" flex max-w-7xl mx-auto w-full  flex-col items-center justify-center text-white sm:px-6 lg:px-8 py-8 backdrop-blur-lg  border border-white/20 rounded-2xl shadow-2xl ">
      <div className=" w-full ">
        <h1 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-md">
          PDF Summarizer & Chat
        </h1>
       
        {/* Upload Section */}
        <div className="w-full flex flex-col sm:flex-row justify-center gap-3 mb-8 items-center">
          {/* File Upload */}
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center gap-2 px-4 py-3 cursor-pointer rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all shadow-md"
          >
            <File className="w-5 h-5 text-blue-400" />
            {file ? (
              <span className="mt-2 sm:mt-0 text-base text-gray-300 truncate max-w-xs">
                {file.name}
              </span>
            ) : (
              <span className="mt-2 sm:mt-0 text-base text-gray-300 truncate max-w-xs">
                Choose File
              </span>
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="cursor-pointer px-5 text-white py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 disabled:opacity-70 transition-all shadow-lg"
          >
            {loading ? "Uploading & Summarizing..." : "Upload & Summarize"}
          </button>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="w-full mb-8">
            <div className="flex items-center text-center gap-2 mb-4">
              <File className="w-5 h-5 text-blue-400" />
              <span className="text-xl font-semibold ">Summary:</span>
            </div>
            <div className="bg-white/10 border border-white/20 p-4 rounded-lg shadow-inner text-gray-100 max-h-64 overflow-y-auto backdrop-blur-sm">
              {summary}
            </div>
          </div>
        )}

        {/* Chat Section */}
        {summary && (
          <div className="w-full flex flex-col">
            <div className="flex gap-3 items-center text-center">
           <MessageCircleQuestionMark className="w-5 h-5 text-blue-400" />
          <span className="text-xl font-semibold">
            Chat about PDF:
          </span>
        </div>
            <div className="flex-1 bg-white/10 border border-white/20 p-4 rounded-lg overflow-y-auto flex flex-col gap-4 shadow-inner mb-4 backdrop-blur-sm max-h-96">
              {chatHistory.length !== 0 &&
                chatHistory.map((msg, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="self-end bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-2xl max-w-xs break-words shadow-lg">
                      {msg.user}
                    </div>
                    <div className="self-start bg-gray-800/70 border border-white/10 text-gray-200 px-4 py-2 rounded-2xl max-w-xs break-words shadow-md">
                      {msg.bot}
                    </div>
                  </div>
                ))}
              <div ref={chatEndRef}></div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask a question about the PDF..."
                className="flex-1 p-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => e.key === "Enter" && handleChat()}
              />
              <button
                onClick={handleChat}
                disabled={chatLoading}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 disabled:opacity-50 transition-all shadow-lg"
              >
                {chatLoading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
