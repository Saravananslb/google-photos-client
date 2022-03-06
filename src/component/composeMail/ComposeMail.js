import React, { useState } from "react";
// import { composeUserEmail } from "../../apiCall";
import "./ComposeMail.css";

export const ComposeMail = () => {

    const [compose, setCompose] = useState({
        emailTo: [],
        emailCC: [],
        emailBCC: [],
        body: '',
        subject: '',
        isSent: false
    })

    const composeEmail = async(isSent) => {
        // composeUserEmail({...compose, isSent: isSent}).then(res => {
        //     console.log(res)
        //     window.location.reload();
        // })
    }

  return (
    <>
      <div
        className="modal fade"
        id="composeMailModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                New Message
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => composeEmail(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="to-email-address">
                  To
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setCompose({...compose, emailTo: e.target.value.split(',')})}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="cc-email-address">
                  CC
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setCompose({...compose, emailCC: e.target.value.split(',')})}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="bcc-email-address">
                  BCC
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setCompose({...compose, emailBCC: e.target.value.split(',')})}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="email-subject">
                  Subject
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => setCompose({...compose, subject: e.target.value})}
                />
              </div>
              <div className="input-group">
                <textarea
                  className="form-control"
                  aria-label="With textarea"
                  className="mail-textarea"
                  onChange={(e) => setCompose({...compose, body: e.target.value})}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => composeEmail(true)}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
