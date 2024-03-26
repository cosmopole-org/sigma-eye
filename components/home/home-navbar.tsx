"use client"

import { Navbar, NavbarContent } from "@nextui-org/react";
import { useHookstate } from "@hookstate/core";
import HomeFolders from "./home-folders";
import HomeMenu from "./home-menu";
import HomeSearchbar from "./home-searchbar";
import { roomsListView } from "./home-rooms-list";
import { selectedHomeSection } from "./home-bottomnav";
import HomeNotifications from "./home-notifications";

export default function HomeNavbar() {
    const roomsListState = useHookstate(roomsListView);
    const homeSectionState = useHookstate(selectedHomeSection);
    return (
        <Navbar shouldHideOnScroll={!roomsListState.get({ noproxy: true })} className={(homeSectionState.get({ noproxy: true }) === "city" ? "h-[166px]" : "h-[124px]")} isBordered>
            <NavbarContent as="div" className={(homeSectionState.get({ noproxy: true }) === 'city' ? "h-[166px]" : "h-[124px]") + " items-center w-full relative"} justify="start">
                <div className="top-5 w-full absolute">
                    <div className="flex pl-1">
                        <HomeMenu />
                        <p className="text-xl flex-1 text-center">
                            Sigma
                        </p>
                        <HomeNotifications />
                    </div>
                    <HomeSearchbar />
                    {
                        homeSectionState.get({ noproxy: true }) === 'city' ? (
                            <HomeFolders />
                        ) : null
                    }
                </div>
            </NavbarContent>
        </Navbar >
    )
}
