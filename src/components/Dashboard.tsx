import {
    createEffect,
    createSignal,
    JSX,
    onCleanup,
    Show,
} from "solid-js"
import { Header } from "./Header"
import { Menu } from "./Menu"
import { Signal } from "solid-js/types/reactive/signal"
import {
    WindowInnerWidth,
    WindowInnerWidthSize,
} from "../utils/WindowInnerWidth"

export class DashboardProps {
    children?: JSX.Element
}

export function Dashboard(props: DashboardProps): JSX.Element {
    const [menuStatus, setMenuStatus]: Signal<boolean> = createSignal<boolean>(false)
    const [currentWindowInnerWidth, setCurrentWindowInnerWidth] = createSignal<WindowInnerWidth>(new WindowInnerWidth(window.innerWidth))

    if (new WindowInnerWidth(window.innerWidth).isGreaterThanOrEqualTo(WindowInnerWidthSize.lg)) {
        setMenuStatus(true)
    }

    const handleResize = () => setCurrentWindowInnerWidth(new WindowInnerWidth(window.innerWidth))
    window.addEventListener("resize", handleResize)

    onCleanup(() => {
        window.removeEventListener("resize", handleResize)
    })

    createEffect(() => {
        if (currentWindowInnerWidth().isGreaterThanOrEqualTo(WindowInnerWidthSize.lg)) {
            setMenuStatus(true)
        } else {
            setMenuStatus(false)
        }
    })


    return (
        <div class={"flex flex-col h-dvh bg-neutral-200"}>
            <Header menuStatus={[menuStatus, setMenuStatus]}/>
            <div class="flex h-full relative z-40">
                <Show when={menuStatus()}>
                    <Menu
                        menuStatus={[menuStatus, setMenuStatus]}
                        currentWindowInnerWidth={[currentWindowInnerWidth, setCurrentWindowInnerWidth]}
                    />
                </Show>
                <main classList={{
                    "relative flex w-full rounded-3xl px-8 py-13 lg:mr-3 lg:mb-3 z-0 shadow border-gray-300 bg-neutral-100 justify-center": true,
                    "ml-5": currentWindowInnerWidth().isGreaterThanOrEqualTo(WindowInnerWidthSize.lg),
                }}>
                    <Show when={currentWindowInnerWidth().isLessThan(WindowInnerWidthSize.lg) && menuStatus()}>
                        <div
                            class="absolute top-0 left-0 w-full h-full backdrop-blur-xs z-10 brightness-90 cursor-pointer"
                            onClick={() => setMenuStatus(false)}></div>
                    </Show>
                    {props.children}
                </main>
            </div>
        </div>
    )
}
