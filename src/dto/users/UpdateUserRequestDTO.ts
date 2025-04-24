export interface UpdateUserRequestDTO {
    id: string;
    email: string;
    password: string;
    fullName: string;
    roleIds: string[];
}