import { Newspaper } from "../assets/icons/Newspaper"
import {
    JSX,
} from "solid-js"

class MenuLinksProps {
    isActive?: boolean
    name?: string
    icon: JSX.Element
}

export function MenuLinks({name, isActive, icon}: MenuLinksProps) {
    return (
        <button
            classList={{
                "flex hover:fill-white hover:text-white hover:font-semibold hover:bg-gray-800 h-13 cursor-pointer items-center rounded-md":true,
                "fill-gray-400": !isActive,
                "fill-white text-white font-semibold bg-gray-800": isActive,
            }}>
            <div class={"flex justify-center items-center p-2"}>
                {icon}
            </div>
            <div class={"p-2 text-xl"}>{name}</div>
        </button>
    )
}