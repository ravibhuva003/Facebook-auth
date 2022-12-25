import React, { useState } from "react";   //React hook
import FacebookLogin from "react-facebook-login";   //import facebook API from facebook
import "./App.css";   

function FacebookLoginComponent() {   //when user come on page and not click on login
  const [login, setLogin] = useState(false);    //initial states
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);   //print response on console
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");   //alert message
      setLogin(false);
      return false;
    }
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {    //check for matching token
      setLogin(true);     //token match
    } else {
      setLogin(false);     //token not match
    }
  };

    //For Logout
  const logout = () => {     
    setLogin(false);     //all changes after logout
    setData({});
    setPicture("");
  };

  return (
    <div className="container" style={{display: "flex",justifyCintent:"center",alignItem:"center",marginTop:"90px"}}>
      {!login && (
        <FacebookLogin
          appId="1543100706206670"        // Secret App ID
          autoLoad={true}
          fields="name,email,picture"    //Fetch details from Facebook API
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}
 
           
      {login && ( // if successful login
        <div className="card" style={{display: "flex",alignItem:"center",marginTop:"30px"}}>
          <div className="card-body">
            <h1>Facebook Authentication</h1> 
          <h2>You are signed in</h2>
            <img className="rounded" src={picture} alt="Profile" width="180" height="180" />
            <p className="card-title">Welcome to your profile: {data.name} </p>
            <p className="card-text">Email ID: {data.email}</p>
            <button className="logout" onClick={logout}>
              Logout               
            </button> 
          </div>
        </div>
      )}
    </div>
  );
}

export default FacebookLoginComponent;