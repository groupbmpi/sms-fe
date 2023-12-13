const BCFDomain = "bcf.or.id";

export const isDomainBCF = (email: string): boolean => {
    const parsedDomain = email.split("@")[1];
    return parsedDomain === BCFDomain;
}

export const maxPageByRecords = (totalRecords: number, recordsPerPage: number): number => {
    if (totalRecords <= 0 || recordsPerPage <= 0) {
        return 1;
    }

    return Math.ceil(totalRecords / recordsPerPage);
}

export const generateQueryString = (params: Record<string, any>): string => {
    const queryString = Object.keys(params)
        .filter((key) => params[key] !== '' && params[key] !== undefined && params[key] !== null)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    if (queryString === '') {
        return '';
    }

    return `?${queryString}`;
};

export const generateDateStringIdFormat = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    };

    return date.toLocaleDateString('id-ID', options);
};

export const getNumberFromString = (arg?: string): number | undefined => {
    if (typeof arg !== 'string') {
        return undefined;
    }

    if (Number.isNaN(parseInt(arg))) {
        return undefined;
    }

    return parseInt(arg);
}

export const getStartDateByMonthYear = (month?: number, year?: number): Date => {
    const currentDate = new Date();

    if (month === undefined && year === undefined) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    }
    
    if (month === undefined) {
        return new Date(year, currentDate.getMonth(), 1);
    }

    if (year === undefined) {
        return new Date(currentDate.getFullYear(), month - 1, 1);
    }

    return new Date(year, month - 1, 1);
}

export const getEndDateByMonthYear = (month?: number, year?: number): Date => {
    const currentDate = new Date();

    if (month === undefined && year === undefined) {
        return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    }

    if (month === undefined) {
        return new Date(year, currentDate.getMonth() + 1, 0);
    }

    if (year === undefined) {
        return new Date(currentDate.getFullYear(), month, 0);
    }

    return new Date(year, month, 0);
};

export const generateDateQueryStringFormat = (date: Date): string => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0'); 

    return `${yyyy}-${mm}-${dd}`;
}