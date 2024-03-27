"use client"

import { Card } from "@nextui-org/react";
import { BottomNavItem } from "../elements/bottomnav-item";
import { hookstate, useHookstate } from "@hookstate/core";
import { useRouter } from "next/navigation";
import { switchRoomLoading } from "../../api/offline/states";

export const selectedRoomSection = hookstate("board");
export const switchHomeSection = (s: string) => {
    selectedRoomSection.set(s);
}

export default function RoomBottomNav() {
    const selectedState = useHookstate(selectedRoomSection);
    const router = useRouter();
    const onItemClick = (key: string) => () => {
        selectedState.set(key);
        switchRoomLoading(true);
        router.push('/api/room/' + key);
    }
    return (
        <Card isBlurred className="grid grid-cols-3 absolute bottom-0 left-0 w-full h-[72px] pt-1" style={{ borderRadius: '24px 24px 0px 0px', }}>
            <BottomNavItem itemKey="board" selected={selectedState.get({ noproxy: true })} title="Board" icon="gallery" onClick={onItemClick('board')} />
            <BottomNavItem itemKey="chat" selected={selectedState.get({ noproxy: true })} title="Chat" icon="music" onClick={onItemClick('chat')} />
            <BottomNavItem itemKey="files" selected={selectedState.get({ noproxy: true })} title="Files" icon="video" onClick={onItemClick('files')} />
        </Card >
    )
}
