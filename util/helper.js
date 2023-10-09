import { SLUG_PAGES } from "./constants"

export function getCapitalFirstLetter(text){
    if(!text?.length) return ""
    return `${text[0].toUpperCase()}${text.slice(1)}`
}
export function removePostFixFromSlug(slug){
    if(!slug) return ''
    let splittedSlug
    for(let postFix in SLUG_PAGES){
        if(slug.includes(SLUG_PAGES[postFix])){
            splittedSlug = slug.split(SLUG_PAGES[postFix])
            break
        }
    }
    return splittedSlug?.[0] || slug
}