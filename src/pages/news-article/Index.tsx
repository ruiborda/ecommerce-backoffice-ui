import {
    createResource,
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
import { ArrowRightAlt } from "../../assets/material_icons/ArrowRightAlt"
import { ArrowLeftAlt } from "../../assets/material_icons/ArrowLeftAlt"

export function Index(): JSX.Element {
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
                    <div class="flex flex-col mt-6">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div
                                    class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <Table>
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

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-6">
                        <a href="#"
                           class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <ArrowLeftAlt class={"w-5 h-5"}/>
                            <span>
                                Anterior
                            </span>
                        </a>

                        <a href="#"
                           class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                <span>
                                    Siguiente
                                </span>

                            <ArrowRightAlt class={"w-5 h-5"}/>
                        </a>
                    </div>
                </section>
            </Match>
        </Switch>
    </Dashboard>)
}