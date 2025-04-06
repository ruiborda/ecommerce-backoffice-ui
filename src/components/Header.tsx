import {
    JSX,
    Match,
    Switch,
} from "solid-js"
import {
    Signal,
} from "solid-js/types/reactive/signal"
import { WindowInnerWidthSize } from "../utils/WindowInnerWidth"
import { Menu } from "../assets/icons/Menu"
import { MenuOpen } from "../assets/icons/MenuOpen"

export class HeaderProps {
    menuStatus?: Signal<boolean>
}

export function Header(props: HeaderProps): JSX.Element {
    const [menuStatus, setMenuStatus] = props?.menuStatus as Signal<boolean>
    return (
        <div classList={{
            "flex h-20 items-center text-gray-900": true,
            "bg-neutral-50": menuStatus() && window.innerWidth <= WindowInnerWidthSize.lg,
        }}>
            <button
                class={"h-20 w-20 px-3 py-5 text-3xl cursor-pointer hover:bg-gray-300 hover:fill-gray-800  hover: items-center flex justify-center"}
                onClick={() => {
                    setMenuStatus(!menuStatus())
                }}
            >

                <Switch>
                    <Match when={!menuStatus()}>
                        <Menu className={"h-8 w-8 "}/>
                    </Match>
                    <Match when={menuStatus()}>
                        <MenuOpen className={"h-8 w-8 "}/>
                    </Match>
                </Switch>
            </button>
            <div class={"px-3 py-5 text-xl font-semibold"}>
                Event Academic
            </div>
        </div>
    )
}