import { JSX } from "solid-js";

export interface TextareaWithHelpProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helpText?: string;
  id?: string;
}

export function TextareaWithHelp(props: TextareaWithHelpProps): JSX.Element {
  const id = props.id || `textarea-help-${Math.random().toString(36).substring(2, 9)}`;
  const { helpText, ...textareaProps } = props;

  return (
    <div>
      {props.label && (
        <label for={id} class="block text-sm text-gray-500 dark:text-gray-300">
          {props.label}
        </label>
      )}

      <textarea
        {...textareaProps}
        id={id}
        class={`block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300 ${props.class || ""}`}
      />
      
      {helpText && (
        <p class="mt-3 text-xs text-gray-400 dark:text-gray-600">{helpText}</p>
      )}
    </div>
  );
}