export interface GetAllNewsArticlesResponseDTO {
    id: string;
    context: string;
    type: string;
    url: string;
    headline: string;
    articleBody: string;
    articleSection: string;
    image: string[];
    datePublished: string;
    dateModified: string;
    author?: {
        type: string;
        name: string;
        url: string;
        logo: string;
    }[];
    publisher?: {
        type: string;
        name: string;
        logo: string;
    };
}

