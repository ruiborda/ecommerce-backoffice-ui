import {
    createSignal,
    JSX,
} from "solid-js"
import { Signal } from "solid-js/types/reactive/signal"
import {
    WindowInnerWidth,
    WindowInnerWidthSize,
} from "../utils/WindowInnerWidth"
import { HomeStorage } from "../assets/material_icons/HomeStorage"
import { UploadFile } from "../assets/material_icons/UploadFile"
import { Newspaper } from "../assets/material_icons/Newspaper"
import { Links } from "./menu/Links"
import { SectionTitle } from "./menu/SectionTitle"
import { Divider } from "./menu/Divider"

export class MenuProps {
    menuStatus?: Signal<boolean>
    currentWindowInnerWidth?: Signal<WindowInnerWidth>
}

export function Menu(props: MenuProps): JSX.Element {
    const [menuStatus, setMenuStatus]: Signal<boolean> = props.menuStatus as Signal<boolean>
    const [currentWindowInnerWidth, setCurrentWindowInnerWidth]: Signal<WindowInnerWidth> = props.currentWindowInnerWidth as Signal<WindowInnerWidth>
    const iconClass = "h-8 w-8"
    return (
        <div classList={{
            "bg-gray-900 gap-1": true,
            "z-40": true,
            "flex": true,
            "w-90": currentWindowInnerWidth().isGreaterThanOrEqualTo(WindowInnerWidthSize.lg),
            "w-70": currentWindowInnerWidth().isLessThan(WindowInnerWidthSize.lg),
            "px-3": true,
            "py-5": true,
            "absolute": currentWindowInnerWidth().isLessThan(WindowInnerWidthSize.lg),
            "h-full": true,
            "text-gray-400": true,
            "flex-col": true,
        }}>
            <SectionTitle>
                Articulos de Noticias
            </SectionTitle>
            <Links
                href={"/news-article"}
                icon={<Newspaper class={iconClass}/>}
                isActive={false}>
                Lista de Noticias
            </Links>

            <Divider/>

            <SectionTitle>
                Archivos
            </SectionTitle>
            <Links
                href={"/files"}
                icon={<HomeStorage class={iconClass}/>}
                isActive={true}>
                Lista de Archivos
            </Links>
            <Links
                href={"/files/upload"}
                icon={<UploadFile class={iconClass}/>}
                isActive={false}>
                Subir Archivos
            </Links>

            <Divider/>
        </div>
    )
}