import React, {RefObject} from "react";
import {Delta} from "../../types/animation";

interface ListAnimationProps {
    root: RefObject<HTMLUListElement>,
    invert: (delta: Delta, elem: HTMLElement) => any,
    play:(elem: HTMLElement) => any
}

export const useListAnimation = ({ root, invert, play }: ListAnimationProps) => {
    const origins = React.useRef<{ [key: string]: any }>({});
    const firstRun = React.useRef(true);

    React.useLayoutEffect(() => {
        if (root.current === null) return;
        const list = root.current;
        const children: HTMLElement[] = Array.prototype.slice.call(list.children);

        for (const child of children) {
            const key = child.dataset.key!;

            const nextEl = child.getBoundingClientRect();
            if (!firstRun.current) {
                if (key in origins.current) {
                    const previous = origins.current[key];
                    const delta = getDelta(previous, nextEl);
                    if (!isZero(delta)) {
                        invert(delta, child);

                        requestAnimationFrame(() => {
                            play(child);
                        });
                    }
                }
            }
            origins.current[child.dataset.key!] = nextEl;
        }

        firstRun.current = false;
    }, [root, invert, play]);
};

const getDelta = (start: DOMRect, target: DOMRect) => {
    return {
        top: start.top - target.top,
        left: start.left - target.left
    }
};

const isZero = (delta: Delta) => {
    return delta.left === 0 &&
        delta.top === 0
}
