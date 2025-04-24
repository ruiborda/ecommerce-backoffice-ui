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
import { UsersService } from "../../services/UsersService"
import {
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "../../components/table"
import {
    Pagination,
    PaginationParams,
} from "../../dto/PaginationParams"
import {
    DangerButton,
    InfoButton,
    SuccessButton,
} from "../../components/buttons"
import { useNavigate } from "@solidjs/router"

export function ListUsers(): JSX.Element {
    const [pagination, setPagination] = createSignal<Pagination>(new Pagination({
        page: 1, size: 10,
    } as PaginationParams))

    const usersService = new UsersService()
    const [users] = createResource(pagination, usersService.pageUsers.bind(usersService))
    const navigate = useNavigate()

    return (<Dashboard>
            <Show when={users.loading}>
                <p>Loading...</p>
            </Show>
            <Switch>
                <Match when={users.error}>
                    <span>Error: {users.error}</span>
                </Match>
                <Match when={users()}>
                    <section class="container px-4 mx-auto">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-lg font-medium text-gray-800 dark:text-white">Usuarios</h2>
                            <SuccessButton
                                onClick={() => navigate("/users.create")}
                                class="flex items-center px-3 py-1.5"
                            >
                                Crear Usuario
                            </SuccessButton>
                        </div>
                        <Table
                            paginationSignal={[pagination, setPagination]}
                            totalPages={users()?.page?.totalPages}
                            pageInfo={users()?.page}
                        >
                            <Thead>
                                <Tr>
                                    <Th scope="col">Email</Th>
                                    <Th scope="col">Nombre Completo</Th>
                                    <Th scope="col">Roles</Th>
                                    <Th scope="col">Creado</Th>
                                    <Th scope="col">Actualizado</Th>
                                    <Th scope="col">Acciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <For each={users()?.data}>
                                    {(user) => (<Tr>
                                            <Td>{user.email}</Td>
                                            <Td>{user.fullName}</Td>
                                            <Td>
                                                <For each={user.roles || []}>
                                                    {(role) => (<span
                                                            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mr-1">
                                                            {role.code}
                                                        </span>)}
                                                </For>
                                            </Td>
                                            <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                                            <Td>{new Date(user.updatedAt).toLocaleDateString()}</Td>
                                            <Td>
                                                <div class="flex space-x-2">
                                                    <InfoButton
                                                        size="sm"
                                                        onClick={() => navigate(`/users.edit/${user.id}`)}
                                                    >
                                                        Editar
                                                    </InfoButton>
                                                    <DangerButton
                                                        size="sm"
                                                        onClick={async () => {
                                                            if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.email}?`)) {
                                                                await usersService.deleteUserById(user.id)
                                                                setPagination(new Pagination({
                                                                    ...pagination(), page: 1,
                                                                } as PaginationParams))
                                                            }
                                                        }}
                                                    >
                                                        Eliminar
                                                    </DangerButton>
                                                </div>
                                            </Td>
                                        </Tr>)}
                                </For>
                            </Tbody>
                        </Table>
                    </section>
                </Match>
            </Switch>
        </Dashboard>)
}