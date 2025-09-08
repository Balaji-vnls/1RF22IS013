import React, { useState } from "react";

function UrlForm({ addUrl }) {
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validity, setValidity] = useState(30);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/shorten", {  // 👈 thanks to proxy, no full URL needed
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: longUrl,
        shortcode: customCode,
        validity: parseInt(validity)
      }),
    });

    const data = await response.json();
    if (response.ok) {
      addUrl(data);
      setLongUrl("");
      setCustomCode("");
      setValidity(30);
    } else {
      alert(data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="url"
        placeholder="Enter URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Validity in minutes"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        style={{ marginRight: "10px", width: "60px" }}
      />
      <button type="submit">Shorten</button>
    </form>
  );
}

export default UrlForm;
