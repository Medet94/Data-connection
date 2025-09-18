import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import {
  Stack,
  Box,
  Group,
  Text,
  Breadcrumbs,
  Anchor,
  Button,
  Container,
  ActionIcon,
  Divider,
} from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';

// Import wizard stages
import { Overview } from '../stages/overview';
import { ConnectionMethod } from '../stages/connection-method';
import { NameOrganize } from '../stages/name-organize';
import { ConfigureDetails } from '../stages/configure-details';
import { OutputLocation } from '../stages/output-location';
import { ReviewSummary } from '../stages/review-summary';

import {
  pageMounted,
  pageUnmounted,
  $currentStage,
  $sourceType,
  $connectionName,
} from '../../model';

import styles from './styles.module.css';

const route = 'new-connection/:sourceType/:stage';

const STAGE_STEPS = [
  { number: 1, label: 'Overview' },
  { number: 2, label: 'Connection type' },
  { number: 3, label: 'Name and project' },
  { number: 4, label: 'Connection details' },
  { number: 5, label: 'Output folder' },
  { number: 6, label: 'Summary' },
];

const Page = () => {
  const { sourceType, stage } = useParams<{
    sourceType: string;
    stage: string;
  }>();
  const navigate = useNavigate();
  const [mountPage, unmountPage] = useUnit([pageMounted, pageUnmounted]);
  const [currentStage, selectedSourceType, connectionName] = useUnit([
    $currentStage,
    $sourceType,
    $connectionName,
  ]);

  const currentStageNum = parseInt(stage || '1');

  useEffect(() => {
    mountPage();
    return () => unmountPage();
  }, [mountPage, unmountPage]);

  const handleBack = () => {
    if (currentStageNum === 1) {
      navigate('../new-connection');
    } else {
      navigate(`../new-connection/${sourceType}/${currentStageNum - 1}`);
    }
  };

  const handleContinue = () => {
    if (currentStageNum < 6) {
      navigate(`../new-connection/${sourceType}/${currentStageNum + 1}`);
    }
  };

  const renderCurrentStage = () => {
    switch (currentStageNum) {
      case 1:
        return <Overview />;
      case 2:
        return <ConnectionMethod />;
      case 3:
        return <NameOrganize />;
      case 4:
        return <ConfigureDetails />;
      case 5:
        return <OutputLocation />;
      case 6:
        return <ReviewSummary />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.navbar}>
        <div className={styles.navbarContent}>
          <div className={styles.logoContainer}>
            <BluePrintIcon name="database" size={22} />
          </div>

          <div className={styles.breadcrumbContainer}>
            <Breadcrumbs separator=">" className={styles.breadcrumbs}>
              <Anchor className={styles.breadcrumbItem}>Data Connection</Anchor>
              <Anchor
                className={styles.breadcrumbItem}
                onClick={() => navigate('/new-connection')}
              >
                New Connection
              </Anchor>
              <Text className={styles.breadcrumbItem}>{sourceType}</Text>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.wizardLayout}>
          <div className={styles.leftSidebar}>
            <div className={styles.sidebarHeader}>
              <Group justify="space-between" align="center" mb="md">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={handleBack}
                  className={styles.backButton}
                >
                  <BluePrintIcon name="arrow-left" size={16} title="Back" />
                </ActionIcon>
              </Group>
              <Divider mb="lg" />
              <Box mb="lg">
                <Text size="lg" fw={600} className={styles.sourceName}>
                  {connectionName || 'Untitled'}
                </Text>
                <Text size="sm" c="dimmed">
                  {selectedSourceType || 'Source'}
                </Text>
              </Box>

              <Divider mb="lg" />
            </div>

            <div className={styles.stepsList}>
              {STAGE_STEPS.map((step) => (
                <div
                  key={step.number}
                  className={`${styles.stepItem} ${step.number === currentStageNum ? styles.active : ''}`}
                >
                  <div className={styles.stepNumber}>{step.number}</div>
                  <Text className={styles.stepLabel}>{step.label}</Text>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.rightPanel}>
            <Container size="lg" className={styles.wizardContent}>
              {renderCurrentStage()}
            </Container>

            <div className={styles.bottomPanel}>
              <Container size="lg">
                <Group justify="space-between" align="start">
                  <Group>
                    {currentStageNum > 1 && (
                      <Button variant="subtle" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                  </Group>

                  <Group>
                    {currentStageNum < 6 ? (
                      <Button
                        onClick={handleContinue}
                        rightSection={
                          <BluePrintIcon name="arrow-right" size={16} />
                        }
                      >
                        Next
                      </Button>
                    ) : (
                      <Button onClick={handleContinue}>Finish</Button>
                    )}
                  </Group>
                </Group>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SourceWizard = {
  route,
  Page,
};
