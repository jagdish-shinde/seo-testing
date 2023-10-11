module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_AWS_DOMAIN
    ],
  },
  basePath : '/blog',
}

 
