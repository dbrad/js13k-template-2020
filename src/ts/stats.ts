import { pushText, pushQuad } from "./draw";

// @ifdef DEBUG
let frameCount: number = 0;
let fps: number = 60;
let lastFps: number = 0;
let ms: number = 1000 / fps;

let displayFps = "0 hz";
let displayMs = "0 ms";

export function tickStats(delta: number, now: number): void {
    ms = 0.9 * delta + 0.1 * ms;
    if (now >= lastFps + 1000) {
        fps = 0.9 * frameCount * 1000 / (now - lastFps) + 0.1 * fps;
        displayFps = `${fps.toFixed((2))} hz`;
        displayMs = `${ms.toFixed(2)} ms`;

        lastFps = now - (delta % 1000 / 60);
        frameCount = 0;
    }
    frameCount++;
    pushQuad(0, 0, 65, 19, 0x88333333);
    pushText(displayFps, 0, 0);
    pushText(displayMs, 0, 10);
}
// @endif