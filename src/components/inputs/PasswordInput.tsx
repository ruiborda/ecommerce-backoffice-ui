import { JSX, createSignal } from "solid-js";

export interface PasswordInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  forgotPasswordLink?: string;
  forgotPasswordText?: string;
}

export function PasswordInput(props: PasswordInputProps): JSX.Element {
  const [showPassword, setShowPassword] = createSignal(false);
  const id = props.id || `password-input-${Math.random().toString(36).substring(2, 9)}`;
  const { forgotPasswordLink, forgotPasswordText, ...inputProps } = props;

  return (
    <div>
      <div class="flex items-center justify-between">
        {props.label && (
          <label for={id} class="block text-sm text-gray-500 dark:text-gray-300">
            {props.label}
          </label>
        )}
        
        {forgotPasswordLink && (
          <a href={forgotPasswordLink} class="text-xs text-gray-600 hover:underline dark:text-gray-400">
            {forgotPasswordText || "Forgot Password?"}
          </a>
        )}
      </div>

      <div class="relative flex items-center mt-2">
        <button 
          type="button"
          class="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto"
          onClick={() => setShowPassword(!showPassword())}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            class="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          >
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path 
              fill-rule="evenodd" 
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" 
              clip-rule="evenodd" 
            />
          </svg>
        </button>

        <input
          {...inputProps}
          id={id}
          type={showPassword() ? "text" : "password"}
          class={`block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${props.class || ""}`}
        />
      </div>
    </div>
  );
}