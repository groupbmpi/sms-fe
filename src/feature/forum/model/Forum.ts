export interface IFormChat{
    message: string
}

interface ChatDTO{
    id : number
    pesan : string
    user : string
    linkFoto: string
    messageTime: string
    isSelf: boolean
}

export interface IChatResponseData extends ChatDTO{}

export interface IChatQuery{
    lowID: number | null
}