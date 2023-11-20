const BCFDomain = "bcf.or.id";

export const isDomainBCF = (email: string): boolean => {
    const parsedDomain = email.split("@")[1];
    return parsedDomain === BCFDomain;
}