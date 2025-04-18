import { JSX } from "solid-js";
import { ButtonProps, buttonSizeClasses } from "./ButtonTypes";

export function InfoButton(props: ButtonProps): JSX.Element {
  const { children, fullWidth = false, size = 'md', ...buttonProps } = props;
  
  buttonProps.class = `${buttonProps.class || ''} font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-cyan-600 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-cyan-300 focus:ring-opacity-80 ${buttonSizeClasses[size]} ${fullWidth ? 'w-full' : ''}`
  
  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
}