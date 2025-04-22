import { GetAllNewsArticlesResponseDTO } from "../dto/news_article/GetAllNewsArticlesResponseDTO"
import { URLBuilder } from "../utils/UrlBuilder"
import { PaginationParams } from "../dto/PaginationParams"
import { PaginatedResponse } from "../dto/PaginatedResponse"
import { PageFilesResponse } from "../dto/files/PageFilesResponse"
import { UploadFileRequestDTO } from "../dto/files/UploadFileRequestDTO"
import { UpdateFileRequestDTO } from "../dto/files/UpdateFileRequestDTO"

export class FilesService {

    async pageFiles(page: PaginationParams): Promise<PaginatedResponse<PageFilesResponse>> {
        const url = new URLBuilder()
            .setPathname("/files/pages")
            .addSearchParams("page", page.page.toString())
            .addSearchParams("size", page.size.toString())
        if (page?.query) {
            url.addSearchParams("query", page.query)
        }
        console.log(url.build())
        const response = await fetch(url.build())
        return response.json()
    }

    async deleteFileById(id: string): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname(`/files/${id}`)
        const response = await fetch(url.build(), {
            method: "DELETE",
        })
        return response.ok
    }

    async uploadFile(fileData: UploadFileRequestDTO): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname("/files")
        const response = await fetch(url.build(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fileData)
        })
        return response.ok
    }

    async getFileById(id: string): Promise<PageFilesResponse> {
        const url = new URLBuilder()
            .setPathname(`/files/${id}`)
        const response = await fetch(url.build())
        return response.json()
    }

    async updateFile(fileData: UpdateFileRequestDTO): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname(`/files`)
        const response = await fetch(url.build(), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fileData)
        })
        return response.ok
    }
}