import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";

const App = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []);

  return (
    <Container>
      <Header as='h2' icon='users' content='Activities' />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </Container>
  );
};

export default App;
