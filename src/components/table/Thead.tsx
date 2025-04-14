import { JSX } from "solid-js"

export interface TheadProps extends JSX.HTMLAttributes<HTMLTableSectionElement> {
}

export function Thead(props: TheadProps): JSX.Element {
    const classes = "bg-gray-50 dark:bg-gray-800 " + (props.class)
    return <thead class={classes} {...props} />
}
