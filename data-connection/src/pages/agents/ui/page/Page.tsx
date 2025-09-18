import {useEffect} from "react";
import {useUnit} from "effector-react";
import {Container, Stack, Title, Text, Card} from "@mantine/core";

import {pageMounted, pageUnmounted} from "../../model";

const route = "agents";

const Page = () => {
  const [mountPage, unmountPage] = useUnit([pageMounted, pageUnmounted]);

  useEffect(() => {
    mountPage();

    return () => unmountPage();
  }, []);

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Card withBorder radius="sm" p="xl">
          <Stack gap="md">
            <Title order={2}>Connection Agents</Title>
            <Text c="dimmed">
              Manage connection agents and workers that handle data transfer and processing.
              Configure agent settings, monitor performance, and manage agent deployments.
            </Text>
            <Text c="dimmed" fs="italic">
              This page is under development. Agent management features will be added here.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export const Agents = {
    route,
    Page,
};