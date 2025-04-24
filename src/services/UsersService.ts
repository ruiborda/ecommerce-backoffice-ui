import { URLBuilder } from "../utils/UrlBuilder";
import { PaginationParams } from "../dto/PaginationParams";
import { PaginatedResponse } from "../dto/PaginatedResponse";
import { UserResponseDTO } from "../dto/users/UserResponseDTO";
import { CreateUserRequestDTO } from "../dto/users/CreateUserRequestDTO";
import { UpdateUserRequestDTO } from "../dto/users/UpdateUserRequestDTO";

export class UsersService {
    
    async getUserById(id: string): Promise<UserResponseDTO> {
        const url = new URLBuilder()
            .setPathname(`/users/${id}`)
        const response = await fetch(url.build())
        return response.json()
    }

    async pageUsers(page: PaginationParams): Promise<PaginatedResponse<UserResponseDTO>> {
        const url = new URLBuilder()
            .setPathname("/users/pages")
            .addSearchParams("page", page.page.toString())
            .addSearchParams("size", page.size.toString())
        if (page?.query) {
            url.addSearchParams("query", page.query)
        }
        const response = await fetch(url.build())
        return response.json()
    }

    async createUser(userData: CreateUserRequestDTO): Promise<UserResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/users")
        const response = await fetch(url.build(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        return response.json()
    }

    async updateUser(userData: UpdateUserRequestDTO): Promise<UserResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/users")
        const response = await fetch(url.build(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        return response.json()
    }

    async deleteUserById(id: string): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname(`/users/${id}`)
        const response = await fetch(url.build(), {
            method: "DELETE",
        })
        return response.ok
    }
}