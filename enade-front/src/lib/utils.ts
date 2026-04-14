import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
