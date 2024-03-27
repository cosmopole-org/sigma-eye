"use client"

import { Card } from "@nextui-org/react";
import { BottomNavItem } from "../elements/bottomnav-item";
import { hookstate, useHookstate } from "@hookstate/core";
import { useRouter } from "next/navigation";
import { switchLoading } from "@/app/api/home/layout";

export const selectedHomeSection = hookstate("city");
export const switchHomeSection = (s: string) => {
    selectedHomeSection.set(s);
}

export default function HomeBottomNav() {
    const selectedState = useHookstate(selectedHomeSection);
    const router = useRouter();
    const onItemClick = (key: string) => () => {
        selectedState.set(key);
        switchLoading(true);
        router.push(key);
    }
    return (
        <Card isBlurred className="grid grid-cols-3 fixed bottom-0 left-0 w-full h-[72px] pt-1" style={{ borderRadius: '24px 24px 0px 0px', zIndex: 100 }}>
            <BottomNavItem itemKey="people" selected={selectedState.get({ noproxy: true })} title="People" icon="gallery" onClick={onItemClick('people')} />
            <BottomNavItem itemKey="city" selected={selectedState.get({ noproxy: true })} title="City" icon="music" onClick={onItemClick('city')} />
            <BottomNavItem itemKey="settings" selected={selectedState.get({ noproxy: true })} title="Settings" icon="video" onClick={onItemClick('settings')} />
        </Card >
    )
}
