import axios from "axios";

const fetchAll = async () => {
const response = await axios.get("/genres/");
return response.data;
}


export default {
    fetchAll
}