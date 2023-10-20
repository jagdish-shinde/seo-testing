import axios from "../axios"

export async function getApprovedPages (){
    return await axios.get('/seo/approved-pages');
}