import { record, string } from 'typescript-json-decoder';

export const slugDecoder = record({
  slug: string,
});
