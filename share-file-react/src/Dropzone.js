import React, { useRef, useEffect } from "react";
import img from "./file.png";

const Dropzone = ({ setfileInput, uploadfile }) => {
  const fileInput = useRef(null);
  useEffect(() => {
    setfileInput(fileInput);
  }, []);
  const DragOverfunc = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("dragged")) {
      e.target.classList.add("dragged");
    }
  };

  const DragLeavefunc = (e) => {
    e.preventDefault();
    e.target.classList.remove("dragged");
  };
  const Dropfunc = (e) => {
    e.preventDefault();
    e.target.classList.remove("dragged");
    const files = e.dataTransfer.files;
    if (files.length) {
      fileInput.current.files = files;
      uploadfile();
    }
  };

  return (
    <div
      className="drop-zone"
      onDragOver={DragOverfunc}
      onDrop={Dropfunc}
      onDragLeave={DragLeavefunc}
    >
      <div className="icon-container">
        <img
          src={img}
          className="right"
          alt="img not found"
          draggable="false"
        />
        <img src={img} className="left" alt="img not found" draggable="false" />
        <img
          src={img}
          className="center"
          alt="img not found"
          draggable="false"
        />
      </div>
      <input
        type="file"
        name=""
        id="fileinput"
        ref={fileInput}
        onChange={() => uploadfile()}
      />
      <div className="title">
        Drag your File here or{" "}
        <span
          className="browsebtn"
          onClick={() => {
            fileInput.current.click();
          }}
        >
          browse
        </span>
      </div>
    </div>
  );
};

export default Dropzone;
