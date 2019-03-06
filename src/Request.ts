import axios, { AxiosResponse } from "axios";

interface IRequest {
    getHeaders(): object;
    setHeaders(headers: object): void;
    addHeaders(headers: object): void;
    getUrl(): string;
    setUrl(url: string): void;
    addUrl(path: string): void;
    getParameters(): object;
    setParameters(parameters: object): void;
    get<T>(): Promise<T>;
    post<T>(): Promise<T>;
}

export default class Request implements IRequest {
    protected headers: object = {"Content-Type": "application/json"};
    protected url: string = "";
    protected parameters: object = {};

    public getHeaders() {
        return this.headers;
    }

    public setHeaders(headers: object) {
        this.headers = headers;
    }

    public addHeaders(headers: object) {
        const { headers: headersOld } = this;
        this.headers = {
            ...headersOld,
            ...headers,
        };
    }

    public getUrl() {
        return this.url;
    }

    public setUrl(url?: string) {
        this.url = url || "";
    }

    public addUrl(path: string) {
        const { url } = this;
        this.url = `${url}/${path}`;
    }

    public getParameters() {
        return this.parameters;
    }

    public setParameters(parameters: object) {
        this.parameters = parameters;
    }

    public async get<T>(): Promise<T> {
        const response: AxiosResponse = await axios.get(this.url, {
            headers: this.headers,
            params: this.parameters,
        });

        return response.data;
    }

    public async post<T>(): Promise<T> {

        const response: AxiosResponse = await axios.post(this.url, this.parameters, {
            headers: this.headers,
        });

        return response.data;
    }
}
