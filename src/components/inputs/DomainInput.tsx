import { JSX } from "solid-js";

export interface DomainInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  prefix?: string;
}

export function DomainInput(props: DomainInputProps): JSX.Element {
  const id = props.id || `domain-input-${Math.random().toString(36).substring(2, 9)}`;
  const { prefix = "http://", ...inputProps } = props;

  return (
    <div>
      {props.label && (
        <label for={id} class="block text-sm text-gray-500 dark:text-gray-300">
          {props.label}
        </label>
      )}

      <div class="flex items-center mt-2">
        <p class="py-2.5 px-3 text-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-r-0 rtl:rounded-r-lg rtl:rounded-l-none rtl:border-l-0 rtl:border-r rounded-l-lg">
          {prefix}
        </p>
        
        <input
          {...inputProps}
          id={id}
          class={`block w-full rounded-l-none rtl:rounded-l-lg rtl:rounded-r-none placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${props.class || ""}`}
        />
      </div>
    </div>
  );
}