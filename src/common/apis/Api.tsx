const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_DOCKER_PORT
    : process.env.FRONTEND_DOCKER_PORT

export default BASE_URL;
