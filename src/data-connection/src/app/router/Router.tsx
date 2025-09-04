import { Navigate, Route, Routes } from 'react-router-dom';

import { Source } from '#/pages/source';
import { Sync } from '#/pages/sync';
import { Agents } from '#/pages/agents';
import { ConnectionDetails } from '#/pages/source/ui/connection-details';
import { SourceWizard } from '#/pages/source/ui/source-wizard';

import { Layout } from '../ui/layout';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={Source.route} replace />} />
        <Route path={Source.route} element={<Source.Page />} />
        <Route path={Sync.route} element={<Sync.Page />} />
        <Route path={Agents.route} element={<Agents.Page />} />
      </Route>
      <Route
        path={ConnectionDetails.route}
        element={<ConnectionDetails.Page />}
      />
      <Route path={SourceWizard.route} element={<SourceWizard.Page />} />
    </Routes>
  );
};
