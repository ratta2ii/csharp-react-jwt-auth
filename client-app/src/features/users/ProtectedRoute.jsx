// ! Component is a good model, however, it does fit my situation
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useStore } from "../../app/stores/store";


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userStore } = useStore();
  const { isLoggedIn } = userStore;

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
  }, [isLoggedIn])
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
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