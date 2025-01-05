import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tagsFromString(tag: string) {
  return tag.split(',').map((tag) => tag.trim());
}

export function capitalizeFirstLetter(string: string[]) {
  return string.map((str) => str.charAt(0).toUpperCase() + str.slice(1));
}

export function formatDate(date: Date) {
  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
