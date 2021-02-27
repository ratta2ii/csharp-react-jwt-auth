import React, { useState } from "react";
import { ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

export const ActivityForm = ({
  // copies activity to var name selectedActivity (for this scope only)
  activity: selectedActivity,
  closeForm,
  createOrEdit,
}: Props) => {
  // If activity/selectedActivity is null then it will assign to the right of operand ??
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    date: "",
    description: "",
    category: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEdit(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          onChange={(e) => handleInputChange(e)}
          placeholder="Title"
          value={activity.title}
          name="title"
        />
        <Form.TextArea
          onChange={(e) => handleInputChange(e)}
          placeholder="Description"
          value={activity.description}
          name="description"
        />
        <Form.Input
          onChange={(e) => handleInputChange(e)}
          placeholder="Category"
          value={activity.category}
          name="category"
        />
        <Form.Input
          onChange={(e) => handleInputChange(e)}
          placeholder="Date"
          value={activity.date}
          name="date"
        />
        <Form.Input
          onChange={(e) => handleInputChange(e)}
          placeholder="City"
          value={activity.city}
          name="city"
        />
        <Form.Input
          onChange={(e) => handleInputChange(e)}
          placeholder="Venue"
          value={activity.venue}
          name="venue"
        />
        <Button
          onClick={handleSubmit}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button onClick={closeForm} floated="right" content="Cancel" />
      </Form>
    </Segment>
  );
};
