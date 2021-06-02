import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const HomePage = () => {
  const {
    userStore: { user },
  } = useStore();

  useEffect(() => {}, [user]);

  let backgroundImage;
  !user
    ? (backgroundImage = "blue-folder-lock.jpeg")
    : (backgroundImage = "blue-folder-unlock.jpeg");

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
          {!user ? "ASP.NET w/ React Auth" : `Welcome ${user.userName}!`}
        </Header>
        <Fragment>
          {!user ? (
            <Button as={Link} to="/about" size="huge" inverted>
              Show me the Magic!
            </Button>
          ) : (
            <Button as={Link} to="/dashboard" size="huge" inverted>
              Go To Dashboard!
            </Button>
          )}
        </Fragment>
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
