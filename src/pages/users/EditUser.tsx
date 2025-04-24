import {
    createResource,
    createEffect,
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
import { UsersService } from "../../services/UsersService"
import { RolesService } from "../../services/RolesService"
import { UpdateUserRequestDTO } from "../../dto/users/UpdateUserRequestDTO"
import {
    ErrorFullWidth,
    SuccessFullWidth,
} from "../../components/alerts"
import {
    Checkbox,
    Input,
    PasswordInput,
} from "../../components/inputs"
import { SecondaryButton } from "../../components/buttons"
import { RoleResponseDTO } from "../../dto/roles/RoleResponseDTO"

const usersService = new UsersService()
const rolesService = new RolesService()

const updateUser = action(async (formData: FormData) => {
    const id = formData.get("id") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    const roleIds: string[] = []

    // Get all role IDs from form data
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('role-') && value === 'on') {
            const roleId = key.replace('role-', '')
            roleIds.push(roleId)
        }
    }

    if (!id || !email || !fullName) {
        return { error: "ID, email y nombre completo son requeridos" }
    }

    if (roleIds.length === 0) {
        return { error: "Debe seleccionar al menos un rol" }
    }

    const userData: UpdateUserRequestDTO = {
        id,
        email,
        password,
        fullName,
        roleIds
    }

    try {
        const result = await usersService.updateUser(userData)
        return result
    } catch (error) {
        return { error: "Error al actualizar el usuario: " + error.message }
    }
}, "updateUser")

export function EditUser(): JSX.Element {
    const params = useParams()
    const navigate = useNavigate()
    const submission = useSubmission(updateUser)
    
    // Fetch user from API
    const [user] = createResource(() => params.id, usersService.getUserById.bind(usersService))
    
    // Fetch roles from API
    const [roles] = createResource(async () => {
        try {
            const response = await rolesService.pageRoles({ page: 1, size: 100 });
            return response.data;
        } catch (error) {
            console.error("Error al cargar los roles:", error);
            return [];
        }
    })
    
    // Check if role is assigned to user
    const isRoleAssigned = (roleId: string) => {
        if (!user() || !user().roles) return false;
        return user().roles.some(role => role.id === roleId);
    }

    createEffect(() => {
        if (submission.result && !submission.error) {
            // Success notification will be shown
            // We could redirect but let's stay on the page to show the success message
        }
    })

    return (
        <Dashboard>
            <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-6">Editar Usuario</h2>

                <Show when={submission.error}>
                    <ErrorFullWidth message={submission.error as string} />
                </Show>

                <Show when={submission.result && !submission.error}>
                    <SuccessFullWidth message="Usuario actualizado con éxito" />
                </Show>

                <Show when={user.error}>
                    <ErrorFullWidth message="Error al cargar el usuario. Por favor, intente de nuevo." />
                </Show>

                <Show when={!user.loading && user()} fallback={<p class="text-center py-4">Cargando...</p>}>
                    <form
                        action={updateUser}
                        method="post"
                        class="mt-6"
                    >
                        <input type="hidden" name="id" value={user()?.id} />

                        <div class="grid grid-cols-1 gap-6 mb-6">
                            <Input
                                id="email"
                                name="email"
                                label="Correo Electrónico"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={user()?.email}
                                required
                            />
                            
                            <PasswordInput
                                id="password"
                                name="password"
                                label="Contraseña (Dejar vacío para mantener la actual)"
                                placeholder="Ingresa una contraseña nueva"
                            />
                            
                            <Input
                                id="fullName"
                                name="fullName"
                                label="Nombre Completo"
                                type="text"
                                placeholder="Ej: Juan Pérez"
                                value={user()?.fullName}
                                required
                            />

                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                    Roles
                                </label>
                                
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <Show when={!roles.loading} fallback={<p>Cargando roles...</p>}>
                                        <For each={roles()}>
                                            {(role: RoleResponseDTO) => (
                                                <div>
                                                    <Checkbox
                                                        id={`role-${role.id}`}
                                                        name={`role-${role.id}`}
                                                        label={role.code}
                                                        checked={isRoleAssigned(role.id)}
                                                    />
                                                </div>
                                            )}
                                        </For>
                                    </Show>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end mt-6 space-x-2">
                            <SecondaryButton
                                type="button"
                                onClick={() => navigate("/users")}
                            >
                                Volver
                            </SecondaryButton>
                            <SecondaryButton
                                type="submit"
                                disabled={submission.pending}
                            >
                                {submission.pending ? 'Guardando...' : 'Actualizar Usuario'}
                            </SecondaryButton>
                        </div>
                    </form>
                </Show>
            </section>
        </Dashboard>
    )
}