import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { Player } from "@remotion/player";

const BalloonBoyAnimation: React.FC = () => {
    const frame = useCurrentFrame();
    const { width } = useVideoConfig();

    // Boy runs across the screen from left to right
    const boyX = interpolate(frame, [0, 150], [-200, width + 50], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });

    // Balloon floating animation (sine wave)
    const balloonY = interpolate(Math.sin(frame / 10), [-1, 1], [-10, 10]);

    // Running bobbing motion
    const boyY = interpolate(Math.sin(frame / 2), [-1, 1], [0, -10]);

    return (
        <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: "2rem" }}>
            <div
                style={{
                    position: "absolute",
                    left: boyX,
                    bottom: "10%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transform: `translateY(${boyY}px)`,
                }}
            >
                {/* Balloon */}
                <div
                    style={{
                        position: "absolute",
                        top: -80,
                        right: -30,
                        transform: `translateY(${balloonY}px)`,
                    }}
                >
                    <div
                        style={{
                            width: 30,
                            height: 40,
                            backgroundColor: "#ec4899", // pink-500
                            borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
                            position: "relative",
                        }}
                    >
                        {/* Balloon string */}
                        <div
                            style={{
                                width: 2,
                                height: 50,
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                position: "absolute",
                                bottom: -45,
                                left: "45%",
                                transform: "rotate(-15deg)",
                            }}
                        />
                    </div>
                </div>

                {/* Boy (Simple shapes) */}
                <span style={{ fontSize: "40px", textShadow: "0px 4px 10px rgba(0,0,0,0.5)" }}>
                    🏃‍♂️
                </span>
            </div>
        </AbsoluteFill>
    );
};

export const RunningBoyPlayer: React.FC = () => {
    return (
        <Player
            component={BalloonBoyAnimation}
            durationInFrames={150}
            fps={30}
            compositionWidth={1920}
            compositionHeight={200}
            style={{
                width: "100%",
                height: "200px",
                position: "absolute",
                bottom: 0,
                pointerEvents: "none",
                zIndex: 10,
            }}
            autoPlay
            loop
        />
    );
};
