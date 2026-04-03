import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // LinkedIn — custom OAuth 2.0 provider
    {
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          scope: "openid profile email",
          response_type: "code",
        },
      },
      token: "https://www.linkedin.com/oauth/v2/accessToken",
      userinfo: "https://api.linkedin.com/v2/userinfo",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Após login OAuth bem-sucedido, redireciona para /dashboard
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
  },
});
