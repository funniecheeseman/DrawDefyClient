import { BinaryToTextEncoding } from "crypto";
import { IncomingMessage, OutgoingHttpHeader, OutgoingHttpHeaders, RequestOptions } from "http";
import { Transform } from "stream";
import { URL } from "url";
import { CancellationToken } from "./CancellationToken";
import { ProgressInfo } from "./ProgressCallbackTransform";
export interface RequestHeaders extends OutgoingHttpHeaders {
    [key: string]: OutgoingHttpHeader | undefined;
}
export interface DownloadOptions {
    readonly headers?: OutgoingHttpHeaders | null;
    readonly sha2?: string | null;
    readonly sha512?: string | null;
    readonly cancellationToken: CancellationToken;
    onProgress?: (progress: ProgressInfo) => void;
}
export declare function createHttpError(response: IncomingMessage, description?: any | null): HttpError;
export declare class HttpError extends Error {
    readonly statusCode: number;
    readonly description: any | null;
    constructor(statusCode: number, message?: string, description?: any | null);
    isServerError(): boolean;
}
export declare function parseJson(result: Promise<string | null>): Promise<any>;
interface Request {
    abort: () => void;
    end: (data?: Buffer) => void;
}
export declare abstract class HttpExecutor<T extends Request> {
    protected readonly maxRedirects = 10;
    request(options: RequestOptions, cancellationToken?: CancellationToken, data?: {
        [name: string]: any;
    } | null): Promise<string | null>;
    doApiRequest(options: RequestOptions, cancellationToken: CancellationToken, requestProcessor: (request: T, reject: (error: Error) => void) => void, redirectCount?: number): Promise<string>;
    protected addRedirectHandlers(request: any, options: RequestOptions, reject: (error: Error) => void, redirectCount: number, handler: (options: RequestOptions) => void): void;
    addErrorAndTimeoutHandlers(request: any, reject: (error: Error) => void, timeout?: number): void;
    private handleResponse;
    abstract createRequest(options: RequestOptions, callback: (response: any) => void): T;
    downloadToBuffer(url: URL, options: DownloadOptions): Promise<Buffer>;
    protected doDownload(requestOptions: RequestOptions, options: DownloadCallOptions, redirectCount: number): void;
    protected createMaxRedirectError(): Error;
    private addTimeOutHandler;
    static prepareRedirectUrlOptions(redirectUrl: string, options: RequestOptions): RequestOptions;
    static retryOnServerError(task: () => Promise<any>, maxRetries?: number): Promise<any>;
}
export interface DownloadCallOptions {
    responseHandler: ((response: IncomingMessage, callback: (error: Error | null) => void) => void) | null;
    onCancel: (callback: () => void) => void;
    callback: (error: Error | null) => void;
    options: DownloadOptions;
    destination: string | null;
}
export declare function configureRequestOptionsFromUrl(url: string, options: RequestOptions): RequestOptions;
export declare function configureRequestUrl(url: URL, options: RequestOptions): void;
export declare class DigestTransform extends Transform {
    readonly expected: string;
    private readonly algorithm;
    private readonly encoding;
    private readonly digester;
    private _actual;
    get actual(): string | null;
    isValidateOnEnd: boolean;
    constructor(expected: string, algorithm?: string, encoding?: BinaryToTextEncoding);
    _transform(chunk: Buffer, encoding: string, callback: any): void;
    _flush(callback: any): void;
    validate(): null;
}
export declare function safeGetHeader(response: any, headerKey: string): any;
export declare function configureRequestOptions(options: RequestOptions, token?: string | null, method?: "GET" | "DELETE" | "PUT" | "POST"): RequestOptions;
export declare function safeStringifyJson(data: any, skippedNames?: Set<string>): string;
export {};
