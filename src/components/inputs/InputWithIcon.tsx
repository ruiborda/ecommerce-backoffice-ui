import { JSX } from "solid-js";

export interface InputWithIconProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  icon?: JSX.Element;
}

export function InputWithIcon(props: InputWithIconProps): JSX.Element {
  const id = props.id || `input-icon-${Math.random().toString(36).substring(2, 9)}`;
  const { icon, ...inputProps } = props;

  return (
    <div>
      {props.label && (
        <label for={id} class="block text-sm text-gray-500 dark:text-gray-300">
          {props.label}
        </label>
      )}

      <div class="relative flex items-center mt-2">
        {icon && <span class="absolute">{icon}</span>}

        <input
          {...inputProps}
          id={id}
          class={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg ${
            icon ? "pl-11 pr-5 rtl:pr-11 rtl:pl-5" : "px-5"
          } dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${props.class || ""}`}
        />
      </div>
    </div>
  );
}