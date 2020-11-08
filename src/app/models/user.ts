export interface Roles {
    admin: boolean
}

export interface User {
    id?: string,
    email: string,
    roles: Roles
}
