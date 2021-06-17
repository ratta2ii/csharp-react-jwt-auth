import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Container } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

const About = (props: any) => {
  const handleTestAuthEndpoint = () => {
    agent.TestAuth.test().then((res) => {
      toast.success(`Response: ${res}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  return (
    <Container
      style={{
        fontSize: 14,
        fontFamily: "monospace",
        width: "80%",
        marginTop: 130,
      }}
    >
      <h1 style={{ fontWeight: 600, fontSize: 30 }}>
        Auth Services with JWT's
      </h1>
      <h2
        style={{
          fontWeight: 600,
          fontSize: 18,
          marginTop: -10,
        }}
      >
        C#/.NET5.0 | TypeScript/React
      </h2>
      <p style={{ fontWeight: 600 }}>Description:</p>
      <p>
        The purpose of this application is to demonstrate a working knowledge of
        authentication, authorization in the context of Json Web Tokens (JWT's),
        as well as how to make an application more secure through the
        implementation of security headers. In addition to the Auth services,
        the project also demonstrates an understanding on how to build a
        full-stack application, as well as how to deploy the app to a production
        environment.
      </p>
      <p style={{ fontWeight: 600 }}>Details:</p>
      <ul style={{ lineHeight: "1.5rem" }}>
        <li>
          C#/.NET5.0 back-end API, with a TypeScript/React client front-end
        </li>
        <li>Containerized database using docker and Postgres</li>
        <li>
          The React client is hosted side-by-side to the back-end API on Heroku
          (PaaS)
        </li>
        <li>
          The back-end API is serving the React build files from a wwwroot
          folder (triggered by a post-build event)
        </li>
      </ul>
      <div style={{ marginTop: 25 }}>
        <Button onClick={handleTestAuthEndpoint} size="large">
          Test Authorization Endpoint
        </Button>
      </div>
    </Container>
  );
};

export default observer(About);
