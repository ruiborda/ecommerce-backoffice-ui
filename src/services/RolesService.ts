import { URLBuilder } from "../utils/UrlBuilder";
import { PaginationParams } from "../dto/PaginationParams";
import { PaginatedResponse } from "../dto/PaginatedResponse";
import { RoleResponseDTO } from "../dto/roles/RoleResponseDTO";
import { CreateRoleRequestDTO } from "../dto/roles/CreateRoleRequestDTO";
import { UpdateRoleRequestDTO } from "../dto/roles/UpdateRoleRequestDTO";

export class RolesService {
    
    async getRoleById(id: string): Promise<RoleResponseDTO> {
        const url = new URLBuilder()
            .setPathname(`/roles/${id}`)
        const response = await fetch(url.build())
        return response.json()
    }

    async pageRoles(page: PaginationParams): Promise<PaginatedResponse<RoleResponseDTO>> {
        const url = new URLBuilder()
            .setPathname("/roles/pages")
            .addSearchParams("page", page.page.toString())
            .addSearchParams("size", page.size.toString())
        if (page?.query) {
            url.addSearchParams("query", page.query)
        }
        const response = await fetch(url.build())
        return response.json()
    }

    async createRole(roleData: CreateRoleRequestDTO): Promise<RoleResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/roles")
        const response = await fetch(url.build(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roleData)
        })
        return response.json()
    }

    async updateRole(roleData: UpdateRoleRequestDTO): Promise<RoleResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/roles")
        const response = await fetch(url.build(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(roleData)
        })
        return response.json()
    }

    async deleteRoleById(id: string): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname(`/roles/${id}`)
        const response = await fetch(url.build(), {
            method: "DELETE",
        })
        return response.ok
    }
}