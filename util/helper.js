import { SLUG_PAGES, SLUG_PREFIX } from "./constants"

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

export function removeMathchingSubString(slug = ''){
    if(!slug){
        return
    }
    let prefixSlug
    for (const substring of SLUG_PREFIX) {
        if (slug.includes(substring)) {
          const parts = slug.split(substring);
          prefixSlug = parts.join('').trim();
          break
        }
      }
    return prefixSlug;
}