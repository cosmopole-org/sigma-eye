
import React from "react";
import HomePeopleList from "@/components/home/home-people-list";
import HomeNavbar from "@/components/home/home-navbar";

export default function People() {
    return (
        <div className="w-full relative">
            <HomeNavbar />
            <HomePeopleList />
        </div>
    );
}
