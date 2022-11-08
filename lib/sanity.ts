import sanityClient from '@sanity/client';

const SanityAPI = sanityClient({
  projectId: '28zlbntv',
  dataset: 'production',
  apiVersion: '2021-10-21',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

export default SanityAPI;
