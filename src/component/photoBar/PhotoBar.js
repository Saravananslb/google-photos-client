import React, { useEffect, useRef, useState } from "react";
import "./PhotoBar.css";
import { SelectMenu } from "../selectMenu/SelectMenu";
import { HEADER_MENU_MAIL } from "../../constant";
import { getFormatedDate } from "../../utills/DateFormat";
import { useNavigate, useParams } from "react-router";
import { updateUserPhoto } from "../../apiCall";
const BACK_ARROW = require("../../assets/arrow-left-solid.svg");
const TRASH_BTN = require("../../assets/trash-can-regular.svg");
const STAR_BTN = require("../../assets/star-regular.svg");
const LEFT_BTN = require("../../assets/angle-left-solid.svg");
const RIGHT_BTN = require("../../assets/angle-right-solid.svg");
const STAR_BTN_SOLID = require("../../assets/star-solid.svg");
const ARCHIVE_BTN = require("../../assets/file-arrow-down-solid.svg")

export const PhotoBar = ({ photos }) => {
  const { photoTab, photoId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState({
    id: "",
    url: "",
    favorite: false,
  });
  const navigate = useNavigate();

  useEffect(() => {}, [photoTab, photoId]);

  const formatDate = getFormatedDate(photos.createdAt);
  const handleImageClick = (e) => {
    setSelectedPhoto(e);
  };

  const handleStar = async (id, fav) => {
    await updateUserPhoto({ id: id, favorite: fav })
      .then((res) => {
        if (res) {
          console.log(res);
          setSelectedPhoto({ ...selectedPhoto, favorite: res.data.isFavorite });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArchive = async (id, arch) => {
    await updateUserPhoto({ id: id, archive: arch })
      .then((res) => {
        if (res) {
          console.log(res);
          navigate(-1);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTrash = async (id, trash) => {
    await updateUserPhoto({ id: id, trash: trash })
      .then((res) => {
        if (res) {
          console.log(res);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container">
        <div style={{ padding: "10px" }}>{formatDate}</div>
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
          {photos.photos.map((item) => (
            <div
              className="col"
              onClick={() =>
                handleImageClick({
                  id: item.id,
                  url: item.url,
                  favorite: item.favorite,
                })
              }
            >
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
                <span type="button" data-bs-dismiss="modal" aria-label="Close">
                  <img
                    src={BACK_ARROW.default}
                    alt=""
                    width={20}
                    height={20}
                    className="photo-select"
                  />
                </span>
              </div>
              <span></span>
              <span>
                <img
                  src={
                    !selectedPhoto.favorite
                      ? STAR_BTN.default
                      : STAR_BTN_SOLID.default
                  }
                  alt=""
                  width={20}
                  height={20}
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() =>
                    handleStar(selectedPhoto.id, !selectedPhoto.favorite)
                  }
                />
                <img
                  src={ARCHIVE_BTN.default}
                  alt=""
                  width={20}
                  height={20}
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() =>
                    handleArchive(selectedPhoto.id, !selectedPhoto.archive)
                  }
                />
                <img
                  src={TRASH_BTN.default}
                  alt=""
                  style={{ cursor: "pointer" }}
                  width={20}
                  height={20}
                  onClick={() => handleTrash(selectedPhoto.id, true)}
                />
              </span>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col previous-photo-btn">
                    <img src={LEFT_BTN.default} alt="" width={20} height={20} />
                  </div>
                  <div class="col">
                    {selectedPhoto ? (
                      <img
                        src={selectedPhoto.url}
                        //   width={200}
                        //   height={200}
                        alt=""
                      />
                    ) : null}
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
  );
};
