import { Permission } from "./Permission";

export interface RoleResponseDTO {
    id: string;
    code: string;
    permissions: Permission[];
}