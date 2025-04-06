import {
    Route,
    Router
} from "@solidjs/router";
import type { JSX } from "solid-js";
import { Index } from "./pages/Index";

export function Routes(): JSX.Element {
    return (
        <Router>
            <Route path={'/'} component={Index}/>
        </Router>
    )
}