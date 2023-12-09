export type ResponseMeta = {
    code: number,
    success: boolean,
    message: string,
} 

export type Response<T> = {
    meta : ResponseMeta
    data : T
}