"use client"

import React, { useEffect } from "react";
import HomePeopleList from "@/components/home/home-people-list";
import { getHomePeopleScrollPos } from "@/api/offline/backup";
import { switchLoading } from "../layout";
import HomeNavbar from "@/components/home/home-navbar";

export default function People() {
    useEffect(() => {
        document.documentElement.scrollTop = getHomePeopleScrollPos();
        switchLoading(false)
    }, [])
    return (
        <div className="w-full relative">
            <HomeNavbar />
            <HomePeopleList />
        </div>
    );
}
