import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cookie } from "../../apiCall";
import "./MailList.css";
import { getMonthName } from "../../utills/DateFormat";

export const MailList = ({ mail }) => {

    const navigate = useNavigate();

    const starredMail = async(body) => {
        // updateUserEmail(body).then(res => {
        //     if (res.data) {
        //         window.location.reload();
        //     }
        // })
    }

    const { type } = useParams();

    const handleMailSelect = async(mail) => {
        // if (!mail.readRecepient.includes(cookie.get("email"))){
        //    await updateUserEmail({id: mail._id, read: true});
        // }
        // navigate(`/mail/${type}/${mail._id}`);
    }

  return (
    <>
      {" "}
      <div className={!mail.readRecepient.includes(cookie.get("email")) ? "mail-preview-container unread" : "mail-preview-container"}>
        <div className="mail-preview-checkbox">
          <input type="checkbox" />
        </div>
        <div className="mail-preview-img" onClick={() => starredMail({id: mail._id, starred: !mail.starred.includes(cookie.get("email"))})}>
          <img
            src={ mail.starred.includes(cookie.get("email")) ? "https://www.gstatic.com/images/icons/material/system/1x/grade_black_20dp.png" : "https://www.gstatic.com/images/icons/material/system/1x/star_border_black_20dp.png"}
            alt=""
          />
        </div>
        <div className="mail-preview-username" onClick={() => handleMailSelect(mail)}>
          <span>{mail.from === cookie.get("email") ? "Me" : mail.from}</span>
        </div>
        <div className="mail-preview-text" onClick={() => handleMailSelect(mail)}>
          <span>
            {mail.subject} - {mail.body}
          </span>
        </div>
        <div className="mail-preview-time" onClick={() => handleMailSelect(mail)}>
          {getMonthName(new Date().getMonth(mail.createdAt)) +
            " " +
            new Date(mail.createdAt).getDate()}
        </div>
      </div>
    </>
  );
};
