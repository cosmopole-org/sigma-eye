"use client"

import Board from "../elements/board";
import { hookstate, useHookstate } from "@hookstate/core";
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
        blockWidth = (window.innerWidth - 16) / 2;
    }
    return (
        <div
            className="w-screen h-full fixed right-0 top-0 overflow-x-hidden"
            style={{ backgroundColor: theme === 'light' ? '#eee' : '#171717', zIndex: 50 }}
        >
            <div ref={scrollerRef} className="overflow-y-auto overflow-x-hidden relative w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                <div className="fixed top-0 left-0 overflow-hidden w-full h-full">
                    <div className="relative w-full h-full">
                        <img
                            alt="header"
                            src={theme === 'light' ?
                                'https://i.pinimg.com/564x/95/65/ac/9565acb26c627decd036b2118fdb68f3.jpg' :
                                'https://i.pinimg.com/564x/88/f5/46/88f546fea513dc0e73bccefe3ac92eef.jpg'}
                            className="object-cover w-full h-full absolute left-0 top-0"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <RoomNavbar />
                    <div className="w-full h-auto px-2 py-1 relative" style={{ minHeight: 1000 }}>
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
                </div>
                <RoomBottomNav />
            </div>
        </div >
    )
}