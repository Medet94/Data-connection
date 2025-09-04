import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, Group, Button, Text } from '@mantine/core';
import { BluePrintIcon } from '@shared/ui/icons';
import { Source } from '#/pages/source';
import { Sync } from '#/pages/sync';
import { Agents } from '#/pages/agents';
import styles from './styles.module.css';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.endsWith(`/${Sync.route}`) || path === `/${Sync.route}`)
      return Sync.route;
    if (path.endsWith(`/${Agents.route}`) || path === `/${Agents.route}`)
      return Agents.route;
    if (path.endsWith(`/${Source.route}`) || path === `/${Source.route}`)
      return Source.route;
    return Source.route; // default to Source
  };

  const handleTabChange = (value: string | null) => {
    if (value) {
      navigate(value);
    }
  };

  const handleNewSource = () => {
    navigate('../new-connection');
  };

  return (
    <div className={styles.layout}>
      {/* Header with branding and navigation */}
      <div className={styles.header}>
        <Group justify="space-between" h={60}>
          <Group gap="sm">
            <div className={styles.logoContainer}>
              <BluePrintIcon name="database" size={22} color="#1C2127" />
            </div>
            <Text className={styles.pageTitle}>Data connection</Text>
            <Tabs
              value={getCurrentTab()}
              onChange={handleTabChange}
              classNames={{
                root: styles.tabsRoot,
                list: styles.tabsList,
                tab: styles.tab,
              }}
            >
              <Tabs.List>
                <Tabs.Tab value={Source.route}>Source</Tabs.Tab>
                <Tabs.Tab value={Sync.route}>Sync</Tabs.Tab>
                <Tabs.Tab value={Agents.route}>Agents</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>

          <Button
            leftSection={<BluePrintIcon name="plus" size={16} />}
            className={styles.newSourceButton}
            onClick={handleNewSource}
          >
            New source
          </Button>
        </Group>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
