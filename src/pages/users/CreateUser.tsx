import {
    createEffect,
    createResource,
    createSignal,
    For,
    JSX,
    Show
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import {
    action,
    useSubmission
} from "@solidjs/router"
import { UsersService } from "../../services/UsersService"
import { RolesService } from "../../services/RolesService"
import { CreateUserRequestDTO } from "../../dto/users/CreateUserRequestDTO"
import {
    ErrorFullWidth,
    SuccessFullWidth
} from "../../components/alerts"
import {
    Input,
    PasswordInput,
    Checkbox
} from "../../components/inputs"
import { SecondaryButton } from "../../components/buttons"
import { RoleResponseDTO } from "../../dto/roles/RoleResponseDTO"

const usersService = new UsersService()
const rolesService = new RolesService()

const createUser = action(async (formData: FormData) => {
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

    if (!email || !password || !fullName) {
        return { error: "Todos los campos son requeridos" }
    }

    if (roleIds.length === 0) {
        return { error: "Debe seleccionar al menos un rol" }
    }

    const userData: CreateUserRequestDTO = {
        email,
        password,
        fullName,
        roleIds
    }

    try {
        const result = await usersService.createUser(userData)
        return result
    } catch (error) {
        return { error: "Error al crear el usuario: " + error.message }
    }
}, "createUser")

export function CreateUser(): JSX.Element {
    const submission = useSubmission(createUser)
    let formRef: HTMLFormElement = {} as HTMLFormElement
    
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

    createEffect(() => {
        if (submission.result && !submission.error) {
            formRef.reset()
        }
    })

    return (
        <Dashboard>
            <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-6">Crear Nuevo Usuario</h2>

                <Show when={submission.error}>
                    <ErrorFullWidth message={submission.error as string} />
                </Show>

                <Show when={submission.result && !submission.error}>
                    <SuccessFullWidth message="Usuario creado con éxito" />
                </Show>

                <form
                    ref={formRef}
                    action={createUser}
                    method="post"
                    class="mt-6"
                >
                    <div class="grid grid-cols-1 gap-6 mb-6">
                        <Input
                            id="email"
                            name="email"
                            label="Correo Electrónico"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                        
                        <PasswordInput
                            id="password"
                            name="password"
                            label="Contraseña"
                            placeholder="Ingresa una contraseña segura"
                            required
                        />
                        
                        <Input
                            id="fullName"
                            name="fullName"
                            label="Nombre Completo"
                            type="text"
                            placeholder="Ej: Juan Pérez"
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
                                                />
                                            </div>
                                        )}
                                    </For>
                                </Show>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end mt-6">
                        <SecondaryButton
                            type="submit"
                            disabled={submission.pending}
                        >
                            {submission.pending ? 'Guardando...' : 'Guardar Usuario'}
                        </SecondaryButton>
                    </div>
                </form>
            </section>
        </Dashboard>
    )
}