const config = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://invest.terminal.mobi:4000"
      : "http://localhost:4000",
};
export default config;
