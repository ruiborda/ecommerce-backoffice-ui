import { JSX } from "solid-js";

export interface DisabledInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

export function DisabledInput(props: DisabledInputProps): JSX.Element {
  const id = props.id || `disabled-input-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      {props.label && (
        <label for={id} class="block text-sm text-gray-500 dark:text-gray-300">
          {props.label}
        </label>
      )}

      <input
        {...props}
        id={id}
        disabled
        class={`block bg-gray-50 cursor-not-allowed mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${props.class || ""}`}
      />
    </div>
  );
}