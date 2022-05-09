import { decodeType } from "typescript-json-decoder";
import { categoryDecoder, postDecoder, projectDecoder, projectByCategoryDecoder } from "./decoders";

type Project = decodeType<typeof projectDecoder>;
type Category = decodeType<typeof categoryDecoder>;
type Post = decodeType<typeof postDecoder>;
type ProjectByCategory = decodeType<typeof projectByCategoryDecoder>;

interface ErrorMessage {
    message: string;
}

const isErrorMessage = (object: any): object is ErrorMessage => {
    return 'message' in object;
};


export type { ErrorMessage, Project, Category, Post, ProjectByCategory }
export { isErrorMessage }