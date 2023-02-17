const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://megaverse-backend.onrender.com"
    : process.env.FRONTEND_DOCKER_PORT

export default BASE_URL;
