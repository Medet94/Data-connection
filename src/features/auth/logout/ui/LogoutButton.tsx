import { Button } from '@mantine/core';

export const LogoutButton = () => {
  const handleLogout = () => {
    console.log('User logged out');
    // TODO: очистить effector store + редирект
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
