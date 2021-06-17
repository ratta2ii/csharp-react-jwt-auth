import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Container } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

const About = (props: any) => {
  const handleTestAuthEndpoint = () => {
    agent.TestAuth.test().then((res) => {
      toast.success(`${res}`, {
        position: "bottom-right",
        autoClose: 5000,
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
        fontSize: 16,
        fontFamily: "monospace",
        width: "80%",
        marginTop: 130,
      }}
    >
      <h1 style={{ fontWeight: 600, fontSize: 35 }}>
        Auth Services with JWT's
      </h1>
      <h2
        style={{
          fontWeight: 600,
          fontSize: 16,
          marginTop: 10,
        }}
      >
        C# | .NET5.0 | TypeScript | React
      </h2>
      <a href="https://securityheaders.com/">
        <img
          src="/assets/screenshots/ss-security-rating.png"
          alt="security rating"
          style={{
            marginBottom: 20,
            marginTop: 10,
            width: "100%",
            boxShadow:
              "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          }}
        />
      </a>
      <h3>Description:</h3>
      <p>
        The purpose of this application is to demonstrate a working knowledge of
        authentication, authorization in the context of Json Web Tokens (JWT's),
        as well as how to make an application more secure through the
        implementation of security headers. In addition to the Auth services,
        the project also demonstrates an understanding on how to build a
        full-stack application, and how to deploy it to a production
        environment.
      </p>
      <h3>Details:</h3>
      <ul style={{ lineHeight: "1.6rem" }}>
        <li>
          C#/.NET5.0 back-end API, with a TypeScript/React front-end client
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
      <div style={{ margin: "40px 0 50px" }}>
        <Button onClick={handleTestAuthEndpoint} color="black" size="large">
          Test Authorization Endpoint
        </Button>
      </div>
    </Container>
  );
};

export default observer(About);
