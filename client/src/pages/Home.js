import React, { useState } from "react";
import AuthModal from "../components/AuthModal";
import Nav from "../components/Nav";
import { useCookies } from "react-cookie";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(null);

  const authToken = cookie.AuthToken;

  const handleClick = () => {
    if (authToken) {
      removeCookie("UserId", cookie.UserId);
      removeCookie("AuthToken", cookie.AuthToken);
      window.location.reload();
      return;
    }
    setShowModal(true);
    setIsSignUp(true);
  };
  return (
    <div className="overlay">
      <Nav
        authToken={authToken}
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Swipe Right®</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Signout" : "Create Account"}
        </button>
      </div>

      {showModal && (
        <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
      )}
    </div>
  );
};

export default Home;
