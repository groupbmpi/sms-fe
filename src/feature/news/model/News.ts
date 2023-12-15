export interface INewsOptionsArgDto {
    institutionCategory?: string,
    institution?: string,
    creatorId?: number,
    page?: number,
    limit?: number,
    startDateAt?: string,
    endDateAt?: string,
}

export interface INewsIdArgDto {
    id: number,
}

export interface ICreateNewsArgDto {
    creatorId: number,
    title: string,
    detail: string,
    photoLink: string,
    publicationLink?: string,
    createdAt?: Date,
}

export interface IUpdateNewsArgDto {
    id: number,
    data: {
        creatorId?: number,
        title?: string,
        detail?: string,
        photoLink?: string,
        publicationLink?: string,
        updatedAt?: Date,
    },
}

export interface IFormAllNewsResponseData {
    news: IFormNewsByIdResponseData[],
    totalRecords: number,
}

export interface IFormNewsByIdResponseData {
    owner: {
        id: number,
        name: string,
    },
    news: {
        id: number,
        title: string, 
        detail: string, 
        photoLink: string,
        publicationLink: string | null,
        createdAt: string,
        updatedAt: string,
        canModify: boolean,
    },
}

export interface IFormNewsOptimumDatesResponseData {
    minDates: {
        createdAt: string,
        updatedAt: string,
    },
    maxDates: {
        createdAt: string,
        updatedAt: string,
    },
}

export interface NewsForm {
    title: string,
    detail: string,
    date: Date,
    photoLink: string,
    publicationLink?: string,
}

export interface IAllNewsRetDto {
    news: INewsByIdRetDto[],
    totalRecords: number,
}

export interface INewsByIdRetDto {
    owner: {
        id: number,
        name: string,
    },
    news: {
        id: number,
        title: string, 
        detail: string, 
        photoLink: string,
        publicationLink: string,
        createdAt: Date,
        updatedAt: Date,
        canModify: boolean,
    },
}

export interface INewsOptimumDatesRetDto {
    minDates: {
        createdAt: Date,
        updatedAt: Date,
    },
    maxDates: {
        createdAt: Date,
        updatedAt: Date,
    },
}