import { format, parseISO } from "date-fns";

const zuluTimeToHuman = (fromDate: string) => {
    const date = parseISO(fromDate);
    const formattedTime = format(date, "yy/MM-dd");

    return formattedTime;
}

export { zuluTimeToHuman }