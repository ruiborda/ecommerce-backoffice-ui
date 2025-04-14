import { JSX } from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import { Table } from "../../components/table/Table"
import { Thead } from "../../components/table/Thead"
import { Tr } from "../../components/table/Tr"
import { Th } from "../../components/table/Th"
import { Tbody } from "../../components/table/Tbody"
import { Td } from "../../components/table/Td"

export function Index(): JSX.Element {
    return (
        <Dashboard>
            <section class="container px-4 mx-auto">
                <h2 class="text-lg font-medium text-gray-800 dark:text-white">Customers</h2>

                <div class="flex flex-col mt-6">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th scope="col">
                                                Company
                                            </Th>
                                            <Th scope="col">
                                                About
                                            </Th>
                                            <Th scope="col">
                                                Users
                                            </Th>
                                            <Th scope="col">
                                                use
                                            </Th>
                                            <Th scope="col" class="relative py-3.5 px-4">
                                                <span class="sr-only">Edit</span>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>
                                                catalog
                                            </Td>
                                            <Td>
                                                catalog
                                            </Td>
                                            <Td>
                                                catalog
                                            </Td>
                                            <Td>
                                                catalog
                                            </Td>
                                            <Td>
                                                catalog
                                            </Td>
                                        </Tr>
                                    </Tbody>
                                </Table>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-6">
                    <a href="#"
                       class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                        </svg>

                        <span>
                previous
            </span>
                    </a>

                    <div class="items-center hidden md:flex gap-x-3">
                        <a href="#"
                           class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#"
                           class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#"
                           class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#"
                           class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#"
                           class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#"
                           class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#"
                           class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#"
                       class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
                Next
            </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                        </svg>
                    </a>
                </div>
            </section>
        </Dashboard>
    )
}