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
        <Navbar
            shouldHideOnScroll={!roomsListState.get({ noproxy: true }) || (homeSectionState.get({ noproxy: true }) !== 'spaces')}
            isBordered
            className={((!roomsListState.get({ noproxy: true }) || (homeSectionState.get({ noproxy: true }) !== 'spaces')) ? undefined : 'fixed') + " " + (homeSectionState.get({ noproxy: true }) === 'spaces' ? "h-[172px]" : "h-[128px]")}
        >
            <NavbarContent as="div" className={"items-center w-full " + (homeSectionState.get({ noproxy: true }) === 'spaces' ? "h-[172px]" : "h-[128px]")} justify="center">
                <div className={"w-full"} style={{ paddingTop: (homeSectionState.get({ noproxy: true }) === 'spaces' ? 20 : 0) }}>
                    <div className="flex pl-1">
                        <HomeMenu />

                        <p className="text-xl flex-1 text-center">
                            Sigma
                        </p>
                        <HomeNotifications />
                    </div>
                    <HomeSearchbar />
                    {
                        homeSectionState.get({ noproxy: true }) === 'spaces' ? (
                            <HomeFolders />
                        ) : null
                    }
                </div>
            </NavbarContent>
        </Navbar >
    )
}
