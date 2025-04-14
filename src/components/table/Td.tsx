import { JSX } from "solid-js"

export interface TdProps extends JSX.HTMLAttributes<HTMLTableCellElement> {
}

export function Td(props: TdProps): JSX.Element {
    props.class = `${props.class} px-4 py-4 text-sm font-medium`
    return <td {...props}/>
}
