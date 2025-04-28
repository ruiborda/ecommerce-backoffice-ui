import { URLBuilder } from "../utils/UrlBuilder"
import { PaginationParams } from "../dto/PaginationParams"
import { PaginatedResponse } from "../dto/PaginatedResponse"
import { UserResponseDTO } from "../dto/users/UserResponseDTO"
import { CreateUserRequestDTO } from "../dto/users/CreateUserRequestDTO"
import { UpdateUserRequestDTO } from "../dto/users/UpdateUserRequestDTO"
import { Login } from "../utils/Login"
import { HeaderBuilder } from "../utils/HeaderBuilder"

export class UsersService {

    async getUserById(id: string): Promise<UserResponseDTO> {
        const url = new URLBuilder()
            .setPathname(`/users/${id}`)
        const response = await fetch(url.build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
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
        const response = await fetch(url.build(), {
            method: "GET",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }

    async createUser(userData: CreateUserRequestDTO): Promise<UserResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/users")
        const response = await fetch(url.build(), {
            method: "POST",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
            body: JSON.stringify(userData),
        })
        return response.json()
    }

    async updateUser(userData: UpdateUserRequestDTO): Promise<UserResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/users")
        const response = await fetch(url.build(), {
            method: "PUT",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
            body: JSON.stringify(userData),
        })
        return response.json()
    }

    async deleteUserById(id: string): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname(`/users/${id}`)
        const response = await fetch(url.build(), {
            method: "DELETE",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.ok
    }
}