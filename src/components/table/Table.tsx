import { JSX } from "solid-js"
import { ArrowLeftAlt } from "../../assets/material_icons/ArrowLeftAlt"
import { ArrowRightAlt } from "../../assets/material_icons/ArrowRightAlt"
import { Signal } from "solid-js/types/reactive/signal"
import { Pagination } from "../../dto/Pagination"

export interface DividerProps extends JSX.HTMLAttributes<HTMLTableElement> {
    paginationSignal?: Signal<Pagination>
}

export function Table(props: DividerProps): JSX.Element {
    const [pagination, setPagination]: Signal<Pagination> = props.paginationSignal as Signal<Pagination>
    props.class = "min-w-full divide-y divide-gray-200 dark:divide-gray-700 " + (props.class)
    return <>
        <div class="flex flex-col mt-6">
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full align-middle ">
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table {...props}>
                            {props.children}
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between mt-6">
            <button
                onclick={(e) => {
                    setPagination({
                        page: pagination().page - 1,
                        size: pagination().size
                    })
                }}
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <ArrowLeftAlt class={"w-5 h-5"}/>
                <span>
                    Anterior
                </span>
            </button>
            <button
                onclick={(e) => {
                    setPagination({
                        page: pagination().page + 1,
                        size: pagination().size
                    })
                }}
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                    Siguiente
                </span>
                <ArrowRightAlt class={"w-5 h-5"}/>
            </button>
        </div>
    </>

}
