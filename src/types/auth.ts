export interface AuthState {
    loggedIn: boolean
    userEmail: string | null
}

export interface LoginCredentials {
    email: string
    password: string
}