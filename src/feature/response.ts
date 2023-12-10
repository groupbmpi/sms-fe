export type ResponseMeta = {
    code: number,
    success: boolean,
    message: string,
} 

export type ResponseType<T> = {
    meta : ResponseMeta
    data : T 
}