import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import MacWindow from "./MacWindow";

const Dashboard = (props: any) => {
  return (
    <Container
      style={{
        maxWidth: "80%",
        height: "94vh",
        marginTop: "-5vh",
        display: "flex",
        alignItems: "center",
        lineHeight: "1.6rem",
        fontSize: 16,
        fontFamily: "monospace",
      }}
    >
      <MacWindow />
    </Container>
  );
};

export default observer(Dashboard);
