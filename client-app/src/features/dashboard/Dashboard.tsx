import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "semantic-ui-react";
import MacWindow from "./MacWindow";

const Dashboard = (props: any) => {

  return (
    <Container
      style={{
        fontSize: 14,
        fontFamily: "monospace",
        maxWidth: "80%",
        marginTop: 130,
      }}
    >
    <MacWindow />
    </Container>
  );
};

export default observer(Dashboard);
