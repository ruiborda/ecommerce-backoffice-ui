import { GetAllNewsArticlesResponseDTO } from "../dto/news_article/GetAllNewsArticlesResponseDTO"
import { URLBuilder } from "../utils/UrlBuilder"

export class NewsArticleService {

    async getAllNewsArticles(): Promise<GetAllNewsArticlesResponseDTO[]> {
        const response = await fetch(new URLBuilder().setPathname("/news-articles").build())
        return response.json()
    }
}