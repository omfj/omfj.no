import { decodeType } from "typescript-json-decoder";
import { categoryDecoder, projectDecoder } from "./decoders";

type Project = decodeType<typeof projectDecoder>;
type Category = decodeType<typeof categoryDecoder>;

interface ErrorMessage {
    message: string;
}

const isErrorMessage = (object: any): object is ErrorMessage => {
    return 'message' in object;
};


export type { ErrorMessage, Project, Category }
export { isErrorMessage }