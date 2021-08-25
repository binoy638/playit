import React, { useEffect, useState } from "react";

const PageMain = ({ heading, options }) => {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    if (options) {
      setSelectedOption(options[0].title);
    }
  }, [options]);

  return (
    <div className="page-container">
      <h1 className="page-heading">{heading}</h1>
      <ul>
        {options.map((option, key) => (
          <li
            className={selectedOption === option.title ? "active-option" : ""}
            onClick={() => setSelectedOption(option.title)}
            key={key}
          >
            {option.title}
          </li>
        ))}
      </ul>

      <div className="page-option-content">
        {selectedOption &&
          options.find((option) => option.title === selectedOption).component}
      </div>
    </div>
  );
};

export default PageMain;
