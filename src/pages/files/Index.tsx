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
import { FilesService } from "../../services/FilesService"
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
import { DangerButton, InfoButton } from "../../components/buttons"
import { useNavigate } from "@solidjs/router"

export function Index(): JSX.Element {
    const [pagination, setPagination] = createSignal<Pagination>(new Pagination({
        page: 1,
        size: 10,
    } as PaginationParams))

    const filesService = new FilesService()
    const [files] = createResource(pagination, filesService.pageFiles)
    const navigate = useNavigate()

    const publicUrl = import.meta.env.VITE_R2_PUBLIC_URL

    return (
        <Dashboard>
            <Show when={files.loading}>
                <p>Loading...</p>
            </Show>
            <Switch>
                <Match when={files.error}>
                    <span>Error: {files.error}</span>
                </Match>
                <Match when={files()}>
                    <section class="container px-4 mx-auto">
                        <h2 class="text-lg font-medium text-gray-800 dark:text-white">Archivos</h2>
                        <Table 
                            paginationSignal={[pagination, setPagination]}
                            totalPages={files()?.page?.totalPages}
                            pageInfo={files()?.page}
                        >
                            <Thead>
                                <Tr>
                                    <Th scope="col">Imagen</Th>
                                    <Th scope="col">Nombre</Th>
                                    <Th scope="col">Tamaño</Th>
                                    <Th scope="col">Tipo</Th>
                                    <Th scope="col">Texto Alternativo</Th>
                                    <Th scope="col">Fecha de Subida</Th>
                                    <Th scope="col">Subido Por</Th>
                                    <Th scope="col">Acciones</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <For each={files()?.data}>
                                    {(file) => (
                                        <Tr>
                                            <Td>
                                                <img
                                                    src={`${publicUrl}/${file.fileName}`}
                                                    alt={file.alternateText}
                                                    class="h-16 w-16 object-cover rounded"
                                                />
                                            </Td>
                                            <Td>{file.fileName}</Td>
                                            <Td>{(file.fileSize / 1024).toFixed(2)} KB</Td>
                                            <Td>{file.fileType}</Td>
                                            <Td>{file.alternateText}</Td>
                                            <Td>{new Date(file.uploadedAt).toLocaleDateString()}</Td>
                                            <Td>{file.uploadedBy}</Td>
                                            <Td>
                                                <div class="flex space-x-2">
                                                    <InfoButton
                                                        size="sm"
                                                        onClick={() => navigate(`/files.edit/${file.id}`)}
                                                    >
                                                        Modificar
                                                    </InfoButton>
                                                    <DangerButton
                                                        size="sm"
                                                        onClick={async () => {
                                                            if (confirm("¿Estás seguro de que deseas eliminar este archivo?")) {
                                                                await filesService.deleteFileById(file.id)
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
