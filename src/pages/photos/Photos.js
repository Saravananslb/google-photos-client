import React, { useEffect, useState } from "react";
import "./Photos.css";
import { SideBar } from "../../component/sideBar/SideBar";
import { Header } from "../../component/header/Header";
import { PhotoBar } from "../../component/photoBar/PhotoBar";
import { Sharing } from "../../component/sharing/Sharing";
import { Album } from "../../component/album/Album";
import { getFormatedDate } from "../../utills/DateFormat";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ComposeMail } from "../../component/composeMail/ComposeMail";
import { addAlbum, getPhotos, getUserEmail, updateAlbumPhoto } from "../../apiCall";
import { useParams, useNavigate } from "react-router-dom";
import { b64toBlob } from "../../utills/b64toBlob";
const BACK_ARROW = require("../../assets/arrow-left-solid.svg");

export const Photos = () => {
  const [tab, setTab] = useState("photos");
  const [photos, setPhotos] = useState([]);
  const [album, setAlbum] = useState({
    name: "",
  });

  const [albumPhoto, setAlbumPhoto] = useState([]);
  const [selectedList, setSelectedList] = useState([]);

  const { photoTab, photoId } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    if (photoTab) setTab(photoTab);
    await getUserPhotos();
  }, [photoTab]);

  const getUserPhotos = async () => {
    getPhotos(photoTab).then((res) => {
      const photoArr = [];
      let newPhotos;
      console.log(res.data);
      if (photoTab === "album") {
        let photosCount = 0;
        newPhotos = res.data.map((item) => {
          item.photos = item.photos.map((elem) => {
            elem.photos = elem.photos.map((pht) => {
              photosCount++;
              pht.url = b64toBlob(pht.imagebs4);
              return pht;
            });
            return elem;
          });
          item.photosCount = photosCount;
          return item;
        });
      } else {
        newPhotos = res.data.map((item) => {
          item.photos = item.photos.map((elem) => {
            elem.url = b64toBlob(elem.imagebs4);
            return elem;
          });
          return item;
        });
      }

      setPhotos(newPhotos);
    });
  };

  const getAlbumAdd = async() => {
    getPhotos('photos').then((res) => {
      let newPhotos;
      newPhotos = res.data.map((item) => {
        item.photos = item.photos.map((elem) => {
          elem.url = b64toBlob(elem.imagebs4);
          return elem;
        });
        return item;
      });

      setAlbumPhoto(newPhotos);
    });
  }

  const updateAlbum = async() => {
    updateAlbumPhoto({id: photoId, photos: selectedList, add: true }).then(res => {
      console.log(res)
      setSelectedList([])
      navigate('/album');
      window.location.reload();
    }).catch(error => console.log(error))
  }

  const handleAlbumCreate = async () => {
    addAlbum(album)
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePhotoSelect = (e, id) => {
    let photos  = [...selectedList];
    const checked = e.target.checked;
    if (checked) {
      photos.push(id);
    }
    else {
      photos = photos.filter(item => item !== id);
    }
    setSelectedList(photos);
    console.log(photos)
  }

  return (
    <>
      <Header />
      <div className="mail-container">
        <div>
          <SideBar />
        </div>
        <div className="mail-list-show">
          {tab === "photos"
            ? photos.map((item) => <PhotoBar photos={item} />)
            : null}
          {tab === "sharing" ? (
            <>
              <div style={{ paddingLeft: "10px" }}>
                {photoId ? (
                  <img
                    src={BACK_ARROW.default}
                    alt=""
                    width={20}
                    height={20}
                    className="photo-select"
                    onClick={() => navigate(-1)}
                  />
                ) : null}
                <span style={{ paddingLeft: "10px" }}>Sharing</span>
              </div>
              <hr />
              {photoId ? (
                <span style={{ paddingLeft: "20px" }}>Flipkart</span>
              ) : null}
              {photos.map((item) => (
                <Sharing photos={item} />
              ))}
            </>
          ) : null}
          {tab === "album" ? (
            <>
              <div style={{ paddingLeft: "10px" }}>
                {photoId ? (
                  <img
                    src={BACK_ARROW.default}
                    alt=""
                    width={20}
                    height={20}
                    className="photo-select"
                    onClick={() => navigate(-1)}
                  />
                ) : null}
                <span style={{ paddingLeft: "10px" }}>Album</span>
                {!(photoId && photoTab) ? (
                  <span
                    style={{
                      float: "right",
                      paddingRight: "10px",
                      cursor: "pointer",
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#createAlbumModal"
                  >
                    Create an Album
                  </span>
                ) : <span style={{float: 'right', paddingRight: '10px', cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#addPhotoAlbumModal" onClick={async() => await getAlbumAdd()} >Add photo</span>}
              </div>
              <hr />
              {photoId ? (
                <span style={{ paddingLeft: "20px" }}>{}</span>
              ) : null}
              {/* {photos.map((item) => ( */}
              <Album photos={photos} />
              {/* ))} */}
            </>
          ) : null}

          {tab === "favorites" ? (
            <>
              <div style={{ paddingLeft: "10px" }}>
                {photoId ? (
                  <img
                    src={BACK_ARROW.default}
                    alt=""
                    width={20}
                    height={20}
                    className="photo-select"
                    onClick={() => navigate(-1)}
                  />
                ) : null}
                <span style={{ paddingLeft: "10px" }}>Favorites</span>
              </div>
              <hr />
              {photos.map((item) => (
                <PhotoBar photos={item} />
              ))}
            </>
          ) : null}

          {tab === "archive" ? (
            <>
              <div style={{ paddingLeft: "10px" }}>
                {photoId ? (
                  <img
                    src={BACK_ARROW.default}
                    alt=""
                    width={20}
                    height={20}
                    className="photo-select"
                    onClick={() => navigate(-1)}
                  />
                ) : null}
                <span style={{ paddingLeft: "10px" }}>Archive</span>
              </div>
              <hr />
              {photos.map((item) => (
                <PhotoBar photos={item} />
              ))}
            </>
          ) : null}

          {tab === "trash" ? (
            <>
              <div style={{ paddingLeft: "10px" }}>
                {photoId ? (
                  <img
                    src={BACK_ARROW.default}
                    alt=""
                    width={20}
                    height={20}
                    className="photo-select"
                    onClick={() => navigate(-1)}
                  />
                ) : null}
                <span style={{ paddingLeft: "10px" }}>Trash</span>
              </div>
              <hr />
              {photos.map((item) => (
                <PhotoBar photos={item} />
              ))}
            </>
          ) : null}
        </div>
      </div>

      <div
        class="modal fade view-photo-modal"
        id="createAlbumModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Album
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                placeholder="Add a title"
                onChange={(e) => setAlbum({ name: e.target.value })}
                style={{ padding: "15px", width: "100%", border: "none" }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleAlbumCreate()}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade view-photo-modal"
        id="addPhotoAlbumModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add photo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            {albumPhoto.map(pht => 
              <div className="container">
                <div style={{ padding: "10px" }}>{getFormatedDate(pht.createdAt)}</div>
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                  {pht.photos.map((item) => (
                    <div
                      className="col"
                      
                    >
                      <div className="p-3 photo-select photo-frame" style={{ cursor: 'pointer'}}>
                        <input
                          type="checkbox"
                          id={"photoSelect" + item.id}
                          checked={selectedList.includes(item.id)}
                          onChange={(e) => handlePhotoSelect(e, item.id)}
                        />
                        <label htmlFor={"photoSelect" + item.id}>
                          <img src={item.url} width={200} height={200} alt="" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => updateAlbum()}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
