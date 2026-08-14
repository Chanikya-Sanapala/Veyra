"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

function ResumeMatcher() {
  const [jd, setJd] = useState(null);
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const topk = 35;
  const fuzzy = 85;

  const showToast = (message, type = "success") => {
    setToast({ message, type, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jd || !resume) {
      showToast("Please select both JD and Resume files!", "error");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("jd", jd);
    formData.append("resume", resume);
    formData.append("topk", topk);
    formData.append("fuzzy", fuzzy);

    try {
      const aiBaseUrl = (process.env.NEXT_PUBLIC_AI_SERVICE_URL || "http://localhost:8000").trim().replace(/\/$/, "");
      const response = await axios.post(`${aiBaseUrl}/api/match`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data);

      if (response.data) {
        const data = response.data;

        // Extract matched terms from matched_pairs
        const matched_terms = data.matched_pairs?.map((pair) => pair[0]) || [];
        const missing_terms = data.missing || [];
        const suggestions = missing_terms.length
          ? [`Consider adding missing terms: ${missing_terms.slice(0, 5).join(", ")}...`]
          : ["All required terms are present"];

        setResult({
          match_score: data.score,
          coverage: data.coverage,
          tfidf: data.tfidf,
          exact: data.exact_overlap,
          matched_terms,
          missing_terms,
          suggestions,
        });

        showToast(`Resume matched successfully! Score: ${data.score}`, "success");
      } else {
        setResult({ error: "No result returned from API" });
        showToast("Matching failed", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      setResult({ error: err.message });
      showToast(err.message || "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">

      {/* Toast */}
      {toast.visible && (
        <div
          className={`fixed top-5 right-5 px-4 py-3 rounded shadow-lg text-white z-50 transform transition-transform duration-300 ${
            toast.visible ? "translate-y-0 opacity-100" : "translate-y-[-20px] opacity-0"
          } ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      <h2 className="text-3xl font-bold mb-4 text-center">Resume Matcher</h2>

      {/* Selected files */}
      {/* <div className="mb-4">
        {jd && <p>JD File: <span className="font-semibold">{jd.name}</span></p>}
        {resume && <p>Resume File: <span className="font-semibold">{resume.name}</span></p>}
        <p>TopK: {topk}, Fuzzy: {fuzzy}</p>
      </div> */}

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="file"
          onChange={(e) => setJd(e.target.files[0])}
          className="border p-2 rounded w-full md:w-1/2"
          required
        />
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
          className="border p-2 rounded w-full md:w-1/2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Matching..." : "Match Resume"}
        </button>
      </form>

      {/* Error message */}
      {result?.error && (
        <p className="text-red-600 font-semibold">{result.error}</p>
      )}

      {/* Result display */}
      {result && !result.error && (
        <>
          {/* Match Score */}
          <div className="bg-white shadow rounded p-4 mb-6">
            <h4 className="text-xl font-semibold mb-2">Match Score</h4>
            <div className="w-full bg-gray-200 rounded h-6 mb-2">
              <div
                className={`h-6 rounded transition-all duration-500 ${
                  result.match_score > 80 ? "bg-green-500" : result.match_score > 50 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${result.match_score || 0}%` }}
              ></div>
            </div>
            <p className="text-gray-700">
              Coverage: {result.coverage ?? 0}, TF-IDF: {result.tfidf ?? 0}, Exact: {result.exact ?? 0}
            </p>
          </div>

          {/* Matched & Missing Terms */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Matched Terms */}
            <div className="bg-white shadow rounded p-4">
              <h5 className="font-semibold mb-2">
                Matched Terms ({result.matched_terms?.length || 0})
              </h5>
              <div className="flex flex-wrap gap-2 max-h-64 overflow-auto">
                {result.matched_terms?.length > 0 ? (
                  result.matched_terms.map((term, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {term}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-700">None ✅</span>
                )}
              </div>
            </div>

            {/* Missing Terms */}
            <div className="bg-white shadow rounded p-4">
              <h5 className="font-semibold mb-2">
                Missing Terms ({result.missing_terms?.length || 0})
              </h5>
              <div className="flex flex-wrap gap-2 max-h-64 overflow-auto">
                {result.missing_terms?.length > 0 ? (
                  result.missing_terms.map((term, idx) => (
                    <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                      {term}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-700">None missing ✅</span>
                )}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white shadow rounded p-4">
            <h5 className="font-semibold mb-2">Suggestions</h5>
            <ul className="list-disc list-inside text-gray-800">
              {result.suggestions?.length > 0 ? (
                result.suggestions.map((sug, idx) => <li key={idx}>{sug}</li>)
              ) : (
                <li className="text-gray-700">No suggestions</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ResumeMatcher;

