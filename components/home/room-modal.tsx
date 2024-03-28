"use client"

import Board from "../elements/board";
import { Card, Image } from "@nextui-org/react";
import { hookstate } from "@hookstate/core";
import IconButton from "../elements/icon-button";
import { useRouter } from "next/navigation";
import { getUsers } from "@/api/offline/constants";
import { useRef } from "react";

export const roomModalView = hookstate(false);

export const switchRoomModal = (v: boolean) => {
    roomModalView.set(v);
}

export default function RoomModal() {
    const router = useRouter();
    const scrollerRef = useRef<HTMLDivElement>(null);
    return (
        <Card
            radius="none"
            className={"w-full h-full absolute right-0 top-0"} style={{ zIndex: 100 }}
        >
            <div ref={scrollerRef} className="overflow-auto relative w-full h-full" style={{ overscrollBehavior: 'contain' }}>
                <div className="fixed" style={{ minHeight: 270 }}>
                    <img
                        alt="header"
                        src={'/images/photos/header.jpg'}
                        className="object-cover"
                        style={{ width: '100%', height: 300 }}
                    />
                    <Card isBlurred className="rounded-full w-auto h-auto flex absolute left-2 top-2">
                        <IconButton name="back" onClick={() => {
                            router.push('/api/home/city');
                        }} />
                    </Card>
                    <Card isBlurred className="dark:bg-zinc-100 pr-12 w-auto h-[64px] flex absolute left-[8px] bottom-[40px]" style={{ borderRadius: 32 }}>
                        <Image width={64} height={64} src={getUsers()[0].avatar} radius="full" isBlurred className="p-2" />
                        <span className="-mt-14 ml-[64px] text-xl">Library</span>
                        <span className="ml-[64px] text-sm">Welcome to Library!</span>
                    </Card>
                </div>
                <Card className="w-full h-auto px-4 py-6 mt-[268px]" style={{ minHeight: 1000, borderRadius: '24px 24px 0px 0px' }}>
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
                </Card>
            </div>
        </Card>
    )
}