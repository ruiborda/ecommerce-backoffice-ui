import {
    createResource,
    createSignal,
    For,
    JSX,
    Match,
    Show,
    Switch,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import { RolesService } from "../../services/RolesService"
import { Table } from "../../components/table/Table"
import { Thead } from "../../components/table/Thead"
import { Tr } from "../../components/table/Tr"
import { Th } from "../../components/table/Th"
import { Tbody } from "../../components/table/Tbody"
import { Td } from "../../components/table/Td"
import {
    Pagination,
    PaginationParams
} from "../../dto/PaginationParams"
import { DangerButton, InfoButton, SuccessButton } from "../../components/buttons"
import { useNavigate } from "@solidjs/router"

export function Index(): JSX.Element {
    const [pagination, setPagination] = createSignal<Pagination>(new Pagination({
        page: 1,
        size: 10,
    } as PaginationParams))

    const rolesService = new RolesService()
    const [roles] = createResource(pagination, rolesService.pageRoles.bind(rolesService))
    const navigate = useNavigate()

    return (
        <Dashboard>
            <Show when={roles.loading}>
                <p>Loading...</p>
            </Show>
            <Switch>
                <Match when={roles.error}>
                    <span>Error: {roles.error}</span>
                </Match>
                <Match when={roles()}>
                    <section class="container px-4 mx-auto">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-lg font-medium text-gray-800 dark:text-white">Roles</h2>
                            <SuccessButton
                                onClick={() => navigate('/roles.create')}
                                class="flex items-center px-3 py-1.5"
                            >
                                Crear Rol
                            </SuccessButton>
                        </div>
                        
                        <Table 
                            paginationSignal={[pagination, setPagination]}
                            totalPages={roles()?.page?.totalPages}
                            pageInfo={roles()?.page}
                        >
                            <Thead>
                                <Tr>
                                    <Th scope="col">Código</Th>
                                    <Th scope="col">Permisos</Th>
                                    <Th scope="col">Acciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <For each={roles()?.data}>
                                    {(role) => (
                                        <Tr>
                                            <Td>{role.code}</Td>
                                            <Td>{role.permissions.length} permisos</Td>
                                            <Td>
                                                <div class="flex space-x-2">
                                                    <InfoButton
                                                        size="sm"
                                                        onClick={() => navigate(`/roles.edit/${role.id}`)}
                                                    >
                                                        Editar
                                                    </InfoButton>
                                                    <DangerButton
                                                        size="sm"
                                                        onClick={async () => {
                                                            if (confirm("¿Estás seguro de que deseas eliminar este rol?")) {
                                                                await rolesService.deleteRoleById(role.id)
                                                                setPagination(new Pagination({ 
                                                                    ...pagination(), 
                                                                    page: 1 
                                                                } as PaginationParams))
                                                            }
                                                        }}
                                                    >
                                                        Eliminar
                                                    </DangerButton>
                                                </div>
                                            </Td>
                                        </Tr>
                                    )}
                                </For>
                            </Tbody>
                        </Table>
                    </section>
                </Match>
            </Switch>
        </Dashboard>
    )
}