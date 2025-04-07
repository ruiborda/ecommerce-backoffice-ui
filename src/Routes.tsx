import {
    Route,
    Router,
} from "@solidjs/router"
import type { JSX } from "solid-js"
import { Index as NewsArticleIndex } from "./pages/news-article/Index"
import { UploadFiles as FilesUploadFiles } from "./pages/files/UploadFiles"
import { Index as FilesIndex } from "./pages/files/Index"
import { Index } from "./pages/Index"

export function Routes(): JSX.Element {
    return (
        <Router>
            <Route path={"/"} component={Index}/>
            <Route path={"/news-article"} component={NewsArticleIndex}/>
            <Route path={"/files"} component={FilesIndex}/>
            <Route path={"/files/upload"} component={FilesUploadFiles}/>
        </Router>
    )
}