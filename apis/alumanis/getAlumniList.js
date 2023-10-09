import axios from "../axios";

export async function getAlumniList(slug){
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/seo/alumni?slug=${slug}`)
}
