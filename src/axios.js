import axios from "axios";
const instance = axios.create({
	baseURL: "https://us-central1-clone-89a9b.cloudfunctions.net/api", //THE API (CLOUD FUNCTION)URL
});
export default instance;
