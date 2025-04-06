import { JSX } from "solid-js";

export interface SectionTitleProps extends JSX.HTMLAttributes<HTMLHeadingElement> {}

export function SectionTitle(props: SectionTitleProps): JSX.Element {
    const classes = "text-xl lg:text-2xl p-2 " + (props.class ?? "");
    return (
        <h2 class={classes} {...props} />
    )
}