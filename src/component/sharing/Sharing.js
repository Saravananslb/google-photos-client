import React, { useEffect, useRef } from "react";
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

export const Sharing = ({ photos }) => {
  const { photoTab, photoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(photoId);
  }, [photoTab, photoId]);

  const formatDate = photos ? getFormatedDate(photos.createdAt) : "";

  return (
    <>
      {photoTab && !photoId ? (
        <>
          
          <div class="container">
            <div class="row">
              <div class="col-3"></div>
              <div class="col" style={{ cursor: 'pointer' }} onClick={() => navigate('hghjgs')}>
                <img
                  src="https://pbs.twimg.com/profile_images/1267713887165485061/WUR4QXtd_400x400.jpg"
                  width={80}
                  height={80}
                  alt=""
                />
                <span style={{ paddingLeft: "20px" }}>Flipkart</span>
                <hr />
              </div>
              <div class="col-3"></div>
            </div>
          </div>
        </>
      ) : null}
      {(photoTab && photoId) ? (
        <>
          <div className="container">
            <div style={{ padding: "10px" }}>{formatDate}</div>
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
              {photos.photos.map((item) => (
                <div className="col">
                  <div className="p-3 photo-select photo-frame">
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <img src={item.url} width={200} height={200} alt="" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                    <img
                      src={STAR_BTN.default}
                      alt=""
                      width={20}
                      height={20}
                      style={{ float: "right" }}
                    />
                  </span>
                  <span>
                    <img
                      src={TRASH_BTN.default}
                      alt=""
                      width={20}
                      height={20}
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
                          src="https://pbs.twimg.com/profile_images/1267713887165485061/WUR4QXtd_400x400.jpg"
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
