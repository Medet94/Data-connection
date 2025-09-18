import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core';

export const LoginForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Login submit:', values);
    // TODO: вызвать effector-эффект для логина
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps('password')}
        />
        <Button type="submit">Login</Button>
      </Stack>
    </form>
  );
};
