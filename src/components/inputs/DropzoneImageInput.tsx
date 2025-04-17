import { createSignal, JSX, Show } from "solid-js";

export interface DropzoneImageInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  title?: string;
  description?: string;
}

export function DropzoneImageInput(props: DropzoneImageInputProps): JSX.Element {
  const id = props.id || 'dropzone-image';
  const { title = "Imagen", description = "Upload or drag & drop your image (JPG, PNG, GIF).", ...inputProps } = props;
  const [fileName, setFileName] = createSignal<string | null>(null);
  const [previewUrl, setPreviewUrl] = createSignal<string | null>(null);

  // Handler para actualizar el nombre y la vista previa de la imagen
  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      setFileName(file.name);
      
      // Crear URL para la vista previa
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    } else {
      setFileName(null);
      setPreviewUrl(null);
    }
    
    // Llamar al manejador de onChange proporcionado en los props si existe
    if (props.onChange) {
      if (typeof props.onChange === "function") {
        props.onChange(event as any);
      }
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
        <Show when={!previewUrl()} fallback={
          <div class="w-full">
            <img 
              src={previewUrl() || ''} 
              alt="Vista previa" 
              class="max-h-48 mx-auto object-contain mb-4"
            />
            <p class="text-sm text-gray-700 dark:text-gray-200 mb-2 truncate">
              {fileName()}
            </p>
            <button 
              type="button" 
              class="text-xs text-blue-500 hover:text-blue-700"
              onClick={(e) => {
                e.preventDefault();
                setFileName(null);
                setPreviewUrl(null);
                const inputEl = document.getElementById(id) as HTMLInputElement;
                if (inputEl) inputEl.value = '';
              }}
            >
              Cambiar imagen
            </button>
          </div>
        }>
          <>
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" 
              />
            </svg>

            <h2 class="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
              {title}
            </h2>

            <p class="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </>
        </Show>

        <input 
          {...inputProps}
          id={id} 
          type="file" 
          class="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}