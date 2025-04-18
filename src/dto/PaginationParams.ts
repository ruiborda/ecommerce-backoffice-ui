export interface PaginationParams {
    page: number;
    size: number;
    query?: string;
}
export class Pagination {
    page: number;
    size: number;
    query?: string;

    constructor(params: PaginationParams) {
        this.page = params.page;
        this.size = params.size;
        this.query = params.query;
    }

    /**
     * Verifica si la página actual es la última página disponible
     * @param totalPages El número total de páginas
     * @returns true si la página actual es la última, false en caso contrario
     */
    isLastPage(totalPages: number): boolean {
        return this.page >= totalPages;
    }
}