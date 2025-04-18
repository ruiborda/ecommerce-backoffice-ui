import {
    createEffect,
    createSignal,
    JSX,
    Show,
} from "solid-js"
import { ArrowLeftAlt } from "../../assets/material_icons/ArrowLeftAlt"
import { ArrowRightAlt } from "../../assets/material_icons/ArrowRightAlt"
import {
    Pagination,
    PaginationParams,
} from "../../dto/PaginationParams"
import { Signal } from "solid-js/types/reactive/signal"
import { OutlineButton } from "../../components/buttons"

export interface DividerProps extends JSX.HTMLAttributes<HTMLTableElement> {
    paginationSignal?: Signal<Pagination>
    totalPages?: number
}

export function Table(props: DividerProps): JSX.Element {
    const [pagination, setPagination] = props?.paginationSignal ? props.paginationSignal : createSignal<Pagination>(new Pagination({
        page: 1,
        size: 10
    }))
    const classes = "min-w-full divide-y divide-gray-200 dark:divide-gray-700 " + (props.class)
    
    return <>
        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full py-2">
                    <div class="overflow-hidden">
                        <table class={classes} {...props} />
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-center gap-4 p-4">
            <OutlineButton
                onClick={(e) => {
                    setPagination(new Pagination({
                        ...pagination(),
                        page: pagination().page - 1
                    }))
                }}
                disabled={pagination().page === 1}
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize gap-x-2 disabled:opacity-50"
            >
                <ArrowLeftAlt class={"w-5 h-5"}/>
                <span>
                    Anterior
                </span>
            </OutlineButton>
            
            <OutlineButton
                onClick={(e) => {
                    setPagination(new Pagination({
                        ...pagination(),
                        page: pagination().page + 1
                    }))
                }}
                disabled={props.totalPages ? pagination().isLastPage(props.totalPages) : false}
                class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize gap-x-2 disabled:opacity-50"
            >
                <span>
                    Siguiente
                </span>
                <ArrowRightAlt class={"w-5 h-5"}/>
            </OutlineButton>
        </div>
    </>
}
