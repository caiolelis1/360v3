import React, { useEffect } from "react";

const ShowFeedback = ({ texts, evaluators }) => {
  useEffect(() => {
    console.log(texts);
  }, []);
  return (
    <div>
      {texts &&
        texts.map((text, i) => (
          <p>
            {text} - {evaluators[i]}
          </p>
        ))}
    </div>
  );
};

export default ShowFeedback;
