import {
    JSX,
    onMount,
} from "solid-js"
import { School } from "../assets/material_icons/School"
import { Google } from "../assets/svgl_icons/Google"
import { Facebook } from "../assets/svgl_icons/Facebook"
import {
    Button,
    OutlineButton,
} from "../components/buttons"
import { Checkbox } from "../components/inputs"
import { AuthService } from "../services/AuthService"

export function LoginWithGoogleCallback(): JSX.Element {

    onMount(() => {
        const currentUrl = new URL(window.location.href)
        const params = new URLSearchParams(currentUrl.hash.slice(1))
        const stored = localStorage.getItem("oauth2-state")

        if (params.get("state") !== stored) {
            console.error("State mismatch: posible CSRF")
            return
        }
        const accessToken = params.get("access_token")
        console.log("accessToken", accessToken)

        if (!accessToken) {
            console.error("No access token found")
            return
        }

        new AuthService().loginWithGoogle({
            accessToken: accessToken,
        }).then((response) => {
            if (response) {
                window.location.href = "/users"
            } else {
                console.error("Error logging in")
            }
        }).catch((error) => {
            console.error("Error logging in", error)
        })

    })

    return (<div
        class="min-h-screen flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-neutral-200 w-full">

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
                        <Checkbox id="remember-me" name="remember-me"/>
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                            Recordarme
                        </label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-gray-700 hover:text-gray-900">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </div>

                <div>
                    <Button
                        fullWidth
                        class="bg-gray-800 hover:bg-gray-700 focus:ring-gray-500">
                        Iniciar sesión
                    </Button>
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

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <OutlineButton
                        fullWidth
                        class="inline-flex justify-center">
                        <span class="sr-only">Iniciar sesión con Google</span>
                        <Google class={"w-5 h-5 mr-2"}/>
                        Google
                    </OutlineButton>
                </div>

                <div>
                    <OutlineButton
                        fullWidth
                        class="inline-flex justify-center">
                        <span class="sr-only">Iniciar sesión con GitHub</span>
                        <Facebook class={"w-5 h-5 mr-2"}/>
                        Facebook
                    </OutlineButton>
                </div>
            </div>
        </div>
    </div>)
}