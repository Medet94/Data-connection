import React from "react";
import { Card, Stack, Text, Group } from "@mantine/core";
import { BluePrintIcon } from "@shared/ui/icons";
import styles from "./styles.module.css";

export interface ConnectionCardProps {
  iconName: string;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  iconName,
  title,
  description,
  onClick,
  disabled = false,
}) => {
  return (
    <Card
      className={`${styles.connectionCard} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : onClick}
      withBorder
    >
      <Stack gap={10} align="center" justify="space-between" h="100%">
        <div className={styles.iconContainer}>
          <BluePrintIcon name={iconName} size={50} />
        </div>
        <Stack gap={5} align="center">
          <Text className={styles.cardTitle}>
            {title}
          </Text>
          <Text className={styles.cardDescription}>
            {description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};

export interface ConnectionCardsProps {
  onExternalConnection: () => void;
  onFileUpload: () => void;
  onDataGeneration: () => void;
}

export const ConnectionCards: React.FC<ConnectionCardsProps> = ({
  onExternalConnection,
  onFileUpload,
  onDataGeneration,
}) => {
  return (
    <Group gap={20} align="stretch" w="100%">
      <ConnectionCard
        iconName="data-lineage"
        title="Connect to external system"
        description="Configure a live connection from Phoenix to your production system."
        onClick={onExternalConnection}
      />
      <ConnectionCard
        iconName="cloud-upload"
        title="Upload static data"
        description="Manual upload a one-off extract from your production system."
        onClick={onFileUpload}
      />
      <ConnectionCard
        iconName="clean"
        title="Input or generate data"
        description="Synthesize a small quantity of data so you can start pipelining and building workflows."
        onClick={onDataGeneration}
        disabled={true}
      />
    </Group>
  );
};