import React from "react";

function Suggestion({ suggestions }) {
  return (
    <div className="search-suggestion">
      <div className="results">
        {suggestions.map((suggestion) => (
          <div className="result-item">
            {suggestion.artist}-{suggestion.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestion;
