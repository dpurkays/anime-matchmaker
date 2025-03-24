import { useState } from "react";
import "./Synopsis.scss";

function Synopsis({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 300;
  const toggleReadMore = () => setIsExpanded(!isExpanded);
  return (
    <p className="synopsis">
      {isExpanded ? text : `${text.slice(0, previewLength)}...`}
      <span className="synopsis__read-more" onClick={toggleReadMore}>
        {isExpanded ? "Read Less" : "Read More"}
      </span>
    </p>
  );
}

export default Synopsis;
