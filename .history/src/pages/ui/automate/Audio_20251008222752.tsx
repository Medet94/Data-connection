import { FunctionComponent } from 'react';
import { useUnit } from 'effector-react';
import { Button } from '@mantine/core';

import { audioRequest } from '../../../shared/state/events';
import { $audios, $load } from '../../../shared/state/stores';

export const Audio: FunctionComponent = () => {
  const [audios, loading] = useUnit([$audios, $load]);

  console.log(audios);

  return (
    <div>
      <Button onClick={() => audioRequest()}>Load</Button>
    </div>
  );
};
