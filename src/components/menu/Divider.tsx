import { JSX } from "solid-js"

export interface DividerProps extends JSX.HTMLAttributes<HTMLHRElement> {
}

export function Divider(props: DividerProps): JSX.Element {
    const classes = "border-gray-700 my-5 " + (props.class)
    return <hr class={classes} {...props} />
}
