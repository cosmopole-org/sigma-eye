"use client"

import { DrawerItemProps, NavbarItemProps } from "@/types";
import { Navbar } from "../navbar";
import Drawer from "../elements/drawer";
import { useState } from "react";
import { useTheme } from "next-themes";
import Emulator from "../device/emulator";

export default function MenuLayout({ drawerItems, navItems, routeKey, showEmulator = true, children }: Readonly<{ showEmulator?: boolean, drawerItems: DrawerItemProps[], navItems: NavbarItemProps[], routeKey: string, children?: any }>) {
    const [open, setOpen] = useState(false)
    const { theme } = useTheme()
    return (
        <div className="w-full h-full flex" style={{ backgroundColor: theme === 'light' ? '#f3e8ff' : '#111' }}>
            <Drawer open={open} onOpenStateChange={(o: boolean) => setOpen(o)} items={drawerItems} />
            <div className={`w-full ${open ? 'ml-72' : 'ml-20'}`} style={{ transition: 'margin-left 250ms' }}>
                <Navbar routeKey={routeKey} items={navItems} />
                <div className="w-full flex overflow-hidden">
                    <div className="flex-1 h-full overflow-y-auto">
                        {children}
                    </div>
                    {showEmulator ? <div style={{ width: 425 }} /> : null}
                    {showEmulator ? <Emulator /> : null}
                </div>
            </div>
        </div>
    )
}
