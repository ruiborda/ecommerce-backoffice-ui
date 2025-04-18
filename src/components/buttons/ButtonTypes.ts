import { JSX } from "solid-js";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const buttonSizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-6 py-2',
  lg: 'px-8 py-3 text-lg'
};