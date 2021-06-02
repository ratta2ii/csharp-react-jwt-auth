import React from "react";
import { observer } from "mobx-react-lite";
import { Container, Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

const ModalContainer = () => {
  const { modalStore } = useStore();

  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      style={{width: 450, padding: 50, backgroundColor: "#d2d2d2"}}
      // size="mini"
    >
      <Modal.Content>
        <Container style={{  }}>
          {modalStore.modal.body}
        </Container>
      </Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
