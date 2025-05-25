export class BusinessError extends Error {
    constructor(message:string) {
        super(message);
    }
}

export class AuthorizationError extends Error {
    constructor(message:string){
        super(message);
    }
}

export class RateLimitError extends Error {
    public retryAfter: number;
    
    constructor(message: string, retryAfter: number) {
        super(message);
        this.retryAfter = retryAfter;
        this.name = 'RateLimitError';
    }
}