import { GetAllNewsArticlesResponseDTO } from "../dto/news_article/GetAllNewsArticlesResponseDTO"
import { URLBuilder } from "../utils/UrlBuilder"
import { HeaderBuilder } from "../utils/HeaderBuilder"

export class NewsArticleService {

    async getAllNewsArticles(): Promise<GetAllNewsArticlesResponseDTO[]> {
        const response = await fetch(new URLBuilder().setPathname("/news-articles").build(), {
            headers: new HeaderBuilder().contentTypeJson().addAuthorization().build(),
        })
        return response.json()
    }
}