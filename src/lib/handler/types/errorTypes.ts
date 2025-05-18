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