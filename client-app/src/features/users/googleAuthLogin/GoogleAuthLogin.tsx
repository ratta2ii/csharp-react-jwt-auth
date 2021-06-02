import React from "react";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import "./GoogleAuthLoginStyles.css";
import { useStore } from "../../../app/stores/store";

const GoogleAuthLogin = () => {
  const { userStore: { googleLogin } } = useStore();

  const responseGoogle = async (authResult: any) => {
    const code = authResult["code"];
    try {
      if (code) {
          googleLogin({code: code}).catch((error) =>
          console.log(error)
      );
      } else {
        throw new Error(authResult);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
        responseType="code"
        /**
         * To get access_token and refresh_token in server side, the data for redirect_uri
         * should be postmessage, to get credentials without redirect uri.
         */
        redirectUri="postmessage"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            style={{ backgroundColor: "cornflowerblue" }}
          >
            Login with Google Account
          </GoogleButton>
        )}
      />
    </div>
  );
};

export default GoogleAuthLogin;