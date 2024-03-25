"use client"

import React, { MouseEvent, useEffect, useRef, useState } from "react";

type Box = { el: HTMLDivElement | any, key: string, x: number, y: number, w: number, h: number, color: string, oldY: number }

let boxes: { [id: string]: Box } = {
	red: { el: null, key: 'red', x: 0, y: 0, w: 150, h: 150, color: 'red', oldY: 0 },
	green: { el: null, key: 'green', x: 0, y: 150, w: 150, h: 150, color: 'green', oldY: 150 },
	blue: { el: null, key: 'blue', x: 0, y: 300, w: 150, h: 150, color: 'blue', oldY: 300 }
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
		box.y = newY
	})
	Object.keys(boxes).forEach((k: string) => {
		boxes[k].el.style.transform = `translate(${boxes[k].x}px, ${boxes[k].y}px)`
	})
}

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
						style={{ border: dragId === k ? '2px solid #fff' : undefined, transition: dragging === k ? undefined : 'transform 100ms', backgroundColor: dragging === k ? '#fff' : boxes[k].color, width: 150, height: 150, transform: `translate(${boxes[k].x}px, ${boxes[k].y}px)`, position: 'absolute', left: 0, top: 0 }}
					/>
				))
			}
			<div
				ref={shadowRef}
				style={{ display: 'none', backgroundColor: dragging ? boxes[dragging].color : 'transparent', width: 150, height: 150, transform: `translate(${x - mdX}px, ${y - mdY}px)`, position: 'absolute', left: 0, top: 0 }}
			/>
			<div
				className="w-full h-full absolute left-0 top-0"
				onMouseMove={(e: MouseEvent<HTMLDivElement>) => {
					if (dragging) {
						x = e.clientX;
						y = e.clientY;
						if (boxes[dragging]?.el) {
							boxes[dragging].x = x - mdX
							boxes[dragging].y = y - mdY
							if (shadowRef.current) {
								shadowRef.current.style.transform = `translate(${x - mdX}px, ${y - mdY}px)`
							}
							measureFinal()
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
							if (shadowRef.current) {
								shadowRef.current.style.transform = `translate(${x - mdX}px, ${y - mdY}px)`
							}
							measureFinal()
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
						if (shadowRef.current) {
							shadowRef.current.style.display = 'block';
						}
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
						if (shadowRef.current) {
							shadowRef.current.style.display = 'block';
						}
						const b = boxes[keyOfBox]
						mdX = e.clientX - b.el.getBoundingClientRect().x + 32
						mdY = e.clientY - b.el.getBoundingClientRect().y + 64
						dragging = keyOfBox
						setDragId(keyOfBox)
					}
				}}
				onTouchEnd={() => {
					if (shadowRef.current) {
						shadowRef.current.style.display = 'none';
					}
					dragging = undefined
					Object.keys(boxes).forEach((k: string) => {
						boxes[k].oldY = boxes[k].y
					})
					measureFinal()
					setDragId(undefined)
				}}
				onMouseUp={() => {
					if (shadowRef.current) {
						shadowRef.current.style.display = 'none';
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
