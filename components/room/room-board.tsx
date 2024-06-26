"use client"

import { getClockWidgetData, getWindowWidth, isTouchDevice } from "@/api/offline/constants";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import AppletHost from "./applet-host";
import { useHookstate } from "@hookstate/core";
import { draggingId } from "@/api/offline/states";
import { disableSwiper, enableSwiper } from "@/app/layout";

type Box = { el: HTMLDivElement | any, key: string, x: number, y: number, w: number, h: number, color: string, oldY: number }

let boxes: { [id: string]: Box } = {
    red: { el: null, key: 'red', x: 0, y: 0, w: 150, h: 150, color: '#ffffff6f', oldY: 0 },
    green: { el: null, key: 'green', x: 0, y: 150, w: 150, h: 150, color: '#ffffff6f', oldY: 150 },
    blue: { el: null, key: 'blue', x: 0, y: 300, w: 150, h: 150, color: '#ffffff6f', oldY: 300 },
    red2: { el: null, key: 'red2', x: 0, y: 450, w: 150, h: 150, color: '#ffffff6f', oldY: 450 },
    green2: { el: null, key: 'green2', x: 0, y: 600, w: 150, h: 150, color: '#ffffff6f', oldY: 600 },
    blue2: { el: null, key: 'blue2', x: 0, y: 750, w: 150, h: 150, color: '#ffffff6f', oldY: 750 }
}
let dragging: string | undefined = undefined;
let mdX = 0, mdY = 0
let x = 0, y = 0

const xColided = (b1: Box, b2: Box) => {
    return ((b1.x <= b2.x && b2.x < (b1.x + b1.w)) || (b2.x <= b1.x && b1.x < (b2.x + b2.w)))
}

const measureFinal = () => {
    let bs = Object.keys(boxes).sort((key1: string, key2: string) => (boxes[key1].y - boxes[key2].y))
    bs.forEach((k: string) => {
        const box = boxes[k]
        let newY = 0
        bs.forEach((k2: string) => {
            if (k2 !== k) {
                const temp = boxes[k2]
                if (xColided(box, temp)) {
                    if (temp.y <= box.y) {
                        if (newY < (temp.y + temp.h)) {
                            newY = (temp.y + temp.h)
                        }
                    }
                }
            }
        })
        box.y = newY >= 8 ? newY : 8
    })
    Object.keys(boxes).forEach((k: string) => {
        boxes[k].el.style.transform = `translate(${boxes[k].x}px, ${boxes[k].y}px)`
    })
}

let initialPosX = 0, initialPosY = 0, relPosX = -1, relPosY = -1;

function Board({ changeScrollLock, getSCrollY }: Readonly<{ changeScrollLock: (v: boolean) => void, getSCrollY: () => number }>) {
    let wid = 0;
    let blockWidth = 0;
    if (typeof window !== 'undefined') {
        wid = getWindowWidth();
        blockWidth = (wid - 8) / 2;
    }
    const getOffset = () => (196 + getSCrollY())
    const draggingIdState = useHookstate(draggingId);
    const [load, setLoaded] = useState(false);
    const { theme } = useTheme();
    const updateDragging = (v: string | undefined) => {
        changeScrollLock(v !== undefined);
        draggingIdState.set(v);
    }
    const shadowRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        Object.keys(boxes).forEach((k: string, index: number) => {
            boxes[k].el = (document.getElementById(k) as HTMLDivElement);
            console.log(blockWidth)
            boxes[k].w = blockWidth;
            boxes[k].h = blockWidth;
            if (index % 2 === 0) boxes[k].x = 4;
            else boxes[k].x = blockWidth + 4;
        })
        measureFinal();
        setLoaded(true);
    }, []);
    if (isTouchDevice()) {
        return (
            <div style={{ overflowX: 'hidden', width: wid - 8, height: 1000, minHeight: 1000, position: 'relative' }}>
                {
                    Object.keys(boxes).map((k: string, index: number) => (
                        <div
                            id={k}
                            style={{ border: dragging === k ? '2px solid #fff' : undefined, width: boxes[k].w, height: boxes[k].h, transform: `translate(${boxes[k].x}px, ${boxes[k].y}px)`, position: 'absolute', left: 0, top: 0, padding: 4 }}
                            onContextMenu={e => {
                                e.preventDefault();
                                disableSwiper();
                                mdX = e.clientX - 16;
                                mdY = e.clientY - getOffset();
                                const b = boxes[k]
                                if (shadowRef.current) {
                                    shadowRef.current.style.backgroundColor = b.color;
                                    shadowRef.current.style.display = 'block';
                                }
                                initialPosX = b.el.getBoundingClientRect().x - 16;
                                initialPosY = b.el.getBoundingClientRect().y - getOffset();
                                mdX = e.clientX;
                                mdY = e.clientY;
                                relPosX = mdX - b.x - 16;
                                relPosY = mdY - b.y - getOffset();
                                dragging = k
                                updateDragging(k)
                            }}
                            onTouchMove={e => {
                                if (dragging) {
                                    const clientX = e.touches[0].clientX;
                                    const clientY = e.touches[0].clientY;
                                    const b = boxes[k];
                                    b.x = clientX - mdX + initialPosX;
                                    b.y = clientY - mdY + initialPosY;
                                    if (b.x < 4) b.x = 4
                                    if ((b.x + b.w) > window.innerWidth - 4) b.x = window.innerWidth - 4 - b.w
                                    if (shadowRef.current) {
                                        shadowRef.current.style.transform = `translate(${clientX - (relPosX >= 0 ? relPosX : 25) - 16}px, ${clientY - (relPosY >= 0 ? relPosY : 25) - getOffset()}px)`;
                                    }
                                    measureFinal()
                                }
                            }}
                            onTouchEnd={() => {
                                if (dragging) {
                                    if (shadowRef.current) {
                                        shadowRef.current.style.display = 'none';
                                        shadowRef.current.style.backgroundColor = 'transparent';
                                    }
                                    relPosX = -1;
                                    relPosY = -1;
                                    dragging = undefined
                                    Object.keys(boxes).forEach((k: string) => {
                                        boxes[k].oldY = boxes[k].y
                                    })
                                    measureFinal()
                                    updateDragging(undefined)
                                    enableSwiper();
                                }
                            }}
                        >
                            <div
                                className="overflow-hidden w-full h-full rounded-xl"
                                style={{
                                    backgroundColor: dragging === k ? 'transparent' : theme === 'light' ? '#ffffff6f' : '#2828286f',
                                    display: draggingIdState.get({ noproxy: true }) === k ? 'none' : 'block'
                                }}>
                                {load ? <AppletHost.Host key={k} appletKey={k} entry="Test" index={index} code={getClockWidgetData()} /> : null}
                            </div>
                        </div>
                    ))
                }
                <div
                    ref={shadowRef}
                    className="rounded-xl"
                    style={{ transition: 'opacity 250ms', display: 'none', backgroundColor: 'transparent', width: dragging ? boxes[dragging].w : 150, height: dragging ? boxes[dragging].h : 150, transform: `translate(${x - mdX}px, ${y - mdY}px)`, position: 'absolute', left: 0, top: 0 }}
                />
            </div >
        )
    } else {
        return (
            <div className="w-full h-[1000px] absolute overlow-hidden" onMouseMove={e => {
                if (shadowRef.current) {
                    shadowRef.current.style.transform = `translate(${e.clientX - (relPosX >= 0 ? relPosX : 25) - 16}px, ${e.clientY - (relPosY >= 0 ? relPosY : 25) - getOffset()}px)`;
                }
            }}>
                {
                    Object.keys(boxes).map((k: string) => (
                        <div
                            id={k}
                            style={{ border: dragging === k ? '2px solid #fff' : undefined, width: 150, height: 150, transform: `translate(${boxes[k].x}px, ${boxes[k].y}px)`, position: 'absolute', left: 0, top: 0, padding: 4 }}

                        >
                            <div className="w-full h-full rounded-xl" style={{ backgroundColor: dragging === k ? 'transparent' : boxes[k].color }} />
                        </div>
                    ))
                }
                <div
                    ref={shadowRef}
                    className="rounded-xl"
                    style={{ backgroundColor: 'transparent', width: 150, height: 150, transform: `translate(${x - mdX}px, ${y - mdY}px)`, position: 'absolute', left: 0, top: 0 }}
                    onMouseDown={e => {
                        mdX = e.clientX - 16;
                        mdY = e.clientY - getOffset();
                        let k = Object.keys(boxes).find((key: string) => {
                            return ((boxes[key].x < mdX && (mdX < (boxes[key].x + boxes[key].w))) &&
                                (boxes[key].y < mdY && (mdY < (boxes[key].y + boxes[key].h))));
                        })
                        if (k) {
                            mdX = e.clientX;
                            mdY = e.clientY;
                            const b = boxes[k]
                            initialPosX = b.el.getBoundingClientRect().x - 16;
                            initialPosY = b.el.getBoundingClientRect().y - getOffset();
                            if (shadowRef.current) {
                                relPosX = mdX - b.x - 16;
                                relPosY = mdY - b.y - getOffset();
                                shadowRef.current.style.backgroundColor = b.color;
                            }
                            dragging = k
                            updateDragging(k)
                        }
                    }}
                    onMouseMove={e => {
                        if (dragging) {
                            const clientX = e.clientX;
                            const clientY = e.clientY;
                            const b = boxes[dragging];
                            b.x = clientX - mdX + initialPosX;
                            b.y = clientY - mdY + initialPosY;
                            measureFinal()
                        }
                    }}
                    onMouseUp={() => {
                        if (shadowRef.current) {
                            shadowRef.current.style.backgroundColor = 'transparent';
                        }
                        relPosX = -1;
                        relPosY = -1;
                        dragging = undefined
                        Object.keys(boxes).forEach((k: string) => {
                            boxes[k].oldY = boxes[k].y
                        })
                        measureFinal()
                        updateDragging(undefined)
                    }}
                />
            </div >
        )
    }
}

export default Board;
