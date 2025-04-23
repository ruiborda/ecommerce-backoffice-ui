import { URLBuilder } from "../utils/UrlBuilder";
import { GetAllPermissionsResponseDTO } from "../dto/permissions/GetAllPermissionsResponseDTO";

export class PermissionsService {
    async getAllPermissions(): Promise<GetAllPermissionsResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/permissions")
        const response = await fetch(url.build())
        return response.json()
    }
}