import React, { Fragment, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";

const HomePage = () => {
  const {
    userStore: { user },
  } = useStore();

  const [loadTimer, setLoadTimer] = useState(true);

  useEffect(() => {}, [user]);

  let backgroundImage;
  !user
    ? (backgroundImage = "blue-folder-lock.jpeg")
    : (backgroundImage = "blue-folder-unlock.jpeg");

  // Adding loader to handle possible slow image loading (inactivity causing app to sleep on PaaS)  
  if (loadTimer) {
    setTimeout(function () {
      setLoadTimer(false);
    }, 900);
    return <LoadingComponent content="Loading App..." />;
  }

  return (
    <Segment
      inverted
      textAlign="center"
      vertical
      className="masthead"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url("/assets/${backgroundImage}")`,
        backgroundSize: "cover",
      }}
    >
      <Container text style={{ marginBottom: 60 }}>
        <Header as="h1" inverted style={{ marginBottom: 25 }}>
          {!user ? "C#-React-JWT-Auth" : `Welcome ${user.userName}!`}
        </Header>
        <Fragment>
          {!user ? (
            <Button as={Link} to="/about" size="huge" inverted>
              Show me the Magic!
            </Button>
          ) : (
            <Button
              as={Link}
              to={`/dashboard/user/${user?.userName}`}
              size="huge"
              inverted
            >
              Go To Dashboard!
            </Button>
          )}
        </Fragment>
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
