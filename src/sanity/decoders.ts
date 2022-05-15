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
    color: union(string, nil),
    emoji: union(string, nil),
    title: string,
    slug: string,
    description: union(string, nil),
});

// Decodes external links
const externalLinkDecoder = record({
    _key: string,
    title: string,
    link: string,
})

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
})

// Decodes projects
const projectDecoder = record({
    _id: string,
    _updatedAt: string,
    slug: string,
    title: string,
    description: string,
    body: union(string, nil),
    categories: array(categoryDecoder),
    externalLinks: union(array(externalLinkDecoder), nil),
})

// Decodes overview of projects
const projectOverviewDecoder = record({
    _id: string,
    title: string,
    description: string,
    slug: string,
    categories: array(categoryDecoder),
})

// Decodes slug
const slugDecoder = record({
    slug: string,
})

// Projects related to category
const projectByCategoryDecoder = record({
    title: string,
    description: union(string, nil),
    emoji: string,
    color: string,
    projects: array(projectOverviewDecoder),
})

export {
    projectDecoder,
    projectOverviewDecoder,
    categoryDecoder,
    authorDecoder,
    postDecoder,
    slugDecoder,
    projectByCategoryDecoder,
    externalLinkDecoder,
};