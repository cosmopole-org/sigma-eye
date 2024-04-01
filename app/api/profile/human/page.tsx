"use client"

import { getUsers } from "@/api/offline/constants";
import Icon from "@/components/elements/icon";
import IconButton from "@/components/elements/icon-button";
import { Avatar, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function HumanProfile() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={containerRef} className="w-full h-full relative">
            <IconButton name="back" className="mt-4 ml-4" onClick={() => router.back()} />
            <div className="fixed top-14 left-0 overflow-hidden w-full h-auto">
                <Avatar className="w-32 h-32 ml-auto mr-auto mt-12" src={getUsers()[0].avatar} />
                <p className="text-xl text-center w-full mt-6">Edward Kasperian</p>
            </div>
            <div className="justify-center flex w-full h-auto mt-64 pl-4 pr-4 gap-4">
                <Button className="text-lg">
                    <Icon name='message' size={[24, 24]} />
                    Chat
                </Button>
                <Button className="text-lg">
                    <Icon name='call' size={[24, 24]} />
                    Call
                </Button>
                <Button className="text-lg">
                    <Icon name='block' size={[24, 24]} />
                    Block
                </Button>
            </div>
        </div>
    );
}
