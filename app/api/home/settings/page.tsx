"use client"

import React, { useEffect } from "react";
import HomeSettings from "@/components/home/home-settings";
import { getHomeSettingsScrollPos } from "@/api/offline/backup";
import { switchLoading } from "../layout";

export default function Settings() {
    useEffect(() => {
        document.documentElement.scrollTop = getHomeSettingsScrollPos();
        switchLoading(false)
    }, [])
    return <HomeSettings />
}