const BASE_URL =
  process.env.NODE_ENV.trim() === "development"
    ? `http://localhost:${process.env.REACT_APP_API_PORT_DEV}`
    : `http://localhost:${process.env.REACT_APP_API_PORT}`;

export default BASE_URL;
