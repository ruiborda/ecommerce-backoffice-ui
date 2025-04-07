import { JSX } from "solid-js"
import { School } from "../assets/material_icons/School"
import { Google } from "../assets/svgl_icons/Google"
import { Facebook } from "../assets/svgl_icons/Facebook"
import { A } from "@solidjs/router"

export function Index(): JSX.Element {
    return (
        <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-neutral-200">

            <div class="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
                <div class="mb-6 flex justify-center">
                    <School class={"h-12 w-12"}/>
                </div>


                <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900 mb-8">
                    Iniciar sesión
                </h2>

                <form class="space-y-6" action="#" method={"post"}>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                            Dirección de correo electrónico
                        </label>
                        <input id="email" name="email" type="email" autocomplete="email" required
                               class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                    </div>


                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                               class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"/>
                    </div>


                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox"
                                   class="h-4 w-4 text-gray-800 focus:ring-gray-500 border-gray-300 rounded"/>
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                Recordarme {/* Changed text */}
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-gray-700 hover:text-gray-900">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>

                    <div>
                        <A
                            href="/news-article"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            Iniciar sesión
                        </A>
                    </div>
                </form>


                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                    O continuar con
                </span>
                    </div>
                </div>


                {/* Kept standard white social buttons */}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <a href="/news-article"
                           class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">Iniciar sesión con Google</span>
                            <Google class={"w-5 h-5 mr-2"}/>
                            Google
                        </a>
                    </div>


                    <div>
                        <a href="#"
                           class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span class="sr-only">Iniciar sesión con GitHub</span>
                            <Facebook class={"w-5 h-5 mr-2"}/>
                            Facebook
                        </a>
                    </div>
                </div>

            </div>

        </div>
    )
}