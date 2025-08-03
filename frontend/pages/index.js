import { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";
import Tabs from "@/components/ui/tabs";
import ModuleSelect from "@/components/ModuleSelect";
import Chat from "@/components/Chat";

// Diagnostic modules and corresponding API paths
const MODULES = [
  { value: "Personality", label: "Personality", path: "/modules/personality" },
  { value: "Career", label: "Career", path: "/modules/career" },
  { value: "Education", label: "Education", path: "/modules/education" },
  { value: "Marriage", label: "Marriage", path: "/modules/marriage" },
  { value: "Sexuality", label: "Sexuality", path: "/modules/sexuality" },
  { value: "Body Type", label: "Body Type", path: "/modules/body_type" },
  { value: "Karma", label: "Karma & Soul Path", path: "/modules/karma" },
  { value: "Foreign Travel", label: "Foreign Travel", path: "/modules/foreign_travel" },
  { value: "Spirituality", label: "Spirituality", path: "/modules/spirituality" },
  { value: "Ashtakavarga", label: "Ashtakavarga", path: "/modules/ashtakavarga" },
  { value: "Dasha Transit", label: "Dasha Transit", path: "/modules/dasha_transit" },
  { value: "Psychological", label: "Psychological", path: "/modules/psychological" },
  { value: "Health", label: "Health", path: "/modules/health" },
  { value: "Chronic Diseases", label: "Chronic Disease Indicators", path: "/modules/chronic" },
  { value: "Compatibility", label: "Compatibility", path: "/modules/compatibility" },
];

// Helper to get path from module value
const getModulePath = (value) => MODULES.find((m) => m.value === value)?.path;

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    tob: "",
    location: "",
    offset: "",
    modules: [],
    secondName: "",
    secondDob: "",
    secondTob: "",
    secondLocation: "",
    secondOffset: "",
  });
  const [results, setResults] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportLink, setReportLink] = useState(null);
  // Chat states
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModuleChange = (value, checked) => {
    setForm((prev) => {
      const setMods = new Set(prev.modules);
      if (checked) setMods.add(value);
      else setMods.delete(value);
      return { ...prev, modules: Array.from(setMods) };
    });
  };

  const postData = async (url, payload) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response.json();
  };

  const handleSubmit = async () => {
    setError(null);
    setResults([]);
    setReportLink(null);
    // Validate primary details
    if (!form.name || !form.dob || !form.tob || !form.location || !form.offset) {
      setError("Please complete all required fields.");
      return;
    }
    if (form.modules.length === 0) {
      setError("Please select at least one module.");
      return;
    }
    // Validate secondary details for compatibility
    if (form.modules.includes("Compatibility")) {
      if (!form.secondName || !form.secondDob || !form.secondTob || !form.secondLocation || !form.secondOffset) {
        setError("Please provide complete details for the second person.");
        return;
      }
    }
    setLoading(true);
    try {
      const newResults = [];
      for (const mod of form.modules) {
        const path = getModulePath(mod);
        if (!path) continue;
        const url = `${API_BASE}${path}`;
        const payload = {
          name: form.name,
          birth_date: form.dob,
          birth_time: form.tob,
          location: form.location,
          utc_offset: parseFloat(form.offset),
          modules: [],
        };
        if (mod === "Compatibility") {
          payload.second_name = form.secondName;
          payload.second_birth_date = form.secondDob;
          payload.second_birth_time = form.secondTob;
          payload.second_location = form.secondLocation;
          payload.second_utc_offset = parseFloat(form.secondOffset);
        }
        const res = await postData(url, payload);
        newResults.push(res);
      }
      setResults(newResults);
      if (newResults.length > 0) {
        setActiveTab(newResults[0].module);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    setError(null);
    setReportLink(null);
    const payload = {
      name: form.name,
      birth_date: form.dob,
      birth_time: form.tob,
      location: form.location,
      utc_offset: parseFloat(form.offset),
      modules: form.modules,
    };
    if (form.modules.includes("Compatibility")) {
      payload.second_name = form.secondName;
      payload.second_birth_date = form.secondDob;
      payload.second_birth_time = form.secondTob;
      payload.second_location = form.secondLocation;
      payload.second_utc_offset = parseFloat(form.secondOffset);
    }
    try {
      const res = await postData(`${API_BASE}/analyze?format=${format}`, payload);
      if (res.report_path) {
        setReportLink({ url: res.report_path, format });
      } else {
        setError("Failed to generate report.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Chat handler: send message to backend and add responses
  const handleChatSend = async (message) => {
    // Add user message
    setChatMessages((prev) => [...prev, { role: "user", text: message }]);
    // Trigger loading
    setChatLoading(true);
    try {
      const res = await postData(`${API_BASE}/api/chat`, { message });
      const reply = res.response;
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `Error fetching response: ${err.message}`,
        },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const tabs = results.map((res) => ({
    id: res.module,
    label: res.module.replace(/_/g, " "),
    content: (
      <div className="whitespace-pre-line text-sm leading-relaxed">
        {res.analysis}
      </div>
    ),
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        <Card>
          <h1 className="text-2xl font-bold mb-4">JyotishAI Diagnostic Tool</h1>
          {error && (
            <div className="mb-4 rounded border border-red-300 bg-red-50 p-2 text-red-700 text-sm">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <Input name="dob" value={form.dob} onChange={handleChange} type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time of Birth</label>
              <Input name="tob" value={form.tob} onChange={handleChange} type="time" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City &amp; Country</label>
              <Input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">UTC Offset</label>
              <Input name="offset" value={form.offset} onChange={handleChange} placeholder="e.g. +5.0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Select Modules</label>
              <ModuleSelect modules={MODULES} selected={form.modules} onChange={handleModuleChange} />
            </div>
            {form.modules.includes("Compatibility") && (
              <div className="md:col-span-2 border-t pt-4 mt-2">
                <h2 className="text-lg font-semibold mb-2">Second Person Details (for Compatibility)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input name="secondName" value={form.secondName} onChange={handleChange} placeholder="Partner's name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth</label>
                    <Input name="secondDob" value={form.secondDob} onChange={handleChange} type="date" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time of Birth</label>
                    <Input name="secondTob" value={form.secondTob} onChange={handleChange} type="time" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City &amp; Country</label>
                    <Input name="secondLocation" value={form.secondLocation} onChange={handleChange} placeholder="City, Country" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">UTC Offset</label>
                    <Input name="secondOffset" value={form.secondOffset} onChange={handleChange} placeholder="e.g. +5.0" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex space-x-2">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Analyzing..." : "Run Analysis"}
            </Button>
            {results.length > 0 && (
              <>
                <Button onClick={() => handleExport("pdf")}>Export PDF</Button>
                <Button onClick={() => handleExport("docx")}>Export DOCX</Button>
              </>
            )}
          </div>
          {reportLink && (
            <div className="mt-3 text-sm">
              Your report is ready:&nbsp;
              <a
                href={reportLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Download {reportLink.format.toUpperCase()}
              </a>
            </div>
          )}
        </Card>
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </Card>
            <Card className="md:col-span-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
              <div className="flex-1">
                <Chat messages={chatMessages} onSend={handleChatSend} loading={chatLoading} />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}