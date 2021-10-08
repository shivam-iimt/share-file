// const bgprogress = document.querySelector(".bg-progress");
// const progresscontainer = document.querySelector(".progress-container");
// const progressbar =  document.querySelector(".progress-bar");
// const percentspan = document.querySelector(".percent");
// const fileURL = document.querySelector("#fileURL");
// const sharingcontainer = document.querySelector(".sharing-container ");
// const copyBtn = document.querySelector("#copybtn");
// const emailform = document.querySelector("#emailform");
// const toast = document.querySelector(".toast");

// const host = "http://localhost:8000/";
// const uploadURL = `${host}api/files`;
// const emailURL = `${host}api/files/send`;
// const maxaloudSize = 100 * 1024 * 1024;

// fileInput.addEventListener("change", () => {
//   uploadfile();
// });

// copyBtn.addEventListener("click", () => {
//   fileURL.select();
//   document.execCommand("copy");
//   showToast("Copied");
// });

// const uploadfile = () => {
//   if (fileInput.files.length > 1) {
//     fileInput.value = "";
//     showToast("Only upload 1 file at a time");
//     return;
//   }

//   const file = fileInput.files[0];
//   if (file.size > maxaloudSize) {
//     fileInput.value = "";
//     showToast("Can't upload more than 100MB");
//     return;
//   }

//   progresscontainer.style.display = "block";
//   const formdata = new FormData();
//   formdata.append("myfile", file);
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//       showlink(JSON.parse(xhr.response));
//     }
//   };

//   xhr.onprogress = updateProgress();
//   xhr.upload.onerror = () => {
//     fileInput.value = "";
//     showToast(`Error in upload: ${xhr.statusText}`);
//   };
//   xhr.open("POST", uploadURL);
//   xhr.send(formdata);
// };

// const updateProgress = (e) => {
//   const percent = Math.round((e.loaded / e.total) * 100);
//   bgprogress.style.width = `${percent}%`;
//   percentspan.innerText = percent;
//   progressbar.style.transform = `scaleX(${percent / 100})`;
// };

// const showlink = ({ file: url }) => {
//   emailform[2].removeAttribute("disabled");
//   fileInput.value = "";
//   progresscontainer.style.display = "none";
//   sharingcontainer.style.display = "block";
//   fileURL.value = url;
// };
emailform.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = fileURL.value;
  const formData = {
    uuid: url.split("/").splice(-1, 1)[0],
    emailTo: emailform.elements["to-email"].value,
    emailFrom: emailform.elements["from-email"].value,
  };

  emailform[2].setAttribute("disabled", "true");

  fetch(emailURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then(({ success }) => {
      if (success) {
        sharingcontainer.style.display = "none";
        showToast("Email sent");
      }
    });
});
