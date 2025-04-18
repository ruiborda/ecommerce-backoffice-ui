import { JSX } from "solid-js";
import { ButtonProps, buttonSizeClasses } from "./ButtonTypes";

export function WarningButton(props: ButtonProps): JSX.Element {
  const { children, fullWidth = false, size = 'md', ...buttonProps } = props;
  
  buttonProps.class = `${buttonProps.class || ''} cursor-pointer font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-yellow-600 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-80 ${buttonSizeClasses[size]} ${fullWidth ? 'w-full' : ''}`
  
  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}