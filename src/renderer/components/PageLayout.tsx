import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageLayout({ children, className }: Props) {
  return (
    <div className={clsx(className, 'dark:bg-dark-900 h-screen')}>
      {children}
    </div>
  );
}
