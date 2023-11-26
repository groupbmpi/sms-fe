export const generateArray = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const changeKeyAtIndex = (map: Map<string, number>, index: number, newKey: string): Map<string, number> => {
    const newMap = new Map<string, number>();
    let currentIndex = 0;

    for (const [key, value] of map) {
        if (currentIndex === index) {
            newMap.set(newKey, value);
        } else {
            newMap.set(key, value);
        }
        currentIndex++;
    }

    return newMap;
};