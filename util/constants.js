import { about, admission, ambulance, atm, bed, book, boy, campus, computer, connectivity, courses, facebook, fees, firstAid, flask, football, girl, instagram, linkdin, manWithBag, peoples, placement, plane, rank, spoonAndFork, train, twitter, youtube } from "../public";

export const facilitiesWithIcon = [
    {icon : connectivity, heading : "Connectivity",id:"#connectivity"},
    {icon : rank, heading : "Rank",id:"#rank"},
    {icon : campus, heading : "Campus",id:"#campus"},
    {icon : courses, heading : "Courses",id:"#courses"},
    {icon : admission, heading : "Admission",id:"#admission"},
    {icon : fees, heading : "Fees",id:"#fees"},
    {icon : placement, heading : "Placements",id:"#placement"},
    {icon : about, heading : "About",id:"#about"},
]

export const facilitiesWithLogo = {
    "Laboratories" : flask,
    "Guest room" : bed,
    "Transport Facility" : ambulance,
    "Cafeteria" : spoonAndFork,
    "IT Infrastructure" : computer,
    "Medical" : firstAid,
    "Library" : book,
    "Sports": football,
    "Student Activity Centre" : peoples
}

export const socialIconWithLink =[
    {icon : facebook, link:"https://www.facebook.com"},
    {icon : instagram, link:"https://www.instagram.com"},
    {icon : linkdin,link:"https://www.linkedin.com"},
    {icon : youtube,link:"https://www.youtube.com"},
    {icon : twitter,link:"https://www.twitter.com"},
]

export const footerBtns = [
    {text : "Terms",link:""},
    {text: "Privacy",link:""},
    {text:"Site Map © 2022 FunctionUp. All rights reserved.",link:""}
]
export const fstOfferings =[
    "FunctionUp Data science, AI& ML",
    "FunctionUp Full Stack Development",
    "FunctionUp School of Technology"
]

export const degrees = {
    be: "BE",
    btech : "B.Tech"
}