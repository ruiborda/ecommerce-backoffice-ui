import {
    createSignal,
    JSX,
} from "solid-js"
import { Signal } from "solid-js/types/reactive/signal"
import {
    WindowInnerWidth,
    WindowInnerWidthSize,
} from "../utils/WindowInnerWidth"
import { HomeStorage } from "../assets/icons/HomeStorage"
import { UploadFile } from "../assets/icons/UploadFile"
import { Newspaper } from "../assets/icons/Newspaper"
import { MenuLinks } from "./MenuLinks"

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
            <h2 class={"text-xl lg:text-3xl p-2"}>Archivos</h2>
            <MenuLinks
                icon={<HomeStorage className={iconClass}/>}
                name={"Lista de Archivos"}
                isActive={true}
            />
            <MenuLinks
                icon={<UploadFile className={iconClass}/>}
                name={"Subir Archivo"}
                isActive={false}
            />

            <hr class={"border-gray-700 my-5"}/>

            <h2 class={"text-xl lg:text-3xl p-2"}>Articulos de Noticia</h2>
            <MenuLinks
                icon={<Newspaper className={iconClass}/>}
                name={"Lista de Noticias"}
                isActive={false}
            />
        </div>
    )
}