import {
    createEffect,
    createResource,
    For,
    JSX,
    Match,
    Show,
    Switch,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import { NewsArticleService } from "../../services/NewsArticle"

export function Index(): JSX.Element {
    const newsArticlesService = new NewsArticleService()
    const [newsArticles] = createResource(() => newsArticlesService.getAllNewsArticles())
    console.log(newsArticles())
    return (
        <Dashboard>
            <Show when={newsArticles.loading}>
                <p>Loading...</p>
            </Show>
            <Switch>
                <Match when={newsArticles.error}>
                    <span>Error: {newsArticles.error}</span>
                </Match>
                <Match when={newsArticles()}>
                    <div
                        class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                        <div
                            class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
                            <h5
                                class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                Lista de News Articles
                            </h5>
                        </div>
                        <div class="p-6 px-0 overflow-scroll">
                            <table class="w-full mt-4 text-left table-auto min-w-max">
                                <thead>
                                <tr>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Title
                                        </p>
                                    </th>
                                    <th class="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                            Fecha
                                        </p>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <For each={newsArticles()}>
                                    {(newsArticle) => (
                                        <tr>
                                            <td class="p-4 border-b border-gray-200">
                                                {newsArticle.headline}
                                            </td>
                                            <td class="p-4 border-b border-gray-200">
                                                {newsArticle.datePublished}
                                            </td>
                                        </tr>
                                    )}
                                </For>
                                </tbody>
                            </table>
                        </div>
                        <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                Page 1 of 10
                            </p>
                            <div class="flex gap-2">
                                <button
                                    class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Previous
                                </button>
                                <button
                                    class="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/*<div>{JSON.stringify(newsArticles()?.map(newsArticle=>newsArticle.author))}</div>*/}
                </Match>
            </Switch>
        </Dashboard>
    )
}