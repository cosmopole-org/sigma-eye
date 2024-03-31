'use client'

import { getUsers } from "@/api/offline/constants";
import Icon from "@/components/elements/icon";
import IconButton from "@/components/elements/icon-button";
import { HeartFilledIcon } from "@/components/icons";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Chip, Image, Slider, Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React from "react";

export default function AudioMessage({ rightSide }: Readonly<{ rightSide: boolean }>) {
    const { theme } = useTheme();
    return (
        <Card isPressable isBlurred className={"min-w-[300px] max-w-[300px] mt-2 " + (rightSide ? 'mr-0 ml-auto' : '')} style={{ backgroundColor: theme === 'light' ? undefined : '#171717bf', borderRadius: rightSide ? '24px 4px 24px 24px' : '4px 24px 24px 24px' }}>
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="flex flex-col col-span-6 md:col-span-8 relative">
                        <div className="flex justify-between items-start">
                            <Image
                                alt="Album cover"
                                className="object-cover"
                                height={56}
                                shadow="md"
                                src="https://nextui.org/images/album-cover.png"
                                width={56}
                            />
                            <div className="flex flex-col gap-0 ml-3 mr-auto mt-1">
                                <h3 className="font-semibold text-foreground/90">Age ye rooz</h3>
                                <p className="text-small text-foreground/80">Faramarz Aslani</p>
                            </div>
                        </div>
                        <IconButton name="play" className="absolute right-2 top-2" />
                        <div className="flex flex-col mt-3 gap-1">
                            <Waveform
                                style={{ width: 128, position: 'absolute', left: 60, top: 8, height: 56 }}
                                docId={props.message.data.docId}
                                tag={`${props.room.id}-${props.message.id}-waveform`}
                                room={props.room}
                                isPreview={true}
                            />
                            <div className="flex justify-between">
                                <p className="text-small">1:23</p>
                                <p className="text-small text-foreground/50">4:32</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}