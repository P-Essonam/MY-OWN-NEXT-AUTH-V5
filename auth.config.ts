
import { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import bcrypt from 'bcryptjs'
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import Google from "next-auth/providers/google"


export default {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
        credentials ({
            async authorize(credentials) {
              const validatedFields = LoginSchema.safeParse(credentials);
      
              if (validatedFields.success) {
                const { email, password } = validatedFields.data;
                
                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;
      
                const passwordsMatch = await bcrypt.compare(
                  password,
                  user.password,
                );
      
                if (passwordsMatch) return user;
              }
      
              return null;
            }
          })
    ],
}   satisfies NextAuthConfig