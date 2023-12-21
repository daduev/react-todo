import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
