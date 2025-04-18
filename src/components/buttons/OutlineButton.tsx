import { JSX } from "solid-js";
import { ButtonProps, buttonSizeClasses } from "./ButtonTypes";

export function OutlineButton(props: ButtonProps): JSX.Element {
  const { children, fullWidth = false, size = 'md', ...buttonProps } = props;
  
  buttonProps.class = `${buttonProps.class || ''} font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform bg-transparent border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${buttonSizeClasses[size]} ${fullWidth ? 'w-full' : ''}`
  
  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}