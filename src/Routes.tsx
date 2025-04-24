import {
    Route,
    Router,
} from "@solidjs/router"
import type { JSX } from "solid-js"
import { Index as NewsArticleIndex } from "./pages/news-article/Index"
import { UploadFiles as FilesUploadFiles } from "./pages/files/UploadFiles"
import { EditFiles as FilesEditFiles } from "./pages/files/EditFiles"
import { Index as FilesIndex } from "./pages/files/Index"
import { Index } from "./pages/Index"
import { Index as RolesIndex } from "./pages/roles/Index"
import { CreateRole } from "./pages/roles/CreateRole"
import { EditRole } from "./pages/roles/EditRole"
import { ListUsers } from "./pages/users/ListUsers"
import { CreateUser } from "./pages/users/CreateUser"
import { EditUser } from "./pages/users/EditUser"

export function Routes(): JSX.Element {
    return (
        <Router>
            <Route path={"/"} component={Index}/>
            <Route path={"/news-article"} component={NewsArticleIndex}/>
            <Route path={"/files"} component={FilesIndex}/>
            <Route path={"/files.upload"} component={FilesUploadFiles}/>
            <Route path={"/files.edit/:id"} component={FilesEditFiles}/>
            <Route path={"/roles"} component={RolesIndex}/>
            <Route path={"/roles.create"} component={CreateRole}/>
            <Route path={"/roles.edit/:id"} component={EditRole}/>
            <Route path={"/users"} component={ListUsers}/>
            <Route path={"/users.create"} component={CreateUser}/>
            <Route path={"/users.edit/:id"} component={EditUser}/>
        </Router>
    )
}