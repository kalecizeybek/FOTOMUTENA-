"use client";

import React from "react";

const NoiseOverlay = () => {
    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]">
            <svg width="100%" height="100%">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
};

export default NoiseOverlay;
