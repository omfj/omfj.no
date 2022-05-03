import sanityClient from '@sanity/client';

const SanityAPI = sanityClient({
    projectId: '28zlbntv',
    dataset: 'production',
    apiVersion: '2021-10-21',
    useCdn: true,
});

export { SanityAPI };