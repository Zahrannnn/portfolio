import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface TextZooProps {
    text: string;
    className?: string;
    href?: string;
}

const TextZoo = ({ text, className = "", href = "#" }: TextZooProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const topTextRef = useRef<HTMLSpanElement>(null);
    const bottomTextRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const topText = topTextRef.current;
        const bottomText = bottomTextRef.current;

        if (!container || !topText || !bottomText) return;

        gsap.set(bottomText, { y: '100%' });

        const tl = gsap.timeline({ paused: true });
        tl.to(topText, { y: '-100%', duration: 0.4  , ease: 'power2.inOut' }, 0)
          .to(bottomText, { y: '0%', duration: 0.4, ease: 'power2.inOut' }, 0);

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            container.removeEventListener('mouseenter', onEnter);
            container.removeEventListener('mouseleave', onLeave);
            tl.kill();
        };
    }, []);

    return (
        <span
            className={`group relative overflow-hidden inline-block ${className}`}
            ref={containerRef}
        >
            <span className="flex flex-col font-bold">
                <span ref={topTextRef}>
                    {text}
                </span>
                <span ref={bottomTextRef} className="absolute top-0">
                    {text}
                </span>
            </span>
        </span>
    );
};

export default TextZoo;