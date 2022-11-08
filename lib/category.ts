import { decodeType, number, record, string } from 'typescript-json-decoder';

const categoryDecoder = record({
  _id: string,
  title: string,
  slug: string,
  emoji: string,
  color: string,
  description: string,
});

type Category = decodeType<typeof categoryDecoder>;

const CategoryAPI = {};

export default CategoryAPI;
export { categoryDecoder };
export type { Category };
