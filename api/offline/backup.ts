"use client"

let homePeopleScrollPos = 0;
export const setHomePeopleScrollPos = (p: number) => {
    homePeopleScrollPos = p;
}
export const getHomePeopleScrollPos = () => {
    return homePeopleScrollPos;
}

let homeCityScrollPos = 0;
export const setHomeCityScrollPos = (p: number) => {
    homeCityScrollPos = p;
}
export const getHomeCityScrollPos = () => {
    return homeCityScrollPos;
}

let homeSettingsScrollPos = 0;
export const setHomeSettingsScrollPos = (p: number) => {
    homeSettingsScrollPos = p;
}
export const getHomeSettingsScrollPos = () => {
    return homeSettingsScrollPos;
}