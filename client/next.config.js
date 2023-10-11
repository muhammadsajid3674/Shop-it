/** @type {import('next').NextConfig} */

const NextConfig = {
   env: {
      NEXT_PUBLIC_APIAUTH: "ABiIZ7E4sl/7kupsYpElx5R06XbFdD5SzFCPycj5k8E=",
      JWT_SECRET: "helloworld",
      BASE_URL: "http://localhost:5000",
      NEXTAUTH_URL: "http://localhost:3000",
   },
   images: {
      domains: ["res.cloudinary.com"],
   },
};

module.exports = NextConfig;
