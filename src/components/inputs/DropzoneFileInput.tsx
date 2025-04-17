import { createSignal, JSX, onMount } from "solid-js";

export interface DropzoneFileInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  title?: string;
  description?: string;
}

export function DropzoneFileInput(props: DropzoneFileInputProps): JSX.Element {
  const id = props.id || 'dropzone-file';
  const { title = "Payment File", description = "Upload or drag & drop your file SVG, PNG, JPG or GIF.", ...inputProps } = props;
  const [fileName, setFileName] = createSignal<string | null>(null);

  // Handler para actualizar el nombre del archivo
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      setFileName(input.files[0].name);
    } else {
      setFileName(null);
    }
    
    // Llamar al manejador de onChange proporcionado en los props si existe
    if (props.onChange) {
      props.onChange(event as any);
    }
  };

  return (
    <div>
      {props.label && (
        <label class="block text-sm text-gray-500 dark:text-gray-300">
          {props.label}
        </label>
      )}

      <label 
        for={id} 
        class="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="w-8 h-8 text-gray-500 dark:text-gray-400"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" 
          />
        </svg>

        <h2 class="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
          {title}
        </h2>

        <p class="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
          {description}
        </p>
        
        {fileName() && (
          <div class="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg w-full">
            <p class="text-sm text-gray-700 dark:text-gray-200 truncate">
              Archivo seleccionado: {fileName()}
            </p>
          </div>
        )}

        <input 
          {...inputProps}
          id={id} 
          type="file" 
          class="hidden" 
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}