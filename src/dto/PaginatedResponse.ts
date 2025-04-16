export interface PaginationLinks {
    self: string;
    next: string;
    prev: string;
}

export interface PageInfo {
    currentPage: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    links: PaginationLinks;
    data: T[];
    page: PageInfo;
}