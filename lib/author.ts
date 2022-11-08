import { decodeType, record, string } from 'typescript-json-decoder';

const authorDecoder = record({
  _id: string,
  name: string,
  email: string,
  slug: string,
  imageUrl: string,
});

type Author = decodeType<typeof authorDecoder>;

const AuthorAPI = {};

export default AuthorAPI;
export { authorDecoder };
export type { Author };
