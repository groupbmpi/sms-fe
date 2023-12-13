export interface INewsOptionsArgDto {
    institutionId?: number,
    creatorId?: number,
    page?: number,
    limit?: number,
    startDateAt?: string,
    endDateAt?: string,
}

export interface INewsIdArgDto {
    id: number
}

export interface ICreateNewsArgDto {
    title: string,
    detail: string,
    photoLink: string,
    creatorId: number,
}

export interface IUpdateNewsArgDto {
    id: number,
    data: {
        title?: string,
        detail?: string,
        photoLink?: string,
        creatorId?: number,
    },
}

export interface IFormAllNewsResponseData {
    news: IFormNewsByIdResponseData[],
    totalRecords: number,
}

export interface IFormNewsByIdResponseData {
    id: number,
    title: string, 
    detail: string, 
    photoLink: string,
    createdAt: string,
    updatedAt: string,
}

export interface NewsForm {
    title: string,
    detail: string,
    date: Date,
    photoLink: string,
    publicationLink: string,
}

export interface INewsByIdRetDto {
    id: number,
    title: string, 
    detail: string, 
    photoLink: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IAllNewsRetDto {
    news: INewsByIdRetDto[],
    totalRecords: number,
}

export interface INewsByIdRetDto {
    id: number,
    title: string, 
    detail: string, 
    photoLink: string,
    createdAt: Date,
    updatedAt: Date,
}