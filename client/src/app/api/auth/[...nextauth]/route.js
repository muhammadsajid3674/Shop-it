import NextAuth from "next-auth/next";
const { authOptions } = require("@/utils/auth");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
