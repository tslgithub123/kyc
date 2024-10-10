export const getUserTypeColor = (userType: string, strength?: string, isMantine?: boolean): string => {
    let myColor = '';
    if (userType === 'env') {
        myColor = 'green';
    } else if (userType === 'man') {
        myColor = 'yellow';
    } else if (userType === 'thp') {
        myColor = 'grape';
    } else {
        myColor = 'gray';
    }
    const baseColor = isMantine ? `var(--mantine-color-${myColor}` : `${myColor}`;
    return strength ? `${baseColor}-${strength}` : `${baseColor}`;
};
