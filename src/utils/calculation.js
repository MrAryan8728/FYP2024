export const timeDiff = (deadline) => {
    const date = BigInt(new Date().getTime());
    let diff = BigInt(date - deadline);
    return parseInt(diff);
};

export const remainingSeconds = (deadline) => {
    return timeDiff(BigInt(deadline)) / 1000;
};

export const remainingMinutes = (deadline) => {
    return remainingSeconds(BigInt(deadline)) / 60;
};

export const remainingHours = (deadline) => {
    return remainingMinutes(BigInt(deadline)) / 60;
};

export const remainingDays = (deadline) => {
    return remainingHours(BigInt(deadline)) / 24;
};