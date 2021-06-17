import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Container } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { useStore } from "../../app/stores/store";

const DashboardContent = (props: any) => {
  const { userStore: { user } } = useStore();
  const handleTestAuthEndpoint = () => {
    agent.TestAuth.test().then((res) => {
      toast(`RESPONSE MESSAGE: ${res}`);
    });
  };

  return (
    <Container>
      <p style={{ fontWeight: 600, fontSize: 16 }}>Current User:</p>
      <ul style={{maxWidth: "100%", overflowWrap: "break-word"}}>
          <li>Username: {user?.userName}</li>
          <li>Display Name: {user?.displayName}</li>
          <li>Token: {user?.token}</li>
      </ul>
      <div style={{ marginTop: 50, marginBottom: 50 }}>
        <Button onClick={handleTestAuthEndpoint} size="large" >
          Test Authorization Endpoint
        </Button>
      </div>
    </Container>
  );
};

export default observer(DashboardContent);