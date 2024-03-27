"use client"

import React, { useEffect } from "react";
import RoomModal from "@/components/home/room-modal";
import HomeFolders from "@/components/home/home-folders";
import HomeTowersList from "@/components/home/home-towers-list";
import { getHomeCityScrollPos } from "@/api/offline/backup";
import { switchLoading } from "../layout";
import HomeRoomsList from "@/components/home/home-rooms-list";
import HomeNavbar from "@/components/home/home-navbar";

export default function City() {
    useEffect(() => {
        document.documentElement.scrollTop = getHomeCityScrollPos();
        switchLoading(false)
    }, [])
    return (
        <div className="w-full relative">
            <HomeNavbar />
            <HomeTowersList />
            <HomeRoomsList />
            <HomeFolders secondary />
            <RoomModal />
        </div>
    );
}
