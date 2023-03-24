import React, { useEffect } from "react";

const ShowFeedback = ({ texts, evaluators }) => {
  useEffect(() => {
    console.log(texts);
  }, []);
  return (
    <div className="FeedbackText">
      {texts &&
        texts.map((text, i) => (
          <p>
            {evaluators[i]}: {text}
          </p>
        ))}
    </div>
  );
};

export default ShowFeedback;
