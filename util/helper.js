export function getCapitalFirstLetter(text){
    if(!text?.length) return ""
    return `${text[0].toUpperCase()}${text.slice(1)}`
}