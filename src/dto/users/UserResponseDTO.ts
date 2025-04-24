import { RoleResponseDTO } from "../roles/RoleResponseDTO";

export interface UserResponseDTO {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    roles: RoleResponseDTO[];
}