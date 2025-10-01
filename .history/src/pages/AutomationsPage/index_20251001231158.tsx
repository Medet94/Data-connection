import React, { useEffect, useState } from 'react';
import { Container, Grid, Button } from '@mantine/core';
import AutomationsView from './ui/AutomationsView';
import CreateAutomationModal from '../../features/automation-create/ui/CreateAutomationModal';

const AutomationsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  return (
    <Container size="lg" style={{ paddingTop: 24 }}>
      <Grid>
        <Grid.Col span={8}>
          <Button onClick={() => setOpen(true)} mb="md">
            New automation
          </Button>
          <AutomationsView refreshTrigger={refresh} />
        </Grid.Col>
        <Grid.Col span={4}>
          {/* Filters panel */}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <div style={{ position: 'sticky', top: 20 }}>
            <CreateAutomationModal
              open={open}
              onClose={() => {
                setOpen(false);
                setRefresh((r) => r + 1);
              }}
            />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AutomationsPage;
