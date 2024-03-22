"use client"

import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Navbar, NavbarContent, Avatar, Divider, Card, Tabs, Tab } from "@nextui-org/react";
import Icon from "@/components/elements/icon";
import { ThemeSwitch } from "@/components/theme-switch";

const SearchIcon = ({
    size = 24,
    strokeWidth = 1.5,
    ...props
}) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size}
        role="presentation"
        viewBox="0 0 24 24"
        width={size}
        {...props}
    >
        <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
        />
        <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
        />
    </svg>
);

export default function Home() {
    return (
        <div className="w-full h-full">
            <Navbar shouldHideOnScroll className="pt-8 h-52 pb-16">
                <NavbarContent as="div" className="items-center w-full" justify="start">
                    <div className="mt-8 pt-4 w-full">
                        <div className="flex pl-2">
                            <Popover backdrop="blur" placement="bottom-start" showArrow offset={10}>
                                <PopoverTrigger>
                                    <Avatar
                                        isBordered
                                        as={"button"}
                                        className={"transition-transform"}
                                        color={"primary"}
                                        name={"Jason Hughes"}
                                        size={"sm"}
                                        src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                                    />
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px]">
                                    <div className="px-1 py-2 w-full">
                                        <p className="text-sm text-foreground">
                                            Hawk Cosmopole
                                        </p>
                                        <p className="mb-4 text-sm font-bold text-foreground">
                                            @hawk_cosmopole
                                        </p>
                                        <Divider />
                                        <div className="mt-2 mb-2 flex flex-col gap-2 w-full">
                                            <Button
                                                key="delete1"
                                                className="pl-0 text-left bg-transparent"
                                            >
                                                <Icon name="add" color={'#fff'} />
                                                Delete file
                                                <div className="flex-1" />
                                            </Button>
                                            <Button
                                                key="delete2"
                                                className="pl-0 text-left bg-transparent"
                                            >
                                                <Icon name="add" color={'#fff'} />
                                                Delete file
                                                <div className="flex-1" />
                                            </Button>
                                            <Button
                                                key="delete3"
                                                className="pl-0 text-left bg-transparent"
                                            >
                                                <Icon name="add" color={'#fff'} />
                                                Delete file
                                                <div className="flex-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <p className="text-xl flex-1 text-center">
                                Sigma
                            </p>
                            <ThemeSwitch className="-mt-1" />
                        </div>
                        <Input
                            classNames={{
                                base: "max-w-full sm:max-w-[10rem] h-10",
                                mainWrapper: "h-full",
                                input: "text-small",
                                inputWrapper: "mt-7 h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-3xl",
                            }}
                            placeholder="Type to search..."
                            size="md"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                        />
                        <Tabs color={"primary"} aria-label="Tabs colors" radius="full" fullWidth className="mt-12 -ml-2" style={{ width: 'calc(100% + 16px)' }}>
                            <Tab key="photos" title="Photos" />
                            <Tab key="music" title="Music" />
                            <Tab key="videos" title="Videos" />
                            <Tab key="photos2" title="Photos" />
                            <Tab key="music2" title="Music" />
                            <Tab key="videos2" title="Videos" />
                        </Tabs>
                    </div>
                </NavbarContent>
            </Navbar >
            <div
                className={"w-full h-full overflow-scroll pl-4 pr-4"}
            >
                {users.map(item => (
                    <Card className="mt-4 m-h-16 w-full bg-transparent" key={item.id} isPressable shadow="none">
                        <div className="flex gap-2 w-full">
                            <Avatar alt={item.name} className="" size="lg" src={item.avatar} />
                            <div className="flex flex-col">
                                <span className="text-lg text-left">{item.name}</span>
                                <span className="text-md text-default-400 text-left">{item.email}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            <Tabs color={"primary"} radius="full" fullWidth className="fixed top-4 left-4" style={{ width: 'calc(100% - 32px)' }}>
                <Tab key="photos" title="Photos" />
                <Tab key="music" title="Music" />
                <Tab key="videos" title="Videos" />
                <Tab key="photos2" title="Photos" />
                <Tab key="music2" title="Music" />
                <Tab key="videos2" title="Videos" />
            </Tabs>
            <Card isBlurred fullWidth className="grid grid-cols-3 fixed bottom-0 left-0 right-0 w-full h-16 rounded-none">
                <Card shadow="none" isPressable className="items-center justify-center bg-transparent col-span-1 rounded-none">
                    <SearchIcon />
                    People
                </Card>
                <Card shadow="none" isPressable className="items-center justify-center bg-transparent col-span-1 rounded-none">
                    <SearchIcon />
                    City
                </Card>
                <Card shadow="none" isPressable className="items-center justify-center bg-transparent col-span-1 rounded-none">
                    <SearchIcon />
                    Settings
                </Card>
            </Card>
        </div>
    );
}

const users = [
    {
        id: 1,
        name: "Tony Reichert",
        role: "CEO",
        team: "Management",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        email: "tony.reichert@example.com",
    },
    {
        id: 2,
        name: "Zoey Lang",
        role: "Tech Lead",
        team: "Development",
        status: "paused",
        age: "25",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
        email: "zoey.lang@example.com",
    },
    {
        id: 3,
        name: "Jane Fisher",
        role: "Sr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
        email: "jane.fisher@example.com",
    },
    {
        id: 4,
        name: "William Howard",
        role: "C.M.",
        team: "Marketing",
        status: "vacation",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
        email: "william.howard@example.com",
    },
    {
        id: 5,
        name: "Kristen Copper",
        role: "S. Manager",
        team: "Sales",
        status: "active",
        age: "24",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
        email: "kristen.cooper@example.com",
    },
    {
        id: 6,
        name: "Brian Kim",
        role: "P. Manager",
        team: "Management",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
        email: "brian.kim@example.com",
        status: "Active",
    },
    {
        id: 7,
        name: "Michael Hunt",
        role: "Designer",
        team: "Design",
        status: "paused",
        age: "27",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
        email: "michael.hunt@example.com",
    },
    {
        id: 8,
        name: "Samantha Brooks",
        role: "HR Manager",
        team: "HR",
        status: "active",
        age: "31",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
        email: "samantha.brooks@example.com",
    },
    {
        id: 9,
        name: "Frank Harrison",
        role: "F. Manager",
        team: "Finance",
        status: "vacation",
        age: "33",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
        email: "frank.harrison@example.com",
    },
    {
        id: 10,
        name: "Emma Adams",
        role: "Ops Manager",
        team: "Operations",
        status: "active",
        age: "35",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
        email: "emma.adams@example.com",
    },
    {
        id: 11,
        name: "Brandon Stevens",
        role: "Jr. Dev",
        team: "Development",
        status: "active",
        age: "22",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
        email: "brandon.stevens@example.com",
    },
    {
        id: 12,
        name: "Megan Richards",
        role: "P. Manager",
        team: "Product",
        status: "paused",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
        email: "megan.richards@example.com",
    },
    {
        id: 13,
        name: "Oliver Scott",
        role: "S. Manager",
        team: "Security",
        status: "active",
        age: "37",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
        email: "oliver.scott@example.com",
    },
    {
        id: 14,
        name: "Grace Allen",
        role: "M. Specialist",
        team: "Marketing",
        status: "active",
        age: "30",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
        email: "grace.allen@example.com",
    },
    {
        id: 15,
        name: "Noah Carter",
        role: "IT Specialist",
        team: "I. Technology",
        status: "paused",
        age: "31",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
        email: "noah.carter@example.com",
    },
    {
        id: 16,
        name: "Ava Perez",
        role: "Manager",
        team: "Sales",
        status: "active",
        age: "29",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
        email: "ava.perez@example.com",
    },
    {
        id: 17,
        name: "Liam Johnson",
        role: "Data Analyst",
        team: "Analysis",
        status: "active",
        age: "28",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
        email: "liam.johnson@example.com",
    },
    {
        id: 18,
        name: "Sophia Taylor",
        role: "QA Analyst",
        team: "Testing",
        status: "active",
        age: "27",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
        email: "sophia.taylor@example.com",
    },
    {
        id: 19,
        name: "Lucas Harris",
        role: "Administrator",
        team: "Information Technology",
        status: "paused",
        age: "32",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
        email: "lucas.harris@example.com",
    },
    {
        id: 20,
        name: "Mia Robinson",
        role: "Coordinator",
        team: "Operations",
        status: "active",
        age: "26",
        avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
        email: "mia.robinson@example.com",
    },
];