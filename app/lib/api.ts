import APIInstance from "@mirlo/mirlo-api-client";

const API_HOST = process.env.API_HOST || "http://localhost:3000";

const api = APIInstance(API_HOST, "");

export default api;
