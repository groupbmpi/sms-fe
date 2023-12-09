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