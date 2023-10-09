import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: {},
            password: {},
         },
         async authorize(credentials) {
            const { email, password } = credentials;
            if (!email || !password) {
               return null;
            }
            const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${process.env.NEXT_PUBLIC_APIAUTH}`,
               },
               body: JSON.stringify({
                  email,
                  password,
               }),
            });
            const data = await response.json();
            return data;
         },
      }),
   ],
   callback: {
      session({ session, token }) {
         session.user._id = token?._id;
         return session;
      },
      jwt({ token, account, user }) {
         if (account) {
            token.accessToken = account?.accessToken;
            if ("_id" in user) token._id = user?._id;
         }
         return token;
      },
   },
   pages: {
      signIn: "/login",
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.JWT_SECRET,
};
