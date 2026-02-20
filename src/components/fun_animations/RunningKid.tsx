"use client";

import React from "react";
import { Player } from "@remotion/player";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from "remotion";

const FPS = 30;
const DURATION_IN_FRAMES = 300; // 10 seconds per loop

// The actual Remotion Composition
const RunningKidComposition: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, width, height } = useVideoConfig();

    // The kid will run completely across the screen from left to right, bouncing along the way.
    // X position: starts from off-screen left, goes to off-screen right
    const xPos = interpolate(
        frame,
        [0, DURATION_IN_FRAMES],
        [-200, width + 50],
        { extrapolateRight: "clamp" }
    );

    // Y position (bouncing effect) - utilizing a sine wave multiplied by a spring for dynamic feel
    const bounce = Math.abs(Math.sin(frame / 5)) * 40;

    // Slight rotation back and forth as if running
    const rotation = Math.sin(frame / 3) * 5;

    return (
        <AbsoluteFill style={{ position: 'relative' }}>
            <div
                style={{
                    position: "absolute",
                    left: xPos,
                    bottom: 20 + bounce, // Run along the bottom 
                    transform: `rotate(${rotation}deg)`,
                    fontSize: "80px", // Size of our emoji kid
                    filter: "drop-shadow(0px 10px 10px rgba(236,72,153,0.5))"
                }}
            >
                🏃‍♂️🎈
            </div>
        </AbsoluteFill>
    );
};

// The Player wrapper exported to the Next.js app
export function RunningKid() {
    // Determine screen size purely via CSS to avoid hydration issues, 
    // or let Remotion fill the container. 
    // Since we attach it absolute filling the viewport, we set width/height to 100%.

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            <Player
                component={RunningKidComposition}
                durationInFrames={DURATION_IN_FRAMES}
                compositionWidth={1920} // Standard internal rendering res
                compositionHeight={1080}
                fps={FPS}
                style={{
                    width: "100%",
                    height: "100%",
                }}
                loop
                autoPlay
            />
        </div>
    );
}
