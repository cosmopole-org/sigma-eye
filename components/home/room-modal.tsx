"use client"

import Board from "../elements/board";
import { Avatar, Card, Image } from "@nextui-org/react";
import { hookstate, useHookstate } from "@hookstate/core";
import IconButton from "../elements/icon-button";
import { getUsers } from "@/api/offline/constants";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import RoomBottomNav from "./room-bottomnav";
import RoomNavbar from "./room-navbar";

export const roomModalView = hookstate(false);

export const switchRoomModal = (v: boolean) => {
    roomModalView.set(v);
}

export default function RoomModal() {
    const open = useHookstate(roomModalView);
    const [dis, setDis] = useState(false);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    useEffect(() => {
        if (!open.get({ noproxy: true })) {
            setTimeout(() => {
                setDis(false);
            }, 250);
        } else {
            setDis(true);
        }
    }, [open.get({ noproxy: true })]);
    let blockWidth = 0;
    if (typeof window !== 'undefined') {
        blockWidth = (window.innerWidth - 32) / 2;
    }
    return (
        <div
            style={{ backgroundColor: theme === 'light' ? '#eee' : '#171717', display: dis || open.get({ noproxy: true }) ? 'block' : 'none', zIndex: 50, transform: dis && open.get({ noproxy: true }) ? 'translateX(0px)' : 'translateX(50%)', opacity: dis && open.get({ noproxy: true }) ? 1 : 0, transition: 'transform 250ms, opacity 250ms' }}
            className="w-screen h-full fixed right-0 top-0 overflow-x-hidden"
        >
            <div ref={scrollerRef} className="overflow-y-auto overflow-x-hidden relative w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                <div className="absolute top-0 left-0 overflow-hidden w-full h-[328px]">
                    <div className="relative w-full h-full">
                        <img
                            alt="header"
                            src={theme === 'light' ? 'https://i.pinimg.com/564x/c2/fc/8b/c2fc8b9c90dd6cdfd10cc8a0bd09fcd2.jpg' : 'https://i.pinimg.com/564x/68/b7/e3/68b7e332736b1953a4bd11e72675bf17.jpg'}
                            className="object-cover w-full h-full absolute left-0 top-0"
                        />
                    </div>
                </div>
                <RoomNavbar />
                <Card className="h-12 mt-[252px] ml-4 p-1" style={{ width: 150, borderRadius: 24, backgroundColor: theme === 'light' ? '#fff' : '#282828' }}>
                    <div className="w-full h-full flex">
                        <Avatar src={getUsers()[0].avatar} />
                        <span className="ml-2 mt-2 text-lg"> Room 1</span>
                    </div>
                </Card>
                <div className="w-full h-auto px-4 py-4 mt-[16px] relative" style={{ minHeight: 1000, borderRadius: '16px 16px 0px 0px', backgroundColor: theme === 'light' ? '#eee' : '#171717' }}>
                    {
                        open.get({ noproxy: true }) ? (
                            <Board
                                blockWidth={blockWidth}
                                scrolled={(diff: number) => {
                                    if (scrollerRef.current) {
                                        scrollerRef.current.scrollTop += diff;
                                    }
                                }}
                                changeScrollLock={(v: boolean) => {
                                    if (scrollerRef.current) {
                                        scrollerRef.current.style.overflow = v ? 'hidden' : 'auto';
                                    }
                                }}
                                getSCrollY={() => {
                                    return (scrollerRef.current?.scrollTop ?? 0);
                                }} />
                        ) : null
                    }
                </div>
                <RoomBottomNav />
            </div>
        </div >
    )
}