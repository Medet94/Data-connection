import { Card, Text } from '@mantine/core';
import type { Project } from '../model/project';

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <Card withBorder shadow="sm" p="md" radius="md">
      <Text fw={500}>{project.name}</Text>
      {project.description && (
        <Text size="sm" c="dimmed">
          {project.description}
        </Text>
      )}
    </Card>
  );
};
