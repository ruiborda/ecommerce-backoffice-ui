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
import {
    DropzoneImageInput,
    Input,
} from "../../components/inputs"
import {
    ErrorFullWidth,
    SuccessFullWidth,
} from "../../components/alerts"
import { SecondaryButton } from "../../components/buttons"

const filesService = new FilesService()
const ALLOWED_FILE_TYPES_STRING = "image/*"
const ALLOWED_FILE_TYPES_DISPLAY = "Imágenes (JPG, PNG, GIF)"
const MAX_FILE_SIZE_MB = 5

const uploadFile = action(async (formData: FormData) => {
    const file = formData.get("file") as File
    const alternateText = formData.get("alternateText") as string

    if (!file || file.size === 0) {
        return {error: "Debe seleccionar un archivo"}
    }

    const sizeValidation = validateFileSize(file, MAX_FILE_SIZE_MB)
    if (!sizeValidation.valid) {
        return {error: sizeValidation.message}
    }

    const base64String = await fileToBase64(file)
    const fileData: UploadFileRequestDTO = {
        alternateText,
        fileBase64: base64String.split(",")[1],
    }

    return await filesService.uploadFile(fileData)
}, "uploadFile")

export function UploadFiles(): JSX.Element {
    const submission = useSubmission(uploadFile)
    let formRef: HTMLFormElement = {} as HTMLFormElement
    createEffect(() => {
        if (submission.result) {
            formRef.reset()
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
                ref={formRef}
                action={uploadFile}
                method="post"
                class="mt-6"
                enctype="multipart/form-data"
            >
                <div class="grid grid-cols-1 gap-6">
                    <DropzoneImageInput
                        id="file"
                        name="file"
                        label="Imagen"
                        title="Imágenes"
                        description={`Sube o arrastra una imagen (${ALLOWED_FILE_TYPES_DISPLAY}). Tamaño máximo: ${MAX_FILE_SIZE_MB} MB.`}
                        required
                        accept={ALLOWED_FILE_TYPES_STRING}
                    />

                    <Input
                        id="alternateText"
                        name="alternateText"
                        label="Texto Alternativo"
                        type="text"
                        required
                    />
                </div>

                <div class="flex justify-end my-6">
                    <SecondaryButton
                        type="submit"
                        disabled={submission.pending}
                        class="bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 disabled:opacity-50"
                    >
                        {submission.pending}
                        {submission.pending ? "Subiendo..." : "Subir Archivo"}
                    </SecondaryButton>
                </div>

                <Show when={submission.error}>
                    <ErrorFullWidth message={"Error: " + submission.error}/>
                </Show>

                <Show when={submission.result}>
                    <SuccessFullWidth message="Archivo subido exitosamente."/>
                </Show>
            </form>
        </section>
    </Dashboard>)
}