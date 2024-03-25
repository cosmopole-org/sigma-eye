"use client"

import { Card } from "@nextui-org/react";
import { useState } from "react";
import { BottomNavItem } from "../elements/bottomnav-item";

export default function HomeBottomNav() {
    const [selected, setSelected] = useState('city');
    const onItemClick = (key: string) => () => setSelected(key);
    return (
        <Card isBlurred className="grid grid-cols-3 fixed bottom-0 left-0 w-full h-[72px] pt-1" style={{ borderRadius: '24px 24px 0px 0px' }}>
            <BottomNavItem itemKey="people" selected={selected} title="People" icon="gallery" onClick={onItemClick('people')} />
            <BottomNavItem itemKey="city" selected={selected} title="City" icon="music" onClick={onItemClick('city')} />
            <BottomNavItem itemKey="settings" selected={selected} title="Settings" icon="video" onClick={onItemClick('settings')} />
        </Card >
    )
}
