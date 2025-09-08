import React from "react";

function UrlList({ urls }) {
  return (
    <div>
      <h3>Shortened URLs</h3>
      <ul>
        {urls.map((item, idx) => (
          <li key={idx}>
            <a href={item.short_url} target="_blank" rel="noreferrer">
              {item.short_url}
            </a>{" "}
            (expires at {item.expiry})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrlList;
