import "./App.css";
import React, { useRef, useState } from "react";
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import Sharing from "./Sharing";
function App() {
  const [fileInput, setfileInput] = useState("");
  const [progress, setprogressCont] = useState({});
  const [sharing, setsharingCont] = useState({});
  const { progresscont, bg_progress, percentspan, progressbar } = progress;
  const { fileURL, emailform, sharingcont } = sharing;
  const host = "http://localhost:8000/";
  const uploadURL = `${host}api/files`;
  const emailURL = `${host}api/files/send`;
  const toast = useRef(null);
  let toastTimer;

  const showToast = (msg) => {
    toast.current.innerText = msg;
    toast.current.style.transform = "translate(-50%,0)";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.current.style.transform = "translate(-50%,60px)";
    }, 2000);
  };
  // console.log(emailform);
  const showlink = ({ file: url }) => {
    emailform.current[2].removeAttribute("disabled");
    fileInput.current.value = "";
    progresscont.current.style.display = "none";
    sharingcont.current.style.display = "block";
    fileURL.current.value = url;
  };

  const uploadfile = () => {
    console.log(fileInput);
    if (fileInput !== "" && progress !== {}) {
      if (fileInput.current.files.length > 1) {
        fileInput.current.value = "";
        showToast("Only upload 1 file at a time");
        return;
      }
      const maxaloudSize = 100 * 1024 * 1024;
      const file = fileInput.current.files[0];
      if (file.size > maxaloudSize) {
        fileInput.current.value = "";
        showToast("Can't upload more than 100MB");
        return;
      }
      progresscont.current.style.display = "block";
      const formdata = new FormData();
      formdata.append("myfile", file);

      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          showlink(JSON.parse(xhr.response));
        }
      };
      console.log(xhr.onprogress);
      // xhr.onprogress = updateProgress();
      xhr.upload.onerror = () => {
        fileInput.current.value = "";
        showToast(`Error in upload: ${xhr.statusText}`);
      };
      xhr.open("POST", uploadURL);
      xhr.send(formdata);
    }
  };
  const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    bg_progress.current.style.width = `${percent}%`;
    percentspan.current.innerText = percent;
    progressbar.current.style.transform = `scaleX(${percent / 100})`;
  };

  const finalSubmit = (e) => {
    e.preventDefault();
    const url = fileURL.current.value;
    const formData = {
      uuid: url.split("/").splice(-1, 1)[0],
      emailTo: emailform.current.elements["to-email"].value,
      emailFrom: emailform.current.elements["from-email"].value,
    };

    emailform.current[2].setAttribute("disabled", "true");

    fetch(emailURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (success) {
          sharingcont.current.style.display = "none";
          showToast("Email sent");
        }
      });
  };

  return (
    <>
      <section className="upload-container">
        <Dropzone setfileInput={setfileInput} uploadfile={uploadfile} />
        <Progress showToast={showToast} setprogressCont={setprogressCont} />
        <Sharing
          showToast={showToast}
          setsharingCont={setsharingCont}
          finalSubmit={finalSubmit}
        />
      </section>
      <div className="toast" ref={toast}>
        hello
      </div>
    </>
  );
}

export default App;
