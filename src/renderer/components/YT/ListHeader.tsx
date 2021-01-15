import React from 'react';
import CreateButton from '../ui/buttons/CreateButton';

type Props = {
  title: string;
  toggleCreate(): void;
};

export default function ListHeader({ title, toggleCreate }: Props) {
  return (
    <div className="sticky dark:bg-dark-700 px-6 py-3 z-10 header-offset shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="dark:text-white text-gray-900 text-xl font-bold">
          {title}
        </h3>

        <CreateButton onClick={toggleCreate} />
      </div>
    </div>
  );
}
