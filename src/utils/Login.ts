import { LoginWithAnyResponse } from "../dto/auth/LoginWithAnyResponse"

export class Login {

    constructor() {
    }

    public static initializeLogin(param: LoginWithAnyResponse): void {
        localStorage.setItem("userInfo", JSON.stringify(param))
    }

    public static logout(): void {
        localStorage.removeItem("userInfo")
    }

    public static isLoggedIn(): boolean {
        const userInfo = localStorage.getItem("userInfo")
        return userInfo !== null
    }

    public static getUserInfo(): LoginWithAnyResponse | null {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            return JSON.parse(userInfo) as LoginWithAnyResponse
        }
        return null
    }

    public static getAuthorizationHeader(): { Authorization: string } {
        const userInfo = this.getUserInfo()
        if (userInfo) {
            return {
                Authorization: `Bearer ${userInfo.jwt}`,
            }
        }
        return {
            Authorization: "",
        }
    }
}