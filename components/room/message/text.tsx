'use client'

import { getUsers } from "@/api/offline/constants";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React from "react";

export default function TextMessage({ rightSide }: Readonly<{ rightSide: boolean }>) {
    const { theme } = useTheme();
    return (
        <Card isBlurred className={"max-w-[300px] mt-2 " + (rightSide ? 'mr-0 ml-auto' : '')} style={{ backgroundColor: theme === 'light' ? undefined : '#171717bf', borderRadius: rightSide ? '24px 4px 24px 24px' : '4px 24px 24px 24px' }}>
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={getUsers()[4].avatar} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                        <h5 className="text-small tracking-tight text-default-500">@zoeylang</h5>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-hidden px-3 py-0 text-small text-default-900">
                <p>
                    Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                    {
                        rightSide ? `
                                Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
                            `  :
                            ''
                    }
                </p>
                <span className="pt-2">
                    #FrontendWithZoey
                    <span className="py-2" aria-label="computer" role="img">
                        💻
                    </span>
                </span>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                    <Chip
                        variant="flat"
                        avatar={
                            <span aria-label="computer" role="img">
                                😺
                            </span>
                        }
                    >
                        5.4k
                    </Chip>
                    <Chip
                        variant="flat"
                        avatar={
                            <span aria-label="computer" role="img">
                                😜
                            </span>
                        }
                    >
                        3.5k
                    </Chip>
                    <Chip
                        variant="flat"
                        avatar={
                            <span aria-label="computer" role="img">
                                😎
                            </span>
                        }
                    >
                        7.2k
                    </Chip>
                </div>
            </CardFooter>
        </Card>
    )
}