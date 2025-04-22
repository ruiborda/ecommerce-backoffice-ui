import {
    createEffect,
    createResource,
    createSignal,
    JSX,
    Show,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import {
    action,
    useParams,
    useSubmission,
} from "@solidjs/router"
import { FilesService } from "../../services/FilesService"
import {
    fileToBase64,
    validateFileSize,
} from "../../utils/FileUtils"
import {
    DropzoneImageInput,
    Input,
} from "../../components/inputs"
import {
    ErrorFullWidth,
    SuccessFullWidth,
} from "../../components/alerts"
import { SecondaryButton } from "../../components/buttons"
import { UpdateFileRequestDTO } from "../../dto/files/UpdateFileRequestDTO"

const filesService = new FilesService()
const ALLOWED_FILE_TYPES_STRING = "image/*"
const ALLOWED_FILE_TYPES_DISPLAY = "Imágenes (JPG, PNG, GIF)"
const MAX_FILE_SIZE_MB = 5

const updateFile = action(async (formData: FormData) => {
    const id = formData.get("id") as string
    const file = formData.get("file") as File
    const alternateText = formData.get("alternateText") as string

    const sizeValidation = validateFileSize(file, MAX_FILE_SIZE_MB)
    if (!sizeValidation.valid) {
        return {error: sizeValidation.message}
    }

    const base64String = await fileToBase64(file)
    const fileData: UpdateFileRequestDTO = {
        id, alternateText, fileBase64: base64String.split(",")[1],
    }

    return await filesService.updateFile(fileData)
})

export function EditFiles(): JSX.Element {
    const submission = useSubmission(updateFile)
    const params = useParams()

    const [fileData] = createResource(params.id, filesService.getFileById)

    return (<Dashboard>
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Actualizar Archivo</h2>

            <div class="mb-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Tipos de archivos permitidos: {ALLOWED_FILE_TYPES_DISPLAY}</p>
                <p>Tamaño máximo: {MAX_FILE_SIZE_MB} MB</p>
                <p>Solo suba un nuevo archivo si desea reemplazar el actual. Si deja el campo de archivo vacío, se
                    mantendrá el archivo original.</p>
            </div>

            <Show when={fileData.loading}>
                <p class="text-center">Cargando información del archivo...</p>
            </Show>

            <Show when={fileData.error}>
                <ErrorFullWidth message={"Error al cargar el archivo: " + fileData.error}/>
            </Show>
            <form
                action={updateFile}
                method={"post"}
                enctype="multipart/form-data"
                class="mt-6"
            >
                <input hidden={true} name="id" value={fileData()?.id}/>
                <div class="grid grid-cols-1 gap-6">
                    <div class="mb-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Archivo actual:</p>
                        <img
                            src={`${import.meta.env.VITE_R2_PUBLIC_URL}/${fileData()?.fileName}`}
                            alt={fileData()?.alternateText || ""}
                            class="h-40 w-auto object-contain rounded border border-gray-200"
                        />
                        <p class="text-xs text-gray-500 mt-1">Nombre: {fileData()?.fileName}</p>
                    </div>

                    <DropzoneImageInput
                        id="file"
                        name="file"
                        label="Reemplazar Imagen (opcional)"
                        title="Imágenes"
                        description={`Sube o arrastra una nueva imagen (${ALLOWED_FILE_TYPES_DISPLAY}) si deseas reemplazar la actual. Tamaño máximo: ${MAX_FILE_SIZE_MB} MB.`}
                        accept={ALLOWED_FILE_TYPES_STRING}
                        required={false}
                    />

                    <Input
                        id="alternateText"
                        name="alternateText"
                        label="Texto Alternativo"
                        type="text"
                        value={fileData()?.alternateText}
                        required
                    />
                </div>

                <div class="flex justify-end my-6">
                    <SecondaryButton
                        type="submit"
                        class="bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={submission.pending}
                    >
                        {submission.pending}
                        {submission.pending ? "Subiendo..." : "Actualizar Archivo"}
                    </SecondaryButton>
                </div>
                <Show when={submission.error}>
                    <ErrorFullWidth message={"Error: " + submission.error}/>
                </Show>

                <Show when={submission.result}>
                    <SuccessFullWidth message="Archivo actualizado exitosamente."/>
                </Show>
            </form>
        </section>
    </Dashboard>)
}