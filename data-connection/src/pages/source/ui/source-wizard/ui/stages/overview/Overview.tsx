import React from 'react';
import { Stack, Title, Text, Box, Flex, Card, Divider } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import dataCloud from '#/shared/assets/data-cloud.svg';
import styles from './styles.module.css';

interface OverviewProps {
  onContinue?: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ onContinue }) => {
  return (
    <div className={styles.overviewLayout}>
      <Stack gap={24}>
        <Title className={styles.header} order={2}>
          Overview
        </Title>

        <Card withBorder radius="md" className={styles.formCard}>
          <div className={styles.iconContainer}>
            <BluePrintIcon name="database" size={48} />
          </div>

          <Text className={styles.title}>Creating a New Source</Text>

          <Text className={styles.subtitle} c="dimmed">
            A Source is any data system that you connect to Phoenix. Source
            systems may support a variety of capabilities including imports,
            streaming.
          </Text>
        </Card>

        <Card>
          <Title order={2} className={styles.sectionTitle}>
            What we're going to do
          </Title>
          <Divider />

          <div className={styles.mainContent}>
            <div className={styles.contentWrapper}>
              <Box className={styles.processSection}>
                <Flex
                  className={styles.flowIllustration}
                  justify="center"
                  align="center"
                  gap="lg"
                >
                  <div>
                    <img src={dataCloud} width={64} height={64} />
                  </div>
                  <div className={styles.flowArrow}>
                    <div className={styles.dottedLine}></div>
                  </div>

                  <div>
                    <img src={dataCloud} width={64} height={64} />
                  </div>
                </Flex>

                <Text className={styles.processDescription}>
                  In this wizard, you will set up your Source via the following
                  steps:
                </Text>

                <div className={styles.stepsList2}>
                  <Text className={styles.stepText}>
                    1. Set up your source metadata
                  </Text>
                  <Text className={styles.stepText}>
                    2. Connect to Source using your credentials
                  </Text>
                  <Text className={styles.stepText}>
                    3. Confirm your Source is connected and ready to use
                  </Text>
                </div>

                <Text size="sm" c="dimmed">
                  Note: connecting a Source does not automatically download your
                  data to Phoenix. Data must be imported before it is used. A
                  Sync is how you import data to Phoenix. After you are done
                  configuring your Source in this setup process, you have the
                  option to continue by configuring a Sync.
                </Text>
              </Box>
            </div>
          </div>
        </Card>
      </Stack>
    </div>
  );
};
