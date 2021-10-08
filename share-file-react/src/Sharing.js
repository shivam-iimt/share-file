import React, { useRef, useEffect } from "react";

const Sharing = ({ showToast, setsharingCont, finalSubmit }) => {
  const fileURL = useRef(null);
  const emailform = useRef(null);
  const sharingcont = useRef(null);
  useEffect(() => {
    setsharingCont({ fileURL, emailform, sharingcont });
  }, []);
  return (
    <div className="sharing-container" ref={sharingcont}>
      <p className="expire">Link expires in 24 hrs</p>
      <div className="input-container">
        <input type="text" name="" ref={fileURL} id="fileURL" readOnly />
        <i
          className="far fa-copy"
          onClick={() => {
            fileURL.current.select();
            
            document.execCommand("copy");
            showToast("Copied");
          }}
          id="copybtn"
        ></i>
      </div>
      <p>Or Send Via Email</p>
      <div className="email-container">
        <form id="emailform" ref={emailform}>
          <div className="field">
            <label htmlFor="sender">Your email</label>

            <input type="email" required name="from-email" id="sender" />
          </div>
          <div className="field">
            <label htmlFor="reciever">Reciever's email</label>

            <input type="email" required name="to-email" id="reciever" />
          </div>
          <button type="submit" onSubmit={finalSubmit}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sharing;
