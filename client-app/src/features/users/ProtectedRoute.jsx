// ! Component is a good model, however, it does fit my situation
// import { Redirect } from "react-router-dom";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import LoginForm from "./LoginForm";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    userStore: { isLoggedIn },
    modalStore: { openModal },
  } = useStore();

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          openModal(<LoginForm />);
            return (
              <Redirect
                to={{
                  pathname: "/about",
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
        }
      }}
    />
  );
};

export default observer(ProtectedRoute);
