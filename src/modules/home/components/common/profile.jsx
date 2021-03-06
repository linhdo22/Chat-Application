import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import moment from "moment";

import Avatar from "./avatar.jsx";
import LineProfileInfo from "./line-profile-info.jsx";
import UserServices from "../../services/user.service";

function Profile(props) {
  const [dateOfBirth, setDateOfBirth] = useState(
    moment(props.target.dateOfBirth).format("YYYY-MM-DD") || "2000-01-01"
  );
  const [isEditted, setIsEditted] = useState(false);
  const [gender, setGender] = useState(props.target.gender || "male");
  const [name, setName] = useState(props.target.name || "");
  const [changingName, setChangingName] = useState(false);
  useEffect(() => {
    if (changingName) {
      document.getElementById("change-name").focus();
    }
  }, [changingName]);
  // change value
  const handleChangeBirth = (e) => {
    if (!isEditted) {
      setIsEditted(true);
    }
    setDateOfBirth(e.target.value);
  };
  const handleChangeGender = (e) => {
    if (!isEditted) {
      setIsEditted(true);
    }
    setGender(e.target.value);
  };
  const handleChangingName = (e) => {
    setChangingName(true);
  };
  const handleChangName = (e) => {
    if (!isEditted) {
      setIsEditted(true);
    }
    setName(e.target.value);
  };
  const handleStopChangingName = (e) => {
    setChangingName(false);
  };

  // handle click
  const handleUpdate = () => {
    UserServices.updateInfo({ name, dateOfBirth, gender }).then(() => {
      props.handleClose();
    });
  };
  const handleRemoveFriend = () => {
    UserServices.removeFriend(props.target._id, props.channelId).then(() => {
      props.handleClose();
    });
  };

  return (
    <>
      <div className="flex-fill">
        <div className="profile-background"></div>
        <div className="profile-info pt-4">
          <div className="profile-avatar">
            <Avatar height="80" width="80" src="../../../mushroom.png" />
          </div>
          <div className="text-center position-relative py-2">
            {!changingName ? (
              <>
                <span className="fw-bold fs-4">{name}</span>
                {props.friend || props.me ? (
                  <i
                    className="text-btn far fa-edit position-absolute end-0 me-2"
                    style={{ backgroundColor: "#0000000d", bottom: "30%" }}
                    onClick={handleChangingName}
                  ></i>
                ) : (
                  ""
                )}
              </>
            ) : (
              <input
                id="change-name"
                className="fw-bold fs-4"
                value={name}
                onChange={handleChangName}
                onBlur={handleStopChangingName}
              ></input>
            )}
          </div>
          <div className="d-flex justify-content-center shadow-sm pb-1">
            {props.friend ? (
              <>
                <Button className="mx-2" variant="outline-primary">
                  Nh???n tin
                </Button>
                <Button className="mx-2" variant="primary">
                  G???i ??i???n
                </Button>
              </>
            ) : props.me ? (
              ""
            ) : (
              <Button className="mx-2" variant="primary">
                K???t b???n
              </Button>
            )}
          </div>
          <div className="container-fluid profile-info-list mt-2">
            {props.friend ? (
              <>
                <LineProfileInfo title="S??? b???n b??">
                  {props.target.friends.length} ng?????i
                </LineProfileInfo>
                <LineProfileInfo title="Ng??y sinh">
                  {moment(props.target.dateOfBirth).format("DD / MM / YYYY")}
                </LineProfileInfo>
                <LineProfileInfo title="Gi???i t??nh">
                  {props.target.gender == "male" ? "Nam" : "N???"}
                </LineProfileInfo>
              </>
            ) : props.me ? (
              <>
                <LineProfileInfo title="Ng??y sinh">
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={handleChangeBirth}
                  ></input>
                </LineProfileInfo>
                <LineProfileInfo title="Gi???i t??nh">
                  <label>
                    <input
                      name="gender"
                      type="radio"
                      value="male"
                      className="me-1"
                      checked={gender == "male"}
                      onChange={handleChangeGender}
                    ></input>
                    Nam
                  </label>
                  <label className="ms-3">
                    <input
                      name="gender"
                      type="radio"
                      value="female"
                      className="me-1"
                      checked={gender == "female"}
                      onChange={handleChangeGender}
                    ></input>
                    N???
                  </label>
                </LineProfileInfo>
              </>
            ) : (
              <>
                <LineProfileInfo title="Ng??y sinh">
                  {moment(props.target.dateOfBirth).format("DD / MM / YYYY")}
                </LineProfileInfo>
                <LineProfileInfo title="Gi???i t??nh">
                  {props.target.gender == "male" ? "Nam" : "N???"}
                </LineProfileInfo>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        {props.friend ? (
          <div className="d-flex border-top">
            <Button
              variant="white"
              className="profile-footer-items"
              onClick={handleRemoveFriend}
            >
              X??a b???n
            </Button>
          </div>
        ) : props.me ? (
          <div className="d-flex border-top justify-content-end">
            <Button
              variant="secondary"
              className="m-1"
              onClick={props.handleClose}
            >
              H???y
            </Button>
            <Button
              variant="primary"
              className="m-1"
              disabled={!isEditted}
              onClick={handleUpdate}
            >
              C???p nh???t
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

// const ProfileSTP = (state) => {
//   return { user: state.user };
// };
// const ProfileDTP = (dispatch) => {
//   return {
//     updateInfo: function (data) {
//       return dispatch({ type: "STORE_INFO", data });
//     },
//   };
// };

// const ProfileReduxed = connect(ProfileSTP, ProfileDTP)(Profile);

export default Profile;
