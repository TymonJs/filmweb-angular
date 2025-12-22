
export interface User {
    readonly id: number,
    readonly username: string,
    readonly email: string
    readonly password: string,
    readonly address: {
        readonly street: string,
        readonly city: string,
        readonly postal: string
    }
}

export interface AuthUser extends AccessToken{
    user: User
}

export interface AccessToken {
    readonly accessToken: string
}

export interface LoginDto {
    readonly email: string,
    readonly password: string
}