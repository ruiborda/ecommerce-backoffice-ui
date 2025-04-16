import { GetAllNewsArticlesResponseDTO } from "../dto/news_article/GetAllNewsArticlesResponseDTO"
import { URLBuilder } from "../utils/UrlBuilder"
import { Pagination } from "../dto/Pagination"
import { PaginatedResponse } from "../dto/PaginatedResponse"
import { PageFilesResponse } from "../dto/files/PageFilesResponse"

export class FilesService {

    async pageFiles(page: Pagination): Promise<PaginatedResponse<PageFilesResponse>> {
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
}