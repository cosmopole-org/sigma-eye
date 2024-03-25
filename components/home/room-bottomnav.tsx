"use client"

import { Card } from "@nextui-org/react";
import { useState } from "react";
import { BottomNavItem } from "../elements/bottomnav-item";

export default function RoomBottomNav() {
    const [selected, setSelected] = useState('board');
    const onItemClick = (key: string) => () => setSelected(key);
    return (
        <Card isBlurred className="grid grid-cols-3 fixed bottom-0 left-0 w-full h-[72px] pt-1" style={{ borderRadius: '24px 24px 0px 0px', }}>
            <BottomNavItem itemKey="board" selected={selected} title="Board" icon="gallery" onClick={onItemClick('board')} />
            <BottomNavItem itemKey="chat" selected={selected} title="Chat" icon="music" onClick={onItemClick('chat')} />
            <BottomNavItem itemKey="files" selected={selected} title="Files" icon="video" onClick={onItemClick('files')} />
        </Card >
    )
}
