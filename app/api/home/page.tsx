"use client"

import React from "react";
import RoomModal from "@/components/home/room-modal";
import HomeNavbar from "@/components/home/home-navbar";
import HomeBottomNav, { selectedHomeSection } from "@/components/home/home-bottomnav";
import HomeFolders from "@/components/home/home-folders";
import HomeRoomsList from "@/components/home/home-rooms-list";
import HomeTowersList from "@/components/home/home-towers-list";
import { useHookstate } from "@hookstate/core";
import HomePeopleList from "@/components/home/home-people-list";

export default function Home() {
    const selectedSectionState = useHookstate(selectedHomeSection);
    let section = null;
    switch (selectedSectionState.get({ noproxy: true })) {
        case "people": {
            section = <HomePeopleList />
            break;
        }
        case "city": {
            section = <HomeTowersList />
            break;
        }
        case "settings": {
            section = <HomePeopleList />
            break;
        }
    }
    return (
        <div className="w-full h-full">
            <HomeNavbar />
            <div
                className={"relative w-full h-full overflow-scroll pl-4 pr-4"}
            >
                {section}
                <HomeRoomsList />
            </div>
            {
                selectedSectionState.get({ noproxy: true }) === 'city' ? (
                    <HomeFolders secondary />
                ) : null
            }
            <HomeBottomNav />
            <RoomModal />
        </div>
    );
}