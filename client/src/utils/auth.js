import CredentialsProvider from "next-auth/providers/credentials";
import { apiRoute } from "./apiRoutes";

export const authOptions = {
   pages: {
      signIn: "/login",
   },
   session: {
      strategy: "jwt",
   },
   secret: process.env.JWT_SECRET,
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
            const response = await fetch(apiRoute.login, {
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
            // * Handle the data from the API response
            console.log('data :>> ', data);
            return data;
         },
      }),
   ],
   callbacks: {
      session({ session, token }) {
         session.user.token = token.accessToken;
         session.user.id = token.id;
         session.user.licenseId = token.licenseId;
         console.log("session :>> ", session);
         return session;
      },
      jwt({ token, trigger, session, account, user }) {
         console.log('user :>> ', user);
         if (account) {
            token.accessToken = account.access_token;
            if ("_id" in user) token.id = user._id;
            if ("token" in user) token.accessToken = user.token;
            if ("licenseId" in user) token.licenseId = user.licenseId;
         }
         console.log("session :>> ", session);
         if (trigger == "update" && session?.licenseId) {
            token.licenseId = session.licenseId;
         }
         return token;
      },
   },
};
