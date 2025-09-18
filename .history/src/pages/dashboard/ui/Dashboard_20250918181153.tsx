import { useUnit } from 'effector-react';
import {
  $projects,
  fetchProjectsFx,
  ProjectCard,
} from '../../../entities/project';
import { useEffect } from 'react';
import { SimpleGrid } from '@mantine/core';

export const Dashboard = () => {
  const projects = useUnit($projects);

  useEffect(() => {
    fetchProjectsFx();
  }, []);

  return (
    <SimpleGrid cols={3}>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </SimpleGrid>
  );
};
