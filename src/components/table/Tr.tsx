import { JSX } from "solid-js"

export interface TrProps extends JSX.HTMLAttributes<HTMLTableRowElement> {
}

export function Tr(props: TrProps): JSX.Element {
    return <tr {...props} />
}
