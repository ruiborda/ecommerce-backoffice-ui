import {
    createEffect,
    createSignal,
    JSX,
    Show,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import {
    action,
    useSubmission,
} from "@solidjs/router"
import { FilesService } from "../../services/FilesService"
import { UploadFileRequestDTO } from "../../dto/files/UploadFileRequestDTO"
import {
    fileToBase64,
    validateFileSize,
} from "../../utils/FileUtils"
const filesService = new FilesService()
const ALLOWED_FILE_TYPES_STRING = "image/*"
const ALLOWED_FILE_TYPES_DISPLAY = "Imágenes (JPG, PNG, GIF)"
const MAX_FILE_SIZE_MB = 5

const uploadFile = action(async (formData: FormData) => {
    const file = formData.get("file") as File
    const alternateText = formData.get("alternateText") as string

    const sizeValidation = validateFileSize(file, MAX_FILE_SIZE_MB)
    if (!sizeValidation.valid) {
        return {error: sizeValidation.message}
    }

    try {
        const base64String = await fileToBase64(file)
        const fileData: UploadFileRequestDTO = {
            alternateText, fileBase64: base64String.split(",")[1],
        }

        const success = await filesService.uploadFile(fileData)
        if (!success) {
            return {error: "Error al subir el archivo al servidor"}
        }
        return {success: true}
    } catch (error) {
        return {
            error: "Error procesando el archivo: " + (error instanceof Error ? error.message : "Error desconocido"),
        }
    }
}, "uploadFile")

export function UploadFiles(): JSX.Element {
    const submission = useSubmission(uploadFile)
    const [file, setFile] = createSignal<File | null>(null)

    const handleSuccess = () => {
        setFile(null)
        const altTextInput = document.getElementById("alternateText") as HTMLInputElement | null
        if (altTextInput) altTextInput.value = ""
        const fileInput = document.getElementById("file") as HTMLInputElement | null
        if (fileInput) fileInput.value = ""
    }

    createEffect(() => {
        if (submission.result?.success) {
            handleSuccess()
        }
    })

    return (<Dashboard>
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Subir Archivo</h2>

            <div class="mb-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Tipos de archivos permitidos: {ALLOWED_FILE_TYPES_DISPLAY}</p>
                <p>Tamaño máximo: {MAX_FILE_SIZE_MB} MB</p>
            </div>

            <form
                action={uploadFile}
                method="post"
                class="mt-6"
                enctype="multipart/form-data"
            >
                <div class="grid grid-cols-1 gap-6">
                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="file">Archivo</label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            onChange={(e) => setFile(e.currentTarget.files?.[0] || null)}
                            required
                            accept={ALLOWED_FILE_TYPES_STRING}
                        />
                    </div>

                    <div>
                        <label class="text-gray-700 dark:text-gray-200" for="alternateText">Texto
                            Alternativo</label>
                        <input
                            id="alternateText"
                            name="alternateText"
                            type="text"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            required
                        />
                    </div>
                </div>

                <div class="flex justify-end mt-6">
                    <button
                        type="submit"
                        disabled={submission.pending || !file()}
                        class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50"
                    >
                        {submission.pending ? "Subiendo..." : "Subir Archivo"}
                    </button>
                </div>

                <Show when={submission.result?.error}>
                    <div class="mt-4 p-4 text-red-700 bg-red-100 rounded-md">
                        {submission.result?.error}
                    </div>
                </Show>

                <Show when={submission.result?.success}>
                    <div class="mt-4 p-4 text-green-700 bg-green-100 rounded-md">
                        Archivo subido exitosamente.
                    </div>
                </Show>
            </form>
        </section>
    </Dashboard>)
}