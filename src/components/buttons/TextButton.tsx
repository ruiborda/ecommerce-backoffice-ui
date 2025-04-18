import { JSX } from "solid-js";
import { ButtonProps, buttonSizeClasses } from "./ButtonTypes";

export function TextButton(props: ButtonProps): JSX.Element {
  const { children, fullWidth = false, size = 'md', ...buttonProps } = props;
  
  buttonProps.class = `${buttonProps.class || ''} cursor-pointer font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform hover:text-blue-500 focus:outline-none ${buttonSizeClasses[size]} ${fullWidth ? 'w-full' : ''}`
  
  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}