import {
    array,
    nil,
    record,
    string,
    union,
} from 'typescript-json-decoder';

// Decodes categories
const categoryDecoder = record({
    _id: string,
    title: string,
    color: string,
    description: union(string, nil),
});

// Decodes author
const authorDecoder = record({
    name: string,
    slug: string,
    bio: string,
})

// Decodes post
const postDecoder = record({
    _id: string,
    slug: string,
    title: string,
    description: string,
    body: string,
})

// Decodes projects
const projectDecoder = record({
    _id: string,
    slug: string,
    title: string,
    description: string,
    body: string,
});

// Decodes slug
const slugDecoder = record({
    slug: string,
})

export {
    projectDecoder,
    categoryDecoder,
    authorDecoder,
    postDecoder,
    slugDecoder,
};