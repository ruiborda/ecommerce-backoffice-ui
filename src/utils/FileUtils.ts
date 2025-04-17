/**
 * Convert a File object to a base64 string
 * @param file - The file to convert
 * @returns A Promise that resolves with the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}


/**
 * Validate if a file's size is within the allowed limit
 * @param file - The file to check
 * @param maxSizeInMB - Maximum allowed size in MB
 * @returns An object with validation result and error message
 */
export const validateFileSize = (file: File, maxSizeInMB: number = 5): { valid: boolean; message?: string } => {
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSizeInMB) {
        return {
            valid: false, message: `El archivo es demasiado grande. Tamaño máximo permitido: ${maxSizeInMB} MB`,
        }
    }
    return {valid: true}
}
