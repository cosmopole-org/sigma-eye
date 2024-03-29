"use client"

import RoomModal, { switchRoomModal } from "@/components/home/room-modal";
import { useEffect } from "react";

export default function Board() {
    useEffect(() => {
        switchRoomModal(true);
    }, []);
    return (
        <RoomModal />
    );
}
