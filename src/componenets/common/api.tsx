import axios from "axios";

const api = axios.create({
  baseURL: "https://wedding-order-management-6g7ttzgccq-ew.a.run.app", // Adjust this URL to your server's URL
});

export default api;
