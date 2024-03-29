"use client"

import Board from "../elements/board";
import { Card, Image } from "@nextui-org/react";
import { hookstate, useHookstate } from "@hookstate/core";
import IconButton from "../elements/icon-button";
import { getUsers } from "@/api/offline/constants";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import RoomBottomNav from "./room-bottomnav";

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
            style={{ backgroundColor: theme === 'light' ? '#fff' : '#171717', display: dis || open.get({ noproxy: true }) ? 'block' : 'none', zIndex: 50, transform: dis && open.get({ noproxy: true }) ? 'translateX(0px)' : 'translateX(0px)', opacity: dis && open.get({ noproxy: true }) ? 1 : 1, transition: 'transform 250ms, opacity 250ms' }}
            className="w-screen h-full fixed right-0 top-0"
        >
            <div ref={scrollerRef} className="overflow-y-auto overflow-x-hidden relative w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                <div className="absolute top-4 left-4 overflow-hidden" style={{ width: 'calc(100% - 32px)', height: 270, borderRadius: 32 }}>
                    <div className="relative w-full h-full">
                        <Card isBlurred className="rounded-full w-auto h-auto flex absolute left-2 top-2">
                            <IconButton name="back" onClick={() => {
                                open.set(false);
                            }} />
                        </Card>
                        <Card isBlurred className="pr-12 w-auto h-[48px] flex absolute left-[8px] bottom-[8px]" style={{ borderRadius: 32 }}>
                            <Image width={48} height={48} src={getUsers()[0].avatar} radius="full" isBlurred className="p-1" />
                            <span className="-mt-12 ml-[50px] text-lg">Library</span>
                            <span className="ml-[50px] -mt-1 text-sm">Welcome to Library!</span>
                        </Card>
                    </div>
                </div>
                <div className="overflow-hidden w-full h-auto px-4 py-6 mt-[268px] relative" style={{ minHeight: 1000, borderRadius: '24px 24px 0px 0px' }}>
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
                </div>
                <RoomBottomNav />
            </div>
        </div >
    )
}