import axios from "../axios"

export async function getTopVisitiedColleges(querydata){
    const {slug,preview=false} = querydata || {}
    return await axios.get('/seo/popular-pages',{params:{slug,preview}})
}