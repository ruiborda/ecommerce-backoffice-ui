import { LoginWithGoogleRequestDTO } from "../dto/auth/LoginWithGoogleRequestDTO"
import { LoginWithAnyResponse } from "../dto/auth/LoginWithAnyResponse"
import { Login } from "../utils/Login"
import { HeaderBuilder } from "../utils/HeaderBuilder"


export class AuthService {
    async loginWithGoogle(request: LoginWithGoogleRequestDTO): Promise<boolean> {
        const url = new URL(import.meta.env.VITE_API_URL)
        url.pathname = "/auth/login-with-google"
        const response = await fetch(url.toString(), {
            method: "POST", 
            headers: new HeaderBuilder().contentTypeJson().build(),
            body: JSON.stringify(request),
        })
        if (response.ok) {
            const data = await response.json() as LoginWithAnyResponse
            Login.initializeLogin(data)
            return true
        }
        return false
    }
}