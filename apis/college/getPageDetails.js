import axios from "../axios"

export async function getPageDetails(queryData){
    const {slug,preview=''} = queryData || {}
    return await axios.get(`/seo/page/${slug}?preview=${preview}`)
}