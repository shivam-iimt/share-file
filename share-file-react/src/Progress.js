import React, { useRef, useEffect } from "react";
const Progress = ({ setprogressCont }) => {
  const progresscont = useRef(null);
  const bg_progress = useRef(null);
  const percentspan = useRef(null);
  const progressbar = useRef(null);
  useEffect(() => {
    setprogressCont({ progresscont, bg_progress, percentspan, progressbar });
  }, []);
  // console.log(bg_progress);
  return (
    <div className="progress-container" ref={progresscont}>
      <div className="bg-progress" ref={bg_progress}></div>
      <div className="inner-container">
        <div className="title">Uploading...</div>
        <div className="percent-container">
          <span id="percent" ref={percentspan}>
            0
          </span>
          %
        </div>
        <div className="progress-bar" ref={progressbar}></div>
      </div>
    </div>
  );
};

export default Progress;
