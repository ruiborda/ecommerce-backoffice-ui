import { URLBuilder } from "../utils/UrlBuilder";
import { GetAllPermissionsResponseDTO } from "../dto/permissions/GetAllPermissionsResponseDTO";
import { HeaderBuilder } from "../utils/HeaderBuilder";

export class PermissionsService {
    async getAllPermissions(): Promise<GetAllPermissionsResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/permissions")
        const response = await fetch(url.build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }
}