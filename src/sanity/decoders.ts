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
    _id: string,
    name: string,
    slug: string,
    bio: string,
    imageUrl: union(string, nil),
})

// Decodes post
const postDecoder = record({
    _id: string,
    slug: string,
    title: string,
    description: string,
    body: string,
    //image: union(string, nil),
})

// Decodes projects
const projectDecoder = record({
    _id: string,
    _updatedAt: string,
    slug: string,
    title: string,
    description: string,
    body: union(string, nil),
    image: union(string, nil),
    //categories: union(array(categoryDecoder), nil),
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