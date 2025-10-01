import React from 'react';
import { Modal, TextInput, Textarea, Button, Group } from '@mantine/core';
import { useUnit } from 'effector-react';
import {
  $name,
  $description,
  setName,
  setDescription,
  submitCreate,
  $isSubmitting,
} from '../model';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CreateAutomationModal: React.FC<Props> = ({ open, onClose }) => {
  const name = useUnit($name);
  const description = useUnit($description);
  const isSubmitting = useUnit($isSubmitting);

  const handleSubmit = () => {
    submitCreate();
    onClose();
  };

  return (
    <Modal opened={open} onClose={onClose} title="Create automation">
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        mt="md"
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={isSubmitting}>
          Create
        </Button>
      </Group>
    </Modal>
  );
};

export default CreateAutomationModal;
