import React, { Fragment, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestErrors";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  const { getUser } = userStore;
  const { token, appLoaded, setAppLoaded } = commonStore;

  useEffect(() => {
      if (token) {
          getUser().finally(() => setAppLoaded());
      } else {
          setAppLoaded();
      }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded) return <LoadingComponent content="Loading App..." />

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
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
                <Route path="/login" component={LoginForm} />
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
