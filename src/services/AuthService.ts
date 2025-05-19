import { LoginWithGoogleRequestDTO } from "../dto/auth/LoginWithGoogleRequestDTO"
import { LoginWithAnyResponse } from "../dto/auth/LoginWithAnyResponse"
import { Login } from "../utils/Login"
import { HeaderBuilder } from "../utils/HeaderBuilder"
import { URLBuilder } from "../utils/UrlBuilder"


export class AuthService {
    async loginWithGoogle(request: LoginWithGoogleRequestDTO): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname("/api/v1/auth/login-with-google")
        
        const response = await fetch(url.build(), {
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
    
    async loginWithEmail(email: string, password: string): Promise<boolean> {
        const url = new URLBuilder()
            .setPathname("/api/v1/auth/login-with-email")
        
        const response = await fetch(url.build(), {
            method: "POST", 
            headers: new HeaderBuilder().contentTypeJson().build(),
            body: JSON.stringify({ email, password }),
        })
        
        if (response.ok) {
            const data = await response.json() as LoginWithAnyResponse
            Login.initializeLogin(data)
            return true
        }
        return false
    }
}