import { JSX } from "solid-js"

export interface DividerProps extends JSX.HTMLAttributes<HTMLTableElement> {
}

export function Table(props: DividerProps): JSX.Element {
    const classes = "min-w-full divide-y divide-gray-200 dark:divide-gray-700 " + (props.class)
    return <table  {...props} class={classes}/>
}
