import { format } from "date-fns";

export const formatDate = (date: Date | string): string => {
  return format(new Date(date), "dd/MM/yyyy");
};
