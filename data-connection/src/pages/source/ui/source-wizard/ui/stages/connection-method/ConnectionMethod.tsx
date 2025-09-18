import React, { useState } from 'react';
import { useUnit } from 'effector-react';
import {
  Stack,
  Title,
  Text,
  Button,
  Card,
  Group,
  List,
  Box,
  Alert,
  Divider,
} from '@mantine/core';

import { BluePrintIcon } from '@shared/ui/icons';

import { connectionMethodSelected, $connectionMethod } from '../../../model';

import styles from './styles.module.css';

import agentConnectionIcon from '#/shared/assets/agentConnection.png';
import internetIcon from '#/shared/assets/internet.png';
import automaticlyIcon from '#/shared/assets/automaticly.png';
import cannotConnect from '#/shared/assets/cannot-connect.png';
import infoIcon from '#/shared/assets/info.png';
import copy from '#/shared/assets/copy.png';

interface ConnectionMethodProps {
  onContinue?: () => void;
}

export const ConnectionMethod: React.FC<ConnectionMethodProps> = ({
  onContinue,
}) => {
  const [selectedMethod] = useUnit([connectionMethodSelected]);
  const [connectionMethod] = useUnit([$connectionMethod]);
  const [localSelection, setLocalSelection] = useState<
    'direct' | 'agent' | null
  >(connectionMethod);

  const handleMethodSelect = (method: 'direct' | 'agent') => {
    setLocalSelection(method);
    selectedMethod(method);
  };

  return (
    <div className={styles.stageContainer}>
      <Stack gap={24}>
        <div className={styles.header}>
          <Title order={2} className={styles.title}>
            Connect to your data source
          </Title>
        </div>

        <div className={styles.methodOptions}>
          <Card
            withBorder
            radius="md"
            className={`${styles.methodCard} ${localSelection === 'direct' ? styles.selected : ''}`}
          >
            <Stack gap={16}>
              <div className={styles.methodIcon}>
                <BluePrintIcon name="data-lineage" size={24} />
              </div>
              <Group justify="space-between" align="flex-start">
                <Group>
                  <div>
                    <Title order={4} size="md">
                      Direct Connection
                    </Title>
                    <Text size="sm" c="dimmed">
                      Connect directly over the internet
                    </Text>
                  </div>
                </Group>
              </Group>

              <Box className={styles.methodDetails}>
                <List spacing="xs" size="sm" className={styles.benefitsList}>
                  <List.Item
                    icon={
                      <img
                        src={internetIcon}
                        alt="Internet"
                        width={24}
                        height={24}
                      />
                    }
                  >
                    Preferred when connecting to sources on public networks.
                  </List.Item>
                  <Divider my="xs" />
                  <List.Item
                    icon={<img src={cannotConnect} width={34} height={34} />}
                  >
                    Cannot connect to private networks or on-premises data
                    source.
                  </List.Item>
                  <Divider my="xs" />
                  <List.Item
                    icon={<img src={automaticlyIcon} width={24} height={24} />}
                  >
                    Automatically managed.
                  </List.Item>
                  <Divider my="xs" />
                  <List.Item
                    icon={<img src={infoIcon} width={24} height={24} />}
                  >
                    Direct connections live in Phoenix and synchronyzes data
                    between your systems and Phoenix.
                  </List.Item>
                  <Divider my="xs" />
                </List>

                <Alert
                  variant="light"
                  color="blue"
                  mt="sm"
                  className={styles.methodNote}
                >
                  <Text size="md">Requierments</Text>
                  <Text size="sm">
                    <li>
                      An allow listed source. You may need to contact Palantir
                      to add your source to the allow list
                    </li>
                    <li>
                      An egress policy. If you do not have the egress policy you
                      need, create one in the next step
                    </li>
                  </Text>
                </Alert>
              </Box>

              {/* Select Button */}
              <Button
                variant={localSelection === 'direct' ? 'filled' : 'outline'}
                onClick={() => handleMethodSelect('direct')}
                fullWidth
                className={styles.selectButton}
              >
                {localSelection === 'direct' ? 'Selected' : 'Select'}
              </Button>
            </Stack>
          </Card>

          {/* Agent-based Connection Option */}
          <Card
            withBorder
            radius="md"
            className={`${styles.methodCard} ${styles.disabled} ${localSelection === 'agent' ? styles.selected : ''}`}
          >
            <Stack gap={16}>
              <div className={styles.methodIcon}>
                <img src={agentConnectionIcon} width={24} height={24} />
              </div>
              <Group justify="space-between" align="flex-start">
                <Group>
                  <div>
                    <Title order={4} size="md">
                      Through an Agent
                    </Title>
                    <Text size="sm" c="dimmed">
                      Connect through an Agent
                    </Text>
                  </div>
                </Group>
              </Group>

              <Box className={styles.methodDetails}>
                <List spacing="xs" size="sm" className={styles.benefitsList}>
                  <List.Item
                    icon={
                      <img
                        src={internetIcon}
                        alt="Internet"
                        width={14}
                        height={14}
                      />
                    }
                  >
                    Can connect to a source on a public network
                  </List.Item>
                  <Divider my="xs" />
                  <List.Item
                    icon={<img src={cannotConnect} width={20} height={20} />}
                  >
                    Can connect to private networks or on-premises data sources
                  </List.Item>
                  <Divider my="xs" />
                  <List.Item icon={<img src={copy} width={20} height={20} />}>
                    Requires manual upgrades or maintenance
                  </List.Item>
                  <Divider my="xs" />
                  <List.Item
                    icon={<img src={infoIcon} width={14} height={14} />}
                  >
                    An Agent connector is an application that lives on your
                    systems and synchronizes data between your systems and
                    Phoenix.
                  </List.Item>
                  <Divider my="xs" />
                </List>

                <Alert
                  variant="light"
                  color="orange"
                  mt="sm"
                  className={styles.methodNote}
                >
                  <Text size="md" c="dark">
                    Requierments
                  </Text>
                  <Text size="sm">
                    <li>
                      An Agent installed on a host that can reach your data
                      source and Phoenix
                    </li>
                    <li>You currently have 0 agents</li>
                    <li>
                      If you don't have the agent you need, we will create one
                      in the next step
                    </li>
                  </Text>
                </Alert>
              </Box>

              {/* Select Button */}
              <Button
                variant={localSelection === 'agent' ? 'filled' : 'outline'}
                onClick={() => handleMethodSelect('agent')}
                fullWidth
                className={styles.selectButton}
                disabled
              >
                {localSelection === 'agent' ? 'Selected' : 'Select'}
              </Button>
            </Stack>
          </Card>
        </div>
      </Stack>
    </div>
  );
};
