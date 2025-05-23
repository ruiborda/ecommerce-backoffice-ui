import { JSX } from "solid-js"

export interface InfoFullWidthProps {
    message: string;
    onClose?: () => void;
    class?: string;
}

export function InfoFullWidth(props: InfoFullWidthProps): JSX.Element {
    return (
        <div class={`w-full text-white bg-blue-500 ${props.class || ""}`}>
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                <div class="flex">
                    <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                        <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z">
                        </path>
                    </svg>

                    <p class="mx-3">{props.message}</p>
                </div>

                {props.onClose && (
                    <button 
                        onClick={props.onClose}
                        class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}