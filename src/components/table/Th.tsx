import { JSX } from "solid-js"

export interface ThProps extends JSX.HTMLAttributes<HTMLTableCellElement> {
    scope?: "col" | "row" | "colgroup" | "rowgroup"
}

export function Th(props: ThProps): JSX.Element {
    const classes = "px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 " + (props.class)
    return <th class={classes} {...props} scope={props.scope}/>
}
