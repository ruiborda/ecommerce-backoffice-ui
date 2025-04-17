import { JSX } from "solid-js"

export interface NotificationPopProps {
    message: string | JSX.Element;
    avatarSrc?: string;
    class?: string;
}

export function NotificationPop(props: NotificationPopProps): JSX.Element {
    return (
        <div class={`flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 ${props.class || ""}`}>
            <div class="w-2 bg-gray-800 dark:bg-gray-900"></div>

            <div class="flex items-center px-2 py-3">
                {props.avatarSrc && (
                    <img class="object-cover w-10 h-10 rounded-full" alt="User avatar" src={props.avatarSrc} />
                )}

                <div class="mx-3">
                    <p class="text-gray-600 dark:text-gray-200">{props.message}</p>
                </div>
            </div>
        </div>
    )
}