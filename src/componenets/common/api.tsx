import axios from "axios";

const api = axios.create({
  baseURL: "https://marriage-calculator-image-n2oc5pjija-uc.a.run.app", // Adjust this URL to your server's URL
});

export default api;
