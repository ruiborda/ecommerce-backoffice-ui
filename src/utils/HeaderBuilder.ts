import { Login } from "./Login"

export class HeaderBuilder {
    private readonly headers: Headers

    constructor() {
        this.headers = new Headers()
    }

    addHeader(key: string, value: string): HeaderBuilder {
        this.headers.append(key, value)
        return this
    }

    contentTypeJson(): HeaderBuilder {
        this.headers.append("Content-Type", "application/json; charset=UTF-8")
        return this
    }

    addAuthorization(): HeaderBuilder {
        this.headers.append("Authorization", Login.getAuthorizationHeader().Authorization)
        return this
    }

    build(): Headers {
        return this.headers
    }
}