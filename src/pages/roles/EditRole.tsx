import {
    createResource,
    For,
    JSX,
    Show,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import {
    action,
    useNavigate,
    useParams,
    useSubmission,
} from "@solidjs/router"
import { RolesService } from "../../services/RolesService"
import { PermissionsService } from "../../services/PermissionsService"
import { UpdateRoleRequestDTO } from "../../dto/roles/UpdateRoleRequestDTO"
import {
    ErrorFullWidth,
    SuccessFullWidth,
} from "../../components/alerts"
import {
    Checkbox,
    Input,
} from "../../components/inputs"
import { SecondaryButton } from "../../components/buttons"

const rolesService = new RolesService()
const permissionsService = new PermissionsService()

const updateRole = action(async (formData: FormData) => {
    const id = formData.get("id") as string
    const code = formData.get("code") as string
    const permissions: number[] = []

    // Get all permission IDs from form data
    for (const [key, value] of formData.entries()) {
        if (key.startsWith("permission-") && value === "on") {
            const permissionId = parseInt(key.replace("permission-", ""))
            permissions.push(permissionId)
        }
    }

    if (!code) {
        return {error: "El código del rol es requerido"}
    }

    const roleData: UpdateRoleRequestDTO = {
        id, code: code.toUpperCase(), permissions,
    }

    try {
        const result = await rolesService.updateRole(roleData)
        return result
    } catch (error) {
        return {error: "Error al actualizar el rol: " + error.message}
    }
}, "updateRole")

export function EditRole(): JSX.Element {
    const params = useParams()
    const submission = useSubmission(updateRole)
    const navigate = useNavigate()

    const [roleData] = createResource(params.id, rolesService.getRoleById.bind(rolesService))
    const [permissions] = createResource(permissionsService.getAllPermissions.bind(permissionsService))

    // Check if a permission is assigned to the role
    const hasPermission = (permissionId: number) => {
        if (!roleData()) return false
        return roleData()?.permissions.some(p => p.id === permissionId)
    }

    return (<Dashboard>
            <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-6">Editar Rol</h2>

                <Show when={roleData.loading || permissions.loading}>
                    <p class="text-center">Cargando información...</p>
                </Show>

                <Show when={roleData.error}>
                    <ErrorFullWidth message={"Error al cargar el rol: " + roleData.error}/>
                </Show>

                <Show when={permissions.error}>
                    <ErrorFullWidth message={"Error al cargar los permisos: " + permissions.error}/>
                </Show>

                <Show when={roleData() && permissions() && !roleData.loading && !permissions.loading}>
                    <form
                        action={updateRole}
                        method="post"
                        class="mt-6"
                    >
                        <input type="hidden" name="id" value={roleData()?.id}/>

                        <div class="grid grid-cols-1 gap-6 mb-6">
                            <Input
                                id="code"
                                name="code"
                                label="Código del Rol"
                                type="text"
                                value={roleData()?.code}
                                placeholder="Ej: ADMIN, EDITOR, USER"
                                required
                            />
                        </div>

                        <fieldset class="border border-gray-200 p-4 rounded mb-6">
                            <legend class="text-sm font-medium text-gray-700 px-2">Permisos</legend>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-h-96 overflow-y-auto">
                                <For each={permissions()}>
                                    {(permission) => (<div class="flex items-center">
                                            <Checkbox
                                                id={`permission-${permission.id}`}
                                                name={`permission-${permission.id}`}
                                                checked={hasPermission(permission.id)}
                                            />
                                            <label class="ml-2 text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded w-full" for={`permission-${permission.id}`}>
                                                <span class="font-medium text-sm">{permission.name}</span>
                                                <span class="block text-xs text-gray-600">{permission.description}</span>
                                                <span class="block text-xs italic text-gray-500">{permission.method} {permission.path}</span>
                                            </label>
                                        </div>)}
                                </For>
                            </div>
                        </fieldset>

                        <div class="flex justify-end">
                            <SecondaryButton
                                type="submit"
                                disabled={submission.pending}
                                class="bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 disabled:opacity-50"
                            >
                                {submission.pending ? "Actualizando..." : "Actualizar Rol"}
                            </SecondaryButton>
                        </div>

                        <Show when={submission.error}>
                            <ErrorFullWidth message={"Error: " + submission.error}/>
                        </Show>

                        <Show when={submission.result && !submission.error}>
                            <SuccessFullWidth message="Rol actualizado exitosamente."/>
                        </Show>
                    </form>
                </Show>
            </section>
        </Dashboard>)
}