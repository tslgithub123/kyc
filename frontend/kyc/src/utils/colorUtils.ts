export const getUserTypeColor = (userType: string, strength?: string): string => {
    let myColor = '';
    if (userType === 'TSL') {
        myColor = 'red';
    } else if (userType === 'Director') {
        myColor = 'violet';
    } else if (userType === 'Administrator') {
        myColor = 'orange';
    } else if (userType === 'Environment Officer') {
        myColor = 'green';
    } else if (userType === 'Manager') {
        myColor = 'yellow';
    } else if (userType === 'Third Party') {
        myColor = 'grape';
    } else {
        myColor = 'gray';
    }
    const baseColor = strength ? `var(--mantine-color-${myColor}` : `${myColor}`;
    return strength ? `${baseColor}-${strength}` : `${baseColor}`;
};
