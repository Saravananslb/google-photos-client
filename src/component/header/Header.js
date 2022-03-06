import React, { useState } from "react";
import "./Header.css";
import { addPhoto, uploadImage } from "../../apiCall";
const UPLOAD = require("../../assets/arrow-up-from-bracket-solid.svg");

export const Header = () => {
  const [uploadedData, setUploadedData] = useState("");
  const [formData, setFormData] = useState("");

  function openFileDialog(accept, callback) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = accept;
    inputElement.addEventListener("change", callback);
    inputElement.dispatchEvent(new MouseEvent("click"));
  }

  const onFileChange = async(e) => {
    console.log(e)
    let file = e.path[0].files[0];
    
    setUploadedData(URL.createObjectURL(file));
    const form = new FormData();
    form.append("image", file);
    setFormData(form);
    const res = await uploadImage(form)
    if (res) {
      const image = res.data.image;
      addPhoto({ imagePath: image })
      window.location.reload();
    }
  };

  return (
    <>
      <div className="header-container">
        <div style={{ marginTop: "10px" }}>
          <img
            className="gmail-logo-header"
            src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
            srcSet="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
            alt=""
            aria-hidden="true"
            style={{ width: "60px", height: "30px" }}
          />
          <span
            style={{ color: "#5f6368", fontSize: "18px", paddingLeft: "10px" }}
          >
            Photos
          </span>
        </div>
        <div>
          <form className="search-form">
            <svg
              focusable="false"
              height="20px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
              <path d="M0,0h24v24H0V0z" fill="none"></path>
            </svg>
            <input
              type="text"
              placeholder="Search your photos"
              className="search-text"
            />
          </form>
        </div>
        <div className="upload-image-btn">
          <div
            id="upload-image"
            onClick={() => openFileDialog(".svg,.png,.jpg,.jpeg", onFileChange)}
            
          >
            <img src={UPLOAD.default} width={20} height={20} alt="" />
            <span style={{paddingLeft: '10px'}}>Upload</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
