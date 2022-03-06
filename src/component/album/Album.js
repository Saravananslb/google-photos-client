import React, { useEffect, useRef, useState } from "react";
// import "./PhotoBar.css";
import { SelectMenu } from "../selectMenu/SelectMenu";
import { HEADER_MENU_MAIL } from "../../constant";
import { getFormatedDate } from "../../utills/DateFormat";
import { useNavigate, useParams } from "react-router";
const BACK_ARROW = require("../../assets/arrow-left-solid.svg");
const TRASH_BTN = require("../../assets/trash-can-regular.svg");
const STAR_BTN = require("../../assets/star-regular.svg");
const LEFT_BTN = require("../../assets/angle-left-solid.svg");
const RIGHT_BTN = require("../../assets/angle-right-solid.svg");

export const Album = ({ photos }) => {
  const { photoTab, photoId } = useParams();
  const [photosSelected, setPhotosSelected] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState({
    url: '',
    id: '',
    favorite: false
  })
  const navigate = useNavigate();
  console.log(photos)
  useEffect(() => {
    photos.map(item => {
      if (item.id === photoId) {
        setPhotosSelected(item.photos);
      }
    })
  }, [photoId]);

  const formatDate = photos ? getFormatedDate(photos.createdAt) : "";

  return (
    <>
      {photoTab && !photoId ? (
        <>
          
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              {photos.map((item) => (
                <div className="col" onClick={() => navigate(item.id)}>
                  <div className="p-3 photo-select photo-frame">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <img src={item?.photos[0]?.photos[0]?.url} width={200} height={200} alt="" />
                    </button>
                    <div>{item.name}</div>
                    <div>{item.photosCount} Items</div>
                  </div>
                </div>
              ))}
            </div>
        </>
      ) : null}
      {(photoTab && photoId) ? (
        <>
          {photosSelected.map(photoSelect => 
          <div className="container">
            <div style={{ padding: "10px" }}>{getFormatedDate(photoSelect.createdAt)}</div>
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              {photoSelect.photos.map((item) => (
                <div className="col">
                  <div className="p-3 photo-select photo-frame">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <img src={item.url} width={200} height={200} alt="" onClick={() => setSelectedPhoto({ id: item.id, url: item.url, favorite: item.favorite })} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          <div
            class="modal fade view-photo-modal"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header">
                  <div>
                    <span
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <img
                        src={BACK_ARROW.default}
                        alt=""
                        width={20}
                        height={20}
                        className="photo-select"
                      />
                    </span>
                  </div>
                  <span>
                    
                  </span>
                  <span>
                  <img
                      src={STAR_BTN.default}
                      alt=""
                      width={20}
                      height={20}
                      style={{ marginRight: "20px", cursor: "pointer" }}
                    />
                    <img
                      src={TRASH_BTN.default}
                      alt=""
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <div class="row">
                      <div class="col previous-photo-btn">
                        <img
                          src={LEFT_BTN.default}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      <div class="col">
                        <img
                          src={selectedPhoto.url}
                          //   width={200}
                          //   height={200}
                          alt=""
                        />
                      </div>
                      <div class="col next-photo-btn">
                        <img
                          src={RIGHT_BTN.default}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
