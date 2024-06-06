export interface MyResponse<T = undefined> {
    successful: boolean;
    data?: T;
    errorMessage?: string;
}