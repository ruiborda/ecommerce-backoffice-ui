import { JSX } from "solid-js"

export interface TbodyProps extends JSX.HTMLAttributes<HTMLTableSectionElement>{
}

export function Tbody(props: TbodyProps): JSX.Element {
    const classes="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900" + props.class
    return <tbody class={classes} {...props} />
}
