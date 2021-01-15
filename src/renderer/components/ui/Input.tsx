import React from 'react';
import clsx from 'clsx';
import { forwardRef } from 'react';

export type Props = {
  label?: string;
  fullWidth?: boolean;
  slim?: boolean;
  icon?: keyof typeof INPUT_ICONS;
  iconClick?(): void;
} & React.ComponentProps<'input'>;

export default forwardRef<HTMLInputElement, Props>(
  ({ label, className, fullWidth, slim, iconClick, ...props }, ref) => {
    // @ts-ignore: this will work I promise
    const errors = props.errors && props.name && props.errors[props.name];
    const icon = props.icon ? INPUT_ICONS[props.icon] : null;

    // console.log(errors);

    return (
      <label
        className={clsx(
          className,
          fullWidth && 'flex-1',
          'block text-sm font-medium leading-5 text-gray-700 dark:text-dark-200'
        )}
      >
        {label}
        <div className={clsx('relative', label && 'mt-1')}>
          {icon && (
            <div
              className={clsx(
                !iconClick ? 'pointer-events-none' : 'cursor-pointer',
                'absolute inset-y-0 left-0 pl-3 flex items-center'
              )}
              onClick={iconClick}
            >
              {icon}
            </div>
          )}
          <input
            className={clsx(
              slim ? 'py-1' : 'py-2',
              errors &&
                !props.disabled &&
                'border border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-300 focus:shadow-outline-red',
              !errors &&
                'border border-gray-300 dark:border-dark-400 placeholder-gray-400 dark:placeholder-dark-300 focus:outline-none focus:shadow-outline-blue focus:ring-blue-300 focus:border-blue-300',
              'appearance-none block w-full px-3 rounded-md transition duration-150 ease-in-out text-sm leading-5',
              props.disabled
                ? 'bg-gray-100 dark:bg-dark-500'
                : 'bg-white dark:bg-dark-400',
              icon && 'pl-10'
            )}
            ref={ref}
            type={props.type ?? 'text'}
            {...props}
          />
        </div>
        {errors && !props.disabled && (
          <p className="mt-2 text-sm text-red-600">* {errors.message}</p>
        )}
      </label>
    );
  }
);

export const INPUT_ICONS = {
  password: (
    <svg
      className="h-5 w-5 text-gray-400 dark:text-dark-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  ),

  passwordVisible: (
    <svg
      className="h-5 w-5 text-gray-400 dark:text-dark-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    </svg>
  ),
  user: (
    <svg
      className="h-5 w-5 text-gray-400 dark:text-dark-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),

  atMention: (
    <svg
      className="h-5 w-5 text-gray-400 dark:text-dark-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  ),

  search: (
    <svg
      className="h-5 w-5 text-gray-400 dark:text-dark-200"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
};
