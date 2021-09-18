const prod = process.env.NODE_ENV === "production";


const urls = {
  baseUrl: prod ? "https://placeholder.com" : "http://localhost:3000",
  authEndpoint: "https://accounts.spotify.com/authorize",
  tokenUrl: "https://accounts.spotify.com/api/token",
  apiUrl: "https://api.spotify.com/v1",
  redirect: prod ? "https://placeholder.com/" : "http://localhost:3000/",
  pages: {
    index: '/index',
    login: "/login",
    search: "/search",
    stats: {
      artists: "/stats/artists",
      tracks: "/stats/tracks",
    }
  },
  api: {
    auth: "/api/auth",
  },
} as any;

export default urls;
