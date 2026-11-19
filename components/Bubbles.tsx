'use client'

import Link from "next/link";
import { useRef, useEffect } from "react";

const categories = ["Work", "Projects", "Fun", "Contact Me"];
const category_links = ["work", "projects", "fun", "contact"];
const NUM_BUBBLES = categories.length;
const SPEED = 0.5; // base speed in px/frame (~30px/sec at 60fps)

interface BubbleState {
	x: number;  // center x in px
	y: number;  // center y in px
	vx: number; // velocity x in px/frame
	vy: number; // velocity y in px/frame
}

export default function Bubbles() {
	const containerRef = useRef<HTMLDivElement>(null);
	const bubbleElsRef = useRef<(HTMLAnchorElement | null)[]>([]);
	const stateRef = useRef<BubbleState[]>([]);
	const rafRef = useRef<number>(0);
	const initializedRef = useRef(false);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// --- Initialize bubble positions (only once) ---
		if (!initializedRef.current) {
			const W = container.clientWidth;
			const H = container.clientHeight;
			const r = W / (NUM_BUBBLES * 3); // radius — matches CSS --bubble-diameter / 2

			stateRef.current = categories.map((_, i) => {
				// Spread evenly across x, stagger y between upper/lower half
				const x = r + (i / (NUM_BUBBLES - 1)) * (W - 2 * r);
				const y = H * (0.3 + (i % 2) * 0.4);
				const angle = Math.random() * Math.PI * 2;
				return {
					x, y,
					vx: Math.cos(angle) * SPEED,
					vy: Math.sin(angle) * SPEED,
				};
			});
			initializedRef.current = true;
		}

		// --- Animation loop ---
		function tick() {
			const container = containerRef.current;
			if (!container) return;

			// Read dimensions each frame so resize is handled automatically
			const W = container.clientWidth;
			const H = container.clientHeight;
			const r = W / (NUM_BUBBLES * 3);
			const bubbles = stateRef.current;

			// 1. Move each bubble
			for (const b of bubbles) {
				b.x += b.vx;
				b.y += b.vy;
			}

			// 2. Bounce off container walls
			for (const b of bubbles) {
				if (b.x < r)     { b.x = r;     b.vx =  Math.abs(b.vx); }
				if (b.x > W - r) { b.x = W - r; b.vx = -Math.abs(b.vx); }
				if (b.y < r)     { b.y = r;     b.vy =  Math.abs(b.vy); }
				if (b.y > H - r) { b.y = H - r; b.vy = -Math.abs(b.vy); }
			}

			// 3. Pairwise elastic collision (equal-mass circles)
			for (let i = 0; i < bubbles.length; i++) {
				for (let j = i + 1; j < bubbles.length; j++) {
					const a = bubbles[i], b = bubbles[j];
					const dx = b.x - a.x;
					const dy = b.y - a.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					const minDist = r * 2;

					if (dist < minDist && dist > 0.001) {
						// Collision normal (points from a → b)
						const nx = dx / dist;
						const ny = dy / dist;

						// Push apart so they no longer overlap
						const overlap = (minDist - dist) / 2;
						a.x -= overlap * nx;
						a.y -= overlap * ny;
						b.x += overlap * nx;
						b.y += overlap * ny;

						// Swap velocity component along the collision normal
						const relVx = a.vx - b.vx;
						const relVy = a.vy - b.vy;
						const dot = relVx * nx + relVy * ny;

						if (dot > 0) { // only resolve if approaching
							a.vx -= dot * nx;
							a.vy -= dot * ny;
							b.vx += dot * nx;
							b.vy += dot * ny;
						}
					}
				}
			}

			// 4. Write positions to DOM directly (bypasses React for 60fps perf)
			for (let i = 0; i < bubbles.length; i++) {
				const el = bubbleElsRef.current[i];
				if (el) {
					// translate from (0,0) top-left to place center at (x,y)
					el.style.transform = `translate(${bubbles[i].x - r}px, ${bubbles[i].y - r}px)`;
				}
			}

			rafRef.current = requestAnimationFrame(tick);
		}

		rafRef.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafRef.current);
	}, []);

	return (
		<div className="bubble-container flex flex-col gap-10 p-20">
			<div className="bubble-title">Stuff I Do</div>
			<div
				ref={containerRef}
				className="relative h-dvh border-[10px] border-[var(--water)] border-double overflow-hidden"
			>
				{categories.map((category, index) => (
					<Link
						href={`/${category_links[index]}`}
						key={index}
						ref={(el) => { bubbleElsRef.current[index] = el; }}
						className="bubble"
						style={{
							left: 0,
							top: 0,
							willChange: 'transform',
						}}
					>
						{category}
					</Link>
				))}
			</div>
		</div>
	);
}
