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
    return (
        <div
            style={{ display: dis || open.get({ noproxy: true }) ? 'block' : 'none', zIndex: 50, transform: dis && open.get({ noproxy: true }) ? 'translateX(0px)' : 'translateX(50%)', opacity: dis && open.get({ noproxy: true }) ? 1 : 0, transition: 'transform 250ms, opacity 250ms' }}
            className="w-screen h-full fixed right-0 top-0"
        >
            <div ref={scrollerRef} className="overflow-y-auto overflow-x-hidden relative w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                <div className="fixed" style={{ minHeight: 270 }}>
                    <img
                        alt="header"
                        src={'/images/photos/header.jpg'}
                        className="object-cover"
                        style={{ width: '100%', height: 300 }}
                    />
                    <Card isBlurred className="rounded-full w-auto h-auto flex absolute left-2 top-2">
                        <IconButton name="back" onClick={() => {
                            open.set(false);
                        }} />
                    </Card>
                    <Card isBlurred className="dark:bg-zinc-100 pr-12 w-auto h-[64px] flex absolute left-[8px] bottom-[40px]" style={{ borderRadius: 32 }}>
                        <Image width={64} height={64} src={getUsers()[0].avatar} radius="full" isBlurred className="p-2" />
                        <span className="-mt-14 ml-[64px] text-xl">Library</span>
                        <span className="ml-[64px] text-sm">Welcome to Library!</span>
                    </Card>
                </div>
                <div className="overflow-hidden w-full h-auto px-4 py-6 mt-[268px] relative" style={{ minHeight: 1000, borderRadius: '24px 24px 0px 0px', backgroundColor: theme === 'light' ? '#fff' : '#171717' }}>
                    <Board
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