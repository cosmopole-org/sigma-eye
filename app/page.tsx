"use client"

import React, { MouseEvent, useEffect, useState } from "react";

type Box = { el: HTMLDivElement | any, x: number, y: number, w: number, h: number, color: string, oldY: number }

let boxes: { [id: string]: Box } = {
	red: { el: null, x: 0, y: 0, w: 150, h: 150, color: 'red', oldY: 0 },
	green: { el: null, x: 200, y: 0, w: 150, h: 150, color: 'green', oldY: 0 },
	blue: { el: null, x: 0, y: 200, w: 150, h: 150, color: 'blue', oldY: 0 }
}
let dragging: string | undefined = undefined;
let mdX = 0, mdY = 0
let x = 0, y = 0

const xColided = (b1: Box, b2: Box) => {
	return ((b1.x <= b2.x && b2.x <= (b1.x + b1.w)) || (b2.x <= b1.x && b1.x <= (b2.x + b2.w)))
}

const yColided = (b1: Box, b2: Box, options?: { compareWithOld?: boolean, softColided?: boolean }) => {
	if (options?.compareWithOld) {
		if (options?.softColided) {
			const heg = Math.abs((b1.y + (b1.h / 2)) - (b2.oldY + (b2.h / 2)))
			return (heg < (b2.h / 2))
		} else {
			return ((b1.y <= b2.oldY && b2.oldY <= (b1.y + b1.h)) || (b2.oldY <= b1.y && b1.y <= (b2.oldY + b2.h)))
		}
	} else {
		if (options?.softColided) {
			const heg = Math.abs((b1.y + (b1.h / 2)) - (b2.y + (b2.h / 2)))
			return (heg < (b2.h / 2))
		} else {
			return ((b1.y <= b2.y && b2.y <= (b1.y + b1.h)) || (b2.y <= b1.y && b1.y <= (b2.y + b2.h)))
		}
	}
}

const measureRealtime = () => {
	Object.keys(boxes).sort((key1: string, key2: string) => (boxes[key1].y - boxes[key2].y)).forEach((k: string) => {
		if (k !== dragging) {
			const box = boxes[k]
			let newY = 0
			Object.keys(boxes).forEach((k2: string) => {
				if (k2 !== k) {
					const temp = boxes[k2]
					if (xColided(box, temp)) {
						if (k2 === dragging) {
							if (yColided(temp, box, { compareWithOld: true, softColided: true })) {
								if (newY < (temp.y + temp.h)) {
									newY = (temp.y + temp.h)
								}
							}
						} else {
							if (temp.y <= box.y) {
								if (newY < (temp.y + temp.h)) {
									newY = (temp.y + temp.h)
								}
							}
						}
					}
				}
			})
			box.y = newY
		}
	})
	Object.keys(boxes).forEach((k: string) => {
		if (k !== dragging) {
			boxes[k].el.style.transform = `translate(${boxes[k].x}px, ${boxes[k].y}px)`
		}
	})
}

const measureFinal = () => {
	Object.keys(boxes).sort((key1: string, key2: string) => (boxes[key1].y - boxes[key2].y)).forEach((k: string) => {
		const box = boxes[k]
		let newY = 0
		Object.keys(boxes).forEach((k2: string) => {
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
		box.y = newY
	})
	Object.keys(boxes).forEach((k: string) => {
		boxes[k].el.style.transform = `translate(${boxes[k].x}px, ${boxes[k].y}px)`
	})
}

let lognPressTimeout: NodeJS.Timeout | undefined = undefined
let mouseMoveTimeout: NodeJS.Timeout | undefined = undefined

export default function Board() {
	const [dragId, setDragId] = useState<string | undefined>(undefined)
	useEffect(() => {
		Object.keys(boxes).forEach((k: string) => {
			boxes[k].el = (document.getElementById(k) as HTMLDivElement)
		})
	}, []);
	return (
		<div className="w-full h-full relative overlow-hidden">
			{
				Object.keys(boxes).map((k: string) => (
					<div
						id={k}
						style={{ border: dragId === k ? '2px solid #fff' : undefined, transition: dragId === k ? undefined : 'transform 100ms', backgroundColor: boxes[k].color, width: 150, height: 150, transform: `translate(${boxes[k].x}px, ${boxes[k].y}px)`, position: 'absolute', left: 0, top: 0 }}
					/>
				))
			}
			<div
				className="w-full h-full absolute"
				onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
					if (dragging) {
						x = e.clientX;
						y = e.clientY;
						if (boxes[dragging]?.el) {
							boxes[dragging].x = x - mdX
							boxes[dragging].y = y - mdY
							const d = dragging
							boxes[d].el.style.transform = `translate(${boxes[d].x}px, ${y - mdY}px)`
							if (mouseMoveTimeout) {
								clearTimeout(mouseMoveTimeout)
							}
							mouseMoveTimeout = setTimeout(() => {
								measureRealtime()
								mouseMoveTimeout = undefined
							}, 50);
						}
					}
				}}
				onTouchMove={e => {
					if (dragging) {
						x = e.touches[0].clientX;
						y = e.touches[0].clientY;
						if (boxes[dragging]?.el) {
							boxes[dragging].x = x - mdX
							boxes[dragging].y = y - mdY
							const d = dragging
							boxes[d].el.style.transform = `translate(${boxes[d].x}px, ${y - mdY}px)`
							if (mouseMoveTimeout) {
								clearTimeout(mouseMoveTimeout)
							}
							mouseMoveTimeout = setTimeout(() => {
								measureRealtime()
								mouseMoveTimeout = undefined
							}, 50);
						}
					}
				}}
				onContextMenu={e => {
					e.preventDefault()
					x = e.clientX
					y = e.clientY
					const keyOfBox = Object.keys(boxes).find((k: string) => {
						const b = boxes[k]
						return (
							(b.el.getBoundingClientRect().x) < x &&
							(b.el.getBoundingClientRect().x + b.el.getBoundingClientRect().width) > x &&
							(b.el.getBoundingClientRect().y) < y &&
							(b.el.getBoundingClientRect().y + b.el.getBoundingClientRect().height) > y
						)
					})
					if (keyOfBox) {
						lognPressTimeout = setTimeout(() => {
							const b = boxes[keyOfBox]
							mdX = e.clientX - b.el.getBoundingClientRect().x
							mdY = e.clientY - b.el.getBoundingClientRect().y
							dragging = keyOfBox
							setDragId(keyOfBox)
							lognPressTimeout = undefined
						}, 500);
					}
				}}
				onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
					x = e.clientX
					y = e.clientY
					const keyOfBox = Object.keys(boxes).find((k: string) => {
						const b = boxes[k]
						return (
							(b.el.getBoundingClientRect().x) < x &&
							(b.el.getBoundingClientRect().x + b.el.getBoundingClientRect().width) > x &&
							(b.el.getBoundingClientRect().y) < y &&
							(b.el.getBoundingClientRect().y + b.el.getBoundingClientRect().height) > y
						)
					})
					if (keyOfBox) {
						lognPressTimeout = setTimeout(() => {
							const b = boxes[keyOfBox]
							mdX = e.clientX - b.el.getBoundingClientRect().x
							mdY = e.clientY - b.el.getBoundingClientRect().y
							dragging = keyOfBox
							setDragId(keyOfBox)
							lognPressTimeout = undefined
						}, 500);
					}
				}}
				onTouchEnd={() => {
					if (lognPressTimeout) {
						clearTimeout(lognPressTimeout)
						lognPressTimeout = undefined
					} else {
						dragging = undefined
						measureFinal()
						setDragId(undefined)
						Object.keys(boxes).forEach((k: string) => {
							boxes[k].oldY = boxes[k].y
						})
					}
				}}
				onMouseUp={() => {
					if (lognPressTimeout) {
						clearTimeout(lognPressTimeout)
						lognPressTimeout = undefined
					} else {
						dragging = undefined
						measureFinal()
						setDragId(undefined)
						Object.keys(boxes).forEach((k: string) => {
							boxes[k].oldY = boxes[k].y
						})
					}
				}}
			/>
		</div>
	)
}
