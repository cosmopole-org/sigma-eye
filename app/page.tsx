"use client"

import React, { MouseEvent, useEffect, useRef, useState } from "react";

type Box = { el: HTMLDivElement | any, x: number, y: number, w: number, h: number, color: string, oldY: number }

let boxes: { [id: string]: Box } = {
	red: { el: null, x: 0, y: 0, w: 150, h: 150, color: 'red', oldY: 0 },
	green: { el: null, x: 150, y: 0, w: 150, h: 150, color: 'green', oldY: 0 },
	blue: { el: null, x: 0, y: 150, w: 150, h: 150, color: 'blue', oldY: 150 }
}
let dragging: string | undefined = undefined;
let mdX = 0, mdY = 0
let x = 0, y = 0
let shadowDropY = 0

const xColided = (b1: Box, b2: Box) => {
	return ((b1.x < b2.x && b2.x < (b1.x + b1.w)) || (b2.x < b1.x && b1.x < (b2.x + b2.w)))
}

const yColided = (b1: Box, b2: Box, options?: { compareWithOld?: boolean, softColided?: boolean }) => {
	if (options?.compareWithOld) {
		if (options?.softColided) {
			const heg = Math.abs((b1.y + (b1.h / 2)) - (b2.oldY + (b2.h / 2)))
			return (heg < (b2.h / 2))
		} else {
			return ((b1.y < b2.oldY && b2.oldY < (b1.y + b1.h)) || (b2.oldY < b1.y && b1.y < (b2.oldY + b2.h)))
		}
	} else {
		if (options?.softColided) {
			const heg = Math.abs((b1.y + (b1.h / 2)) - (b2.y + (b2.h / 2)))
			return (heg < (b2.h / 2))
		} else {
			return ((b1.y < b2.y && b2.y <= (b1.y + b1.h)) || (b2.y < b1.y && b1.y < (b2.y + b2.h)))
		}
	}
}

let lastFrameDiffX = 0, lastFrameDiffY = 0;

const measureRealtime = () => {
	let bs = Object.keys(boxes).sort((key1: string, key2: string) => (boxes[key1].oldY - boxes[key2].oldY))
	bs.forEach((k: string) => {
		if (k !== dragging) {
			const box = boxes[k]
			let newY = 0
			Object.keys(boxes).forEach((k2: string) => {
				if (k2 !== k) {
					const temp = boxes[k2]
					if (xColided(box, temp)) {
						if (k2 === dragging) {
							if (yColided(temp, box, { compareWithOld: true, softColided: true })) {
								if (newY < (shadowDropY + temp.h)) {
									newY = shadowDropY + temp.h
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
	let bs = Object.keys(boxes).sort((key1: string, key2: string) => (boxes[key1].oldY - boxes[key2].oldY))
	bs.forEach((k: string) => {
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

const measureShadow = () => {
	if (dragging) {
		const box = boxes[dragging]
		let newY = 0
		Object.keys(boxes).forEach((k2: string) => {
			if (k2 !== dragging) {
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
		shadowDropY = newY
	}
}

let mouseMoveTimeout: NodeJS.Timeout | undefined = undefined

export default function Board() {
	const [dragId, setDragId] = useState<string | undefined>(undefined);
	const shadowRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		Object.keys(boxes).forEach((k: string) => {
			boxes[k].el = (document.getElementById(k) as HTMLDivElement);
		})
	}, []);
	return (
		<div className="w-full h-full relative overlow-hidden">
			{
				Object.keys(boxes).map((k: string) => (
					<div
						id={k}
						style={{ zIndex: 2, border: dragId === k ? '2px solid #fff' : undefined, transition: dragId === k ? undefined : 'transform 100ms', backgroundColor: boxes[k].color, width: 150, height: 150, transform: `translate(${boxes[k].x}px, ${boxes[k].y}px)`, position: 'absolute', left: 0, top: 0 }}
					/>
				))
			}
			{
				dragging ? (
					<div
						ref={shadowRef}
						style={{ zIndex: 1, backgroundColor: '#fff', width: 150, height: 150, transform: `translate(${boxes[dragging].x}px, ${boxes[dragging].y}px)`, position: 'absolute', left: 0, top: 0 }}
					/>
				) : null
			}
			<div
				className="w-full h-full absolute left-0 top-0" style={{ zIndex: 3 }}
				onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
					if (dragging) {
						lastFrameDiffX = x
						lastFrameDiffY = y
						x = e.clientX;
						y = e.clientY;
						if (boxes[dragging]?.el) {
							boxes[dragging].x = x - mdX
							boxes[dragging].y = y - mdY
							boxes[dragging].el.style.transform = `translate(${boxes[dragging].x}px, ${boxes[dragging].y}px)`
							if (shadowRef.current) {
								measureShadow()
								shadowRef.current.style.transform = `translate(${boxes[dragging].x}px, ${shadowDropY}px)`
							}
							if (!mouseMoveTimeout || Math.abs(x - lastFrameDiffX) > 10 || Math.abs(y - lastFrameDiffY) > 10) {
								if (mouseMoveTimeout) {
									clearTimeout(mouseMoveTimeout)
								}
								mouseMoveTimeout = setTimeout(() => {
									measureRealtime()
									mouseMoveTimeout = undefined
								}, 50);
							}
						}
					}
				}}
				onTouchMove={e => {
					if (dragging) {
						lastFrameDiffX = x
						lastFrameDiffY = y
						x = e.touches[0].clientX;
						y = e.touches[0].clientY;
						if (boxes[dragging]?.el) {
							boxes[dragging].x = x - mdX
							boxes[dragging].y = y - mdY
							boxes[dragging].el.style.transform = `translate(${boxes[dragging].x}px, ${boxes[dragging].y}px)`
							if (shadowRef.current) {
								measureShadow()
								shadowRef.current.style.transform = `translate(${boxes[dragging].x}px, ${shadowDropY}px)`
							}
							if (!mouseMoveTimeout || Math.abs(x - lastFrameDiffX) > 10 || Math.abs(y - lastFrameDiffY) > 10) {
								if (mouseMoveTimeout) {
									clearTimeout(mouseMoveTimeout)
								}
								mouseMoveTimeout = setTimeout(() => {
									measureRealtime()
									mouseMoveTimeout = undefined
								}, 50);
							}
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
						const b = boxes[keyOfBox]
						mdX = e.clientX - b.el.getBoundingClientRect().x + 32
						mdY = e.clientY - b.el.getBoundingClientRect().y + 64
						dragging = keyOfBox
						setDragId(keyOfBox)
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
						const b = boxes[keyOfBox]
						mdX = e.clientX - b.el.getBoundingClientRect().x + 32
						mdY = e.clientY - b.el.getBoundingClientRect().y + 64
						dragging = keyOfBox
						setDragId(keyOfBox)
					}
				}}
				onTouchEnd={() => {
					if (mouseMoveTimeout) {
						clearTimeout(mouseMoveTimeout)
						mouseMoveTimeout = undefined
					}
					dragging = undefined
					Object.keys(boxes).forEach((k: string) => {
						boxes[k].oldY = boxes[k].y
					})
					measureFinal()
					setDragId(undefined)
				}}
				onMouseUp={() => {
					if (mouseMoveTimeout) {
						clearTimeout(mouseMoveTimeout)
						mouseMoveTimeout = undefined
					}
					dragging = undefined
					Object.keys(boxes).forEach((k: string) => {
						boxes[k].oldY = boxes[k].y
					})
					measureFinal()
					setDragId(undefined)
				}}
			/>
		</div>
	)
}
