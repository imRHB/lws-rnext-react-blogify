export function getTimestamp(createdAt) {
    const createdAtDate =
        typeof createdAt === "string" ? new Date(createdAt) : createdAt;
    const now = new Date();
    const elapsedMilliseconds = now.getTime() - createdAtDate.getTime();

    // Helper function to convert milliseconds to appropriate time units
    const getTimeAgo = (time, unit) => {
        const roundedTime = Math.round(time);
        return `${roundedTime} ${unit}${roundedTime === 1 ? "" : "s"}`;
    };

    // Define thresholds for different time units
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    // Determine which time unit to use based on elapsed time
    if (elapsedMilliseconds < minute) {
        return getTimeAgo(elapsedMilliseconds / 1000, "second") + " ago";
    } else if (elapsedMilliseconds < hour) {
        return getTimeAgo(elapsedMilliseconds / minute, "minute") + " ago";
    } else if (elapsedMilliseconds < day) {
        return getTimeAgo(elapsedMilliseconds / hour, "hour") + " ago";
    } else if (elapsedMilliseconds < 7 * day) {
        return getTimeAgo(elapsedMilliseconds / day, "day") + " ago";
    } else {
        const options = { month: "long", day: "numeric", year: "numeric" };
        return createdAtDate.toLocaleDateString("en-US", options);
    }
}
