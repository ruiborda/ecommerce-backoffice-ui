import { JSX } from "solid-js";

export interface ErrorInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  errorMessage?: string;
}

export function ErrorInput(props: ErrorInputProps): JSX.Element {
  const id = props.id || `error-input-${Math.random().toString(36).substring(2, 9)}`;
  const { errorMessage, ...inputProps } = props;

  return (
    <div>
      {props.label && (
        <label for={id} class="block text-sm text-gray-500 dark:text-gray-300">
          {props.label}
        </label>
      )}

      <input
        {...inputProps}
        id={id}
        class={`block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300 ${props.class || ""}`}
      />
      
      {errorMessage && (
        <p class="mt-3 text-xs text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}