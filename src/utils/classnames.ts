import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const twclsx: typeof clsx = (...args) => twMerge(clsx(args));
