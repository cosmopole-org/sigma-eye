"use client"

import React from "react";
import RoomModal from "@/components/home/room-modal";
import HomeNavbar from "@/components/home/home-navbar";
import HomeBottomNav from "@/components/home/home-bottomnav";
import HomeFolders from "@/components/home/home-folders";
import HomeRoomsList from "@/components/home/home-rooms-list";
import HomeTowersList from "@/components/home/home-towers-list";

export default function Home() {
    return (
        <div className="w-full h-full">
            <HomeNavbar />
            <div
                className={"relative w-full h-full overflow-scroll pl-4 pr-4"}
            >
                <HomeTowersList />
                <HomeRoomsList />
            </div>
            <HomeFolders secondary />
            <HomeBottomNav />
            <RoomModal />
        </div>
    );
}