import React, { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";

function App() {
  const [urls, setUrls] = useState([]);

  const addUrl = (data) => {
    setUrls([...urls, data]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>URL Shortener</h2>
      <UrlForm addUrl={addUrl} />
      <UrlList urls={urls} />
    </div>
  );
}

export default App;
