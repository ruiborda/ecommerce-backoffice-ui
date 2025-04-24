import { UserResponseDTO } from "./UserResponseDTO";

export interface PageUsersResponseDTO {
    links: {
        self: string;
        next: string;
        prev: string;
    };
    data: UserResponseDTO[];
    page: {
        currentPage: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
}