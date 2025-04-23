import {
    createEffect,
    createSignal,
    createResource,
    For,
    JSX,
    Show,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import {
    action,
    useSubmission,
} from "@solidjs/router"
import { RolesService } from "../../services/RolesService"
import { PermissionsService } from "../../services/PermissionsService"
import { CreateRoleRequestDTO } from "../../dto/roles/CreateRoleRequestDTO"
import {
    ErrorFullWidth,
    SuccessFullWidth,
} from "../../components/alerts"
import {
    Input,
    Checkbox,
} from "../../components/inputs"
import { SecondaryButton } from "../../components/buttons"

const rolesService = new RolesService()
const permissionsService = new PermissionsService()

const createRole = action(async (formData: FormData) => {
    const code = formData.get("code") as string
    const permissions: number[] = []
    
    // Get all permission IDs from form data
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('permission-') && value === 'on') {
            const permissionId = parseInt(key.replace('permission-', ''))
            permissions.push(permissionId)
        }
    }

    if (!code) {
        return { error: "El código del rol es requerido" }
    }

    if (permissions.length === 0) {
        return { error: "Debe seleccionar al menos un permiso" }
    }

    const roleData: CreateRoleRequestDTO = {
        code: code.toUpperCase(),
        permissions
    }

    try {
        const result = await rolesService.createRole(roleData)
        return result
    } catch (error) {
        return { error: "Error al crear el rol: " + error.message }
    }
}, "createRole")

export function CreateRole(): JSX.Element {
    const submission = useSubmission(createRole)
    let formRef: HTMLFormElement = {} as HTMLFormElement
    
    // Fetch permissions from API
    const [permissions] = createResource(permissionsService.getAllPermissions.bind(permissionsService))

    createEffect(() => {
        if (submission.result && !submission.error) {
            formRef.reset()
        }
    })

    return (
        <Dashboard>
            <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-6">Crear Nuevo Rol</h2>

                <form
                    ref={formRef}
                    action={createRole}
                    method="post"
                    class="mt-6"
                >
                    <div class="grid grid-cols-1 gap-6 mb-6">
                        <Input
                            id="code"
                            name="code"
                            label="Código del Rol"
                            type="text"
                            placeholder="Ej: ADMIN, EDITOR, USER"
                            required
                        />
                    </div>

                    <fieldset class="border border-gray-200 p-4 rounded mb-6">
                        <legend class="text-sm font-medium text-gray-700 px-2">Permisos</legend>
                        <Show when={permissions.loading}>
                            <p class="text-center py-4">Cargando permisos...</p>
                        </Show>
                        
                        <Show when={permissions.error}>
                            <ErrorFullWidth message={"Error al cargar permisos: " + permissions.error} />
                        </Show>
                        
                        <Show when={permissions() && !permissions.loading}>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 max-h-96 overflow-y-auto">
                                <For each={permissions()}>
                                    {(permission) => (
                                        <div class="flex items-center">
                                            <Checkbox
                                                id={`permission-${permission.id}`}
                                                name={`permission-${permission.id}`}
                                            />
                                            <label class="ml-2 text-gray-700 cursor-pointer hover:bg-gray-50 p-1 rounded w-full" for={`permission-${permission.id}`}>
                                                <span class="font-medium text-sm">{permission.name}</span>
                                                <span class="block text-xs text-gray-600">{permission.description}</span>
                                                <span class="block text-xs italic text-gray-500">{permission.method} {permission.path}</span>
                                            </label>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </Show>
                    </fieldset>

                    <div class="flex justify-end">
                        <SecondaryButton
                            type="submit"
                            disabled={submission.pending}
                            class="bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 disabled:opacity-50"
                        >
                            {submission.pending ? "Creando..." : "Crear Rol"}
                        </SecondaryButton>
                    </div>

                    <Show when={submission.error}>
                        <ErrorFullWidth message={"Error: " + submission.error} />
                    </Show>

                    <Show when={submission.result && !submission.error}>
                        <SuccessFullWidth message="Rol creado exitosamente." />
                    </Show>
                </form>
            </section>
        </Dashboard>
    )
}