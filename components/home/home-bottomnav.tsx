"use client"

import { Card } from "@nextui-org/react";
import Icon from "../elements/icon";
import { useState } from "react";
import { useTheme } from "next-themes";

function BottomNavItem({ selected, itemKey, icon, title, onClick }: Readonly<{ onClick?: () => void, title?: string, icon?: string, selected: string | undefined, itemKey: string | undefined }>) {
    const isCurrent = selected === itemKey;
    const { theme } = useTheme()
    return (
        <Card className="items-center bg-transparent pt-2 h-full" isPressable shadow="none" onClick={onClick}>
            {
                icon ? (
                    <div className={isCurrent ? "rounded-2xl bg-primary px-4" : ""} style={{ paddingTop: isCurrent ? 3 : 0, paddingBottom: isCurrent ? 3 : 0, transform: isCurrent ? 'scale(1.15)' : 'scale(1)', transition: 'transform 250ms' }}>
                        <Icon name={icon} size={isCurrent ? [22, 22] : [24, 24]} color={(isCurrent || theme === 'dark') ? '#fff' : '#000'} />
                    </div>
                ) : null
            }
            <span className="text-sm mt-1">{title ?? null}</span>
        </Card >

    )
}

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
