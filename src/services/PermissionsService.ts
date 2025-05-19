import { URLBuilder } from "../utils/UrlBuilder";
import { GetAllPermissionsResponseDTO } from "../dto/permissions/GetAllPermissionsResponseDTO";
import { HeaderBuilder } from "../utils/HeaderBuilder";

export class PermissionsService {
    async getAllPermissions(): Promise<GetAllPermissionsResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/api/v1/permissions")
        const response = await fetch(url.build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }
    
    async getPermissionById(id: number): Promise<any> {
        const url = new URLBuilder()
            .setPathname(`/api/v1/permissions/${id}`)
        const response = await fetch(url.build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }
    
    async getPermissionsByIds(ids: number[]): Promise<any[]> {
        const url = new URLBuilder()
            .setPathname("/api/v1/permissions/by-ids")
        const response = await fetch(url.build(), {
            method: "POST",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
            body: JSON.stringify({ ids }),
        })
        return response.json()
    }
}