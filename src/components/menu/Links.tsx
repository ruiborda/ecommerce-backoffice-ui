import {
    JSX,
} from "solid-js"
import { A } from "@solidjs/router"
import { AnchorProps } from "@solidjs/router/dist/components"

export interface MenuLinksProps extends AnchorProps {
    isActive?: boolean
    icon: JSX.Element
}

export function Links(props: MenuLinksProps) {
    return (
        <A
            activeClass={"fill-white text-white font-semibold bg-gray-800"}
            inactiveClass={"fill-gray-400"}
            class={"flex hover:fill-white hover:text-white hover:font-semibold hover:bg-gray-800 h-13 cursor-pointer items-center rounded-md"}
            {...props}>
            <div class={"flex justify-center items-center p-2"}>
                {props.icon}
            </div>
            <div class={"p-2 text-lg"}>{props.children}</div>
        </A>
    )
}