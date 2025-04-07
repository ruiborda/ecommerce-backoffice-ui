export class URLBuilder {
    private readonly baseUrl: string | undefined;
    protected _URL: URL;

    constructor(baseUrl?: string) {
        if (baseUrl === undefined) {
            this.baseUrl = import.meta.env.VITE_API_URL as string
        } else {
            this.baseUrl = baseUrl
        }
        this._URL = new URL(this.baseUrl)
    }

    setPathname(pathname: string) {
        this._URL.pathname = pathname
        return this
    }

    addSearchParams(key: string, value: string) {
        this._URL.searchParams.append(key, value)
        return this
    }

    setProtocol(protocol: Protocol) {
        this._URL.protocol = protocol
        return this
    }

    setPort(port: string) {
        this._URL.port = port
        return this
    }

    build() {
        return this._URL.toString()
    }
}

export enum Protocol {
    HTTP = 'http:',
    HTTPS = 'https:'
}