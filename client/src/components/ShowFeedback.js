import React, { useEffect } from "react";

const ShowFeedback = ({ grades }) => {
  return (
    <div className="FeedbackText">
      {grades &&
        grades.map((grade) => (
          <p>
            {grade.name}: {grade.grade}
          </p>
        ))}
    </div>
  );
};

export default ShowFeedback;
