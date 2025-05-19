import { URLBuilder } from "../utils/UrlBuilder"
import { HeaderBuilder } from "../utils/HeaderBuilder"
import { PaginationParams } from "../dto/PaginationParams"
import { PaginatedResponse } from "../dto/PaginatedResponse"
import { GetAllNewsArticlesResponseDTO } from "../dto/news_article/GetAllNewsArticlesResponseDTO"

export class NewsArticleService {
    async getAllNewsArticles(page: PaginationParams): Promise<PaginatedResponse<GetAllNewsArticlesResponseDTO>> {
        const url = new URLBuilder()
            .setPathname("/api/v1/news-articles")
            .addSearchParams("page", page.page.toString())
            .addSearchParams("size", page.size.toString())

        const response = await fetch(url.build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }

    async getNewsArticleById(id: string): Promise<GetAllNewsArticlesResponseDTO> {
        const url = new URLBuilder()
            .setPathname(`/api/v1/news-articles/${id}`)

        const response = await fetch(url.build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }

    async createNewsArticle(newsArticleData: any): Promise<GetAllNewsArticlesResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/api/v1/news-articles")

        const response = await fetch(url.build(), {
            method: "POST",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
            body: JSON.stringify(newsArticleData),
        })
        return response.json()
    }

    async updateNewsArticle(newsArticleData: any): Promise<GetAllNewsArticlesResponseDTO> {
        const url = new URLBuilder()
            .setPathname("/api/v1/news-articles")

        const response = await fetch(url.build(), {
            method: "PUT",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
            body: JSON.stringify(newsArticleData),
        })
        return response.json()
    }

    async deleteNewsArticleById(id: string): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname(`/api/v1/news-articles/${id}`)

        const response = await fetch(url.build(), {
            method: "DELETE",
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.ok
    }
}