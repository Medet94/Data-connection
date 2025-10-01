import React from 'react';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // В этом примере простая оболочка — сюда можно добавить контекст темы
  return <>{children}</>;
};

export default ThemeProvider;
