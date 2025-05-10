export interface PostBody {
    args: Record<string, any>;
    data: string;
    files: Record<string, any>;
    form: Record<string, any>;
    headers: {
        Accept: string;
        "Accept-Encoding": string;
        "Accept-Language": string;
        "Content-Length": string;
        Host: string;
        Origin: string;
        Priority: string;
        Referer: string;
        "Sec-Fetch-Dest": string;
        "Sec-Fetch-Mode": string;
        "Sec-Fetch-Site": string;
        "User-Agent": string;
        "X-Amzn-Trace-Id": string;
    };
    json: any | null;
    origin: string;
    url: string;
}