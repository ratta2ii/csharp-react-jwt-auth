import React from "react";
import { observer } from "mobx-react-lite";
import { Button, Container } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";
import { useStore } from "../../app/stores/store";

const DashboardContent = (props: any) => {
  const {
    userStore: { user },
  } = useStore();

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
    <Container>
      <h3>Current User:</h3>
      <ul
        style={{
          maxWidth: "100%",
          overflowWrap: "break-word",
          lineHeight: "1.8rem",
        }}
      >
        <li>Username: {user?.userName}</li>
        <li>Display Name: {user?.displayName}</li>
        <li>Token: {user?.token}</li>
      </ul>
      <div style={{ marginTop: 75, marginBottom: 75, textAlign: "center" }}>
        <Button onClick={handleTestAuthEndpoint} color="black" size="large">
          Test Authorization Endpoint
        </Button>
      </div>
    </Container>
  );
};

export default observer(DashboardContent);
