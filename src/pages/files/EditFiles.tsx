import {
    createEffect,
    createSignal,
    JSX,
    Show,
    createResource,
} from "solid-js"
import { Dashboard } from "../../components/Dashboard"
import {
    useParams,
    useNavigate,
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

export function EditFiles(): JSX.Element {
    const params = useParams()
    const navigate = useNavigate()
    const [formError, setFormError] = createSignal<string | null>(null)
    const [formSuccess, setFormSuccess] = createSignal(false)
    
    const [alternateText, setAlternateText] = createSignal("")
    
    // Fetch file data
    const [fileData, { refetch }] = createResource(() => params.id, 
        async (id) => {
            try {
                return await filesService.getFileById(id)
            } catch (error) {
                console.error("Error loading file:", error)
                return null
            }
        }
    )
    
    createEffect(() => {
        const data = fileData()
        if (data && data.alternateText) {
            setAlternateText(data.alternateText)
        }
    })

    const publicUrl = import.meta.env.VITE_R2_PUBLIC_URL

    // Handle form submission
    const handleSubmit = async (event: Event) => {
        event.preventDefault()
        setFormError(null)
        setFormSuccess(false)
        
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        
        try {
            const id = params.id
            const file = formData.get("file") as File
            const alternateText = formData.get("alternateText") as string

            // Crear un objeto para la actualización
            const fileData: UploadFileRequestDTO = {
                id: id,
                alternateText,
                fileBase64: ""
            }

            // Verificar si se seleccionó un nuevo archivo
            if (file && file.size > 0) {
                const sizeValidation = validateFileSize(file, MAX_FILE_SIZE_MB)
                if (!sizeValidation.valid) {
                    setFormError(sizeValidation.message || "Error validating file size")
                    return
                }

                const base64String = await fileToBase64(file)
                fileData.fileBase64 = base64String.split(",")[1]
            }

            await filesService.updateFile(id, fileData)
            setFormSuccess(true)
            // Wait a bit to refresh the data
            setTimeout(() => {
                refetch()
            }, 1000)
        } catch (error) {
            setFormError(error instanceof Error ? error.message : "Unknown error")
        }
    }

    return (<Dashboard>
        <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Actualizar Archivo</h2>

            <div class="mb-4 text-sm text-gray-600 dark:text-gray-300">
                <p>Tipos de archivos permitidos: {ALLOWED_FILE_TYPES_DISPLAY}</p>
                <p>Tamaño máximo: {MAX_FILE_SIZE_MB} MB</p>
                <p>Solo suba un nuevo archivo si desea reemplazar el actual. Si deja el campo de archivo vacío, se mantendrá el archivo original.</p>
            </div>

            <Show when={fileData.loading}>
                <p class="text-center">Cargando información del archivo...</p>
            </Show>

            <Show when={fileData.error}>
                <ErrorFullWidth message={"Error al cargar el archivo: " + fileData.error} />
            </Show>

            <Show when={!fileData.loading && fileData()}>
                <form 
                    onSubmit={handleSubmit}
                    enctype="multipart/form-data" 
                    class="mt-6"
                >
                    <div class="grid grid-cols-1 gap-6">
                        <div class="mb-4">
                            <p class="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Archivo actual:</p>
                            <img
                                src={`${publicUrl}/${fileData()?.fileName}`}
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
                            value={alternateText()}
                            required
                        />
                    </div>

                    <div class="flex justify-end my-6">
                        <SecondaryButton
                            type="submit"
                            class="bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 disabled:opacity-50"
                        >
                            Actualizar Archivo
                        </SecondaryButton>
                    </div>

                    <Show when={formError()}>
                        <ErrorFullWidth message={formError() || ""} />
                    </Show>

                    <Show when={formSuccess()}>
                        <SuccessFullWidth message="Archivo actualizado exitosamente." />
                    </Show>
                </form>
            </Show>
        </section>
    </Dashboard>)
}