import { JSX } from "solid-js";

export interface CheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element {
  const id = props.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  const { label, ...inputProps } = props;

  return (
    <label class="flex items-center">
      <input
        {...inputProps}
        id={id}
        type="checkbox"
        class={`form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${props.class || ""}`}
      />
      {label && <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
}