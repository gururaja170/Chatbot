import React, { useEffect } from "react";

const Profile = ({ user, handleKycStatus, onRender }) => {
  useEffect(() => {
    onRender(
      "profile",
      user ? (user.kycStatus ? "kyc-done" : "kyc-pending") : "profile"
    );
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
  return (
    <div className="mt-4">
      <h2>User Name : {user.name}</h2>
      <br />
      <h2>KYC Status : {user.kycStatus ? "Verified" : "Not Verified"}</h2>
      <br />
      {!user.kycStatus ? (
        <button className="btn btn-primary btn-sm" onClick={handleKycStatus}>
          Verify Kyc
        </button>
      ) : null}
    </div>
  );
};

export default Profile;
