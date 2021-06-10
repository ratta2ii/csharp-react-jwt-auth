import React, { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import Dashboard from "../../features/dashboard/Dashboard";
import About from "../../features/about/About";
import ProtectedRoute from "../../features/users/ProtectedRoute";

function App() {
  const { commonStore, userStore } = useStore();
  const { getUser } = userStore;
  const { token, appLoaded, setAppLoaded } = commonStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content="Loading App..." />;

  return (
    <Fragment>
      {/* Pass in both ModalContainer and ToastContainer in high level components */}
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route path="/about" component={About} />
                <ProtectedRoute
                  exact
                  path="/dashboard/user/:userName"
                  component={Dashboard}
                />
                <Route path="/errors" component={TestErrors} />
                <Route path="/server-error" component={ServerError} />
                {/* This works with "Switch" that only allows a single com to render at a time */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
