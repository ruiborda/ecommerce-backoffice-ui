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
import { NewsArticleService } from "../../services/NewsArticle"
import { Table } from "../../components/table/Table"
import { Thead } from "../../components/table/Thead"
import { Tr } from "../../components/table/Tr"
import { Th } from "../../components/table/Th"
import { Tbody } from "../../components/table/Tbody"
import { Td } from "../../components/table/Td"
import { Pagination } from "../../dto/Pagination"

export function Index(): JSX.Element {
    const [pagination, setPagination] = createSignal<Pagination>({
        page: 1, size: 10
    })
    const newsArticlesService = new NewsArticleService()
    const [newsArticles] = createResource(() => newsArticlesService.getAllNewsArticles())
    console.log(newsArticles())
    return (<Dashboard>
        <Show when={newsArticles.loading}>
            <p>Loading...</p>
        </Show>
        <Switch>
            <Match when={newsArticles.error}>
                <span>Error: {newsArticles.error}</span>
            </Match>
            <Match when={newsArticles()}>
                <section class="container px-4 mx-auto">
                    <h2 class="text-lg font-medium text-gray-800 dark:text-white">Customers</h2>
                    <Table paginationSignal={[pagination, setPagination]}>
                        <Thead>
                            <Tr>
                                <Th scope="col">
                                    Titulo
                                </Th>
                                <Th scope="col">
                                    Fecha de Publicacion
                                </Th>
                                <Th scope="col">
                                    Fecha de Actualizacion
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <For each={newsArticles()}>
                                {(newsArticle) => (<Tr>
                                    <Td class={"w-100"}>
                                        {newsArticle.headline}
                                    </Td>
                                    <Td class={"w-30"}>
                                        {newsArticle.datePublished}
                                    </Td>
                                    <Td class={"w-30"}>
                                        {newsArticle.dateModified}
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