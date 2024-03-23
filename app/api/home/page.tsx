"use client"

import React, { useReducer, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, Input, Navbar, NavbarContent, Avatar, Divider, Card, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Icon from "@/components/elements/icon";
import { ThemeSwitch } from "@/components/theme-switch";
import IconButton from "@/components/elements/icon-button";

const SearchIcon = ({
    size = 24,
    strokeWidth = 1.5,
    color,
    ...props
}: { size?: number, strokeWidth?: number, color?: string }) => (
    <svg
        color={color}
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

const GalleryIcon = (props: any) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height="24"
        role="presentation"
        viewBox="0 0 24 24"
        width="24"
        fill="none"
        {...props}
    >
        <path d="M2.58078 19.0112L2.56078 19.0312C2.29078 18.4413 2.12078 17.7713 2.05078 17.0312C2.12078 17.7613 2.31078 18.4212 2.58078 19.0112Z" fill="currentColor" />
        <path d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z" fill="currentColor" />
        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z" fill="currentColor" />
    </svg>
);

const MusicIcon = (props: any) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height="24"
        role="presentation"
        viewBox="0 0 24 24"
        width="24"
        fill="none"
        {...props}
    >
        <path d="M9.66984 13.9219C8.92984 13.9219 8.33984 14.5219 8.33984 15.2619C8.33984 16.0019 8.93984 16.5919 9.66984 16.5919C10.4098 16.5919 11.0098 15.9919 11.0098 15.2619C11.0098 14.5219 10.4098 13.9219 9.66984 13.9219Z" fill="currentColor" />
        <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.12 9.8C17.12 10.41 16.86 10.95 16.42 11.27C16.14 11.47 15.8 11.58 15.44 11.58C15.23 11.58 15.02 11.54 14.8 11.47L12.51 10.71C12.5 10.71 12.48 10.7 12.47 10.69V15.25C12.47 16.79 11.21 18.05 9.67 18.05C8.13 18.05 6.87 16.79 6.87 15.25C6.87 13.71 8.13 12.45 9.67 12.45C10.16 12.45 10.61 12.59 11.01 12.8V8.63V8.02C11.01 7.41 11.27 6.87 11.71 6.55C12.16 6.23 12.75 6.15 13.33 6.35L15.62 7.11C16.48 7.4 17.13 8.3 17.13 9.2V9.8H17.12Z" fill="currentColor" />
    </svg>
);

const VideoIcon = (props: any) => (
    <svg
        aria-hidden="true"
        focusable="false"
        height="24"
        role="presentation"
        viewBox="0 0 24 24"
        width="24"
        fill="none"
        {...props}
    >
        <path d="M14.7295 2H9.26953V6.36H14.7295V2Z" fill="currentColor" />
        <path d="M16.2305 2V6.36H21.8705C21.3605 3.61 19.3305 2.01 16.2305 2Z" fill="currentColor" />
        <path d="M2 7.85938V16.1894C2 19.8294 4.17 21.9994 7.81 21.9994H16.19C19.83 21.9994 22 19.8294 22 16.1894V7.85938H2ZM14.44 16.1794L12.36 17.3794C11.92 17.6294 11.49 17.7594 11.09 17.7594C10.79 17.7594 10.52 17.6894 10.27 17.5494C9.69 17.2194 9.37 16.5394 9.37 15.6594V13.2594C9.37 12.3794 9.69 11.6994 10.27 11.3694C10.85 11.0294 11.59 11.0894 12.36 11.5394L14.44 12.7394C15.21 13.1794 15.63 13.7994 15.63 14.4694C15.63 15.1394 15.2 15.7294 14.44 16.1794Z" fill="currentColor" />
        <path d="M7.76891 2C4.66891 2.01 2.63891 3.61 2.12891 6.36H7.76891V2Z" fill="currentColor" />
    </svg>
);

export default function Home() {
    const [showingRooms, setShowingRooms] = useState(false)
    const [showingRoom, setShowingRoom] = useState(false)
    return (
        <div className="w-full h-full">
            <Navbar shouldHideOnScroll={!showingRooms} className="pt-8 h-44 pb-12">
                <NavbarContent as="div" className="items-center w-full" justify="start">
                    <div className="mt-8 w-full">
                        <div className="flex pl-1">
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
                                mainWrapper: "items-center h-full",
                                input: "text-small text-center",
                                inputWrapper: "items-center mt-4 h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-3xl",
                            }}
                            placeholder="Type to search..."
                            size="md"
                            startContent={<SearchIcon size={18} />}
                            type="search"
                            style={{ marginLeft: -1 }}
                        />
                        <Tabs color={"primary"} radius="full" aria-label="Tabs colors" fullWidth className="mt-7 -ml-2" style={{ width: 'calc(100% + 16px)' }}>
                            <Tab key="photos" title={
                                <div className="flex items-center space-x-2">
                                    <GalleryIcon />
                                    <span>Photos</span>
                                </div>
                            } />
                            <Tab key="music" title={
                                <div className="flex items-center space-x-2">
                                    <MusicIcon />
                                    <span>Music</span>
                                </div>
                            } />
                            <Tab key="videos" title={
                                <div className="flex items-center space-x-2">
                                    <VideoIcon />
                                    <span>Videos</span>
                                </div>
                            } />
                            <Tab key="photos2" title={
                                <div className="flex items-center space-x-2">
                                    <GalleryIcon />
                                    <span>Photos</span>
                                </div>
                            } />
                            <Tab key="music2" title={
                                <div className="flex items-center space-x-2">
                                    <MusicIcon />
                                    <span>Music</span>
                                </div>
                            } />
                            <Tab key="videos2" title={
                                <div className="flex items-center space-x-2">
                                    <VideoIcon />
                                    <span>Videos</span>
                                </div>
                            } />
                        </Tabs>
                    </div>
                </NavbarContent>
            </Navbar >
            <div
                className={"relative w-full h-full overflow-scroll pl-4 pr-4"}
            >
                {users.map(item => (
                    <Card onClick={() => {
                        setShowingRooms(true)
                    }} className="mt-4 m-h-16 w-full bg-transparent" key={item.id} isPressable shadow="none">
                        <div className="flex gap-2 w-full">
                            <Avatar alt={item.name} className="" size="lg" src={item.avatar} />
                            <div className="flex flex-col">
                                <span className="text-lg text-left">{item.name}</span>
                                <span className="text-md text-default-400 text-left">{item.email}</span>
                            </div>
                        </div>
                    </Card>
                ))}
                <Card className="fixed top-44 h-full" style={{
                    width: 'calc(100% - 78px)', height: 'calc(100% - 176px)', borderRadius: '24px 0px 0px 0px',
                    transition: 'right 500ms', right: showingRooms ? 0 : '-100%'
                }}>
                    <Card radius="none" className="h-10">
                        <div className="flex h-full">
                            <IconButton name="back" size={[20, 20]} onClick={() => setShowingRooms(false)} />
                            <p className="mt-2">
                                Tower rooms
                            </p>
                        </div>
                    </Card>
                    <div
                        className={"relative w-full overflow-scroll pl-4 pr-4"}
                        style={{ height: 'calc(100% - 40px)' }}
                    >
                        {users.map(item => (
                            <Card onClick={() => {
                                setShowingRoom(true)
                            }} className="mt-4 m-h-16 w-full bg-transparent" key={item.id} isPressable shadow="none">
                                <div className="flex gap-2 w-full">
                                    <Avatar alt={item.name} className="" size="sm" src={item.avatar} />
                                    <div className="flex flex-col">
                                        <span className="text-md text-left">{item.name}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>
            <Tabs color={"primary"} radius="full" aria-label="Tabs colors" fullWidth className="fixed top-4 left-4" style={{ width: 'calc(100% - 32px)' }}>
                <Tab key="photos" title={
                    <div className="flex items-center space-x-2">
                        <GalleryIcon />
                        <span>Photos</span>
                    </div>
                } />
                <Tab key="music" title={
                    <div className="flex items-center space-x-2">
                        <MusicIcon />
                        <span>Music</span>
                    </div>
                } />
                <Tab key="videos" title={
                    <div className="flex items-center space-x-2">
                        <VideoIcon />
                        <span>Videos</span>
                    </div>
                } />
                <Tab key="photos2" title={
                    <div className="flex items-center space-x-2">
                        <GalleryIcon />
                        <span>Photos</span>
                    </div>
                } />
                <Tab key="music2" title={
                    <div className="flex items-center space-x-2">
                        <MusicIcon />
                        <span>Music</span>
                    </div>
                } />
                <Tab key="videos2" title={
                    <div className="flex items-center space-x-2">
                        <VideoIcon />
                        <span>Videos</span>
                    </div>
                } />
            </Tabs>
            <Tabs defaultSelectedKey={'city'} color={"primary"} radius="full" aria-label="Tabs colors" fullWidth className="fixed bottom-2 left-2" style={{ width: 'calc(100% - 16px)' }}>
                <Tab key="people" className="h-13" title={
                    <div className="items-center">
                        <GalleryIcon width={20} height={20} />
                        <span style={{ marginLeft: -8 }} className="text-xs">People</span>
                    </div>
                } />
                <Tab key="city" className="h-13" title={
                    <div className="items-center">
                        <MusicIcon width={20} height={20} />
                        <span style={{ marginLeft: -1 }} className="text-xs">City</span>
                    </div>
                } />
                <Tab key="settings" className="h-13" title={
                    <div className="items-center">
                        <VideoIcon width={20} height={20} />
                        <span style={{ marginLeft: -11 }} className="text-xs">Settings</span>
                    </div>
                } />
            </Tabs>
            <Modal
                placement="bottom"
                size={'full'}
                isOpen={showingRoom}
                onClose={() => setShowingRoom(false)}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                Room 1
                            </ModalHeader>
                            <ModalBody className="overflow-auto">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                                <Tabs defaultSelectedKey={'board'} color={"primary"} radius="full" aria-label="Tabs colors" fullWidth className="fixed bottom-2 left-2" style={{ width: 'calc(100% - 16px)' }}>
                                    <Tab key="board" className="h-13" title={
                                        <div className="items-center">
                                            <GalleryIcon width={20} height={20} />
                                            <span style={{ marginLeft: -8 }} className="text-xs">Board</span>
                                        </div>
                                    } />
                                    <Tab key="chat" className="h-13" title={
                                        <div className="items-center">
                                            <MusicIcon width={20} height={20} />
                                            <span style={{ marginLeft: -1 }} className="text-xs">Chat</span>
                                        </div>
                                    } />
                                    <Tab key="files" className="h-13" title={
                                        <div className="items-center">
                                            <VideoIcon width={20} height={20} />
                                            <span style={{ marginLeft: -11 }} className="text-xs">Files</span>
                                        </div>
                                    } />
                                </Tabs>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
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