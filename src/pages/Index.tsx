import { JSX } from "solid-js";
import { Dashboard } from "../components/Dashboard";

export function Index(): JSX.Element {
    return (
        <Dashboard>
            <h1 class="text-3xl font-bold underline">
                Hello world!
            </h1>
        </Dashboard>
    );
}