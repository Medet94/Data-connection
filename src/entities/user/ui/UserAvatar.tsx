import { Avatar } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $user } from '../model/user';

export const UserAvatar = () => {
  const user = useUnit($user);

  if (!user) return <Avatar radius="xl" />;

  return <Avatar src={user.avatarUrl} alt={user.name} radius="xl" />;
};
