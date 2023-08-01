const GOOGLE_CLIENT_ID = "395887584136-o1gbtt3bh95s3ll8rlskn7n63j590jdp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const GOOGLE_REDIRECT_URL = "http://localhost:1337/api/sessions/oauth/google";

function getGoogleOAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: GOOGLE_REDIRECT_URL as string,
    client_id: GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"].join(" ")
  };
  console.log(options);

  const qs = new URLSearchParams(options);
  console.log(qs.toString());
  return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthUrl;
