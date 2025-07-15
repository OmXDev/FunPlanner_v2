const baseDelay = 0.3; 

const positions = [
    { top: -2, left: 0, width: 1550, height: 58 },
    { top: 56, left: -2, width: 245, height: 762 },
    { top: 56, left: 243, width: 1257, height: 80 },
    { top: 136, left: 243, width: 251, height: 116 },
    { top: 136, left: 494, width: 252, height: 116 },
    { top: 136, left: 746, width: 255, height: 116 },
    { top: 136, left: 1001, width: 253, height: 116 },
    { top: 136, left: 1250, width: 251, height: 116 },
    { top: 252, left: 243, width: 852, height: 390 },
    { top: 252, left: 1092, width: 409, height: 390 }, 
    { top: 643, left: 243, width: 420, height: 178 },
    { top: 643, left: 663, width: 420, height: 178 },
    { top: 643, left: 1083, width: 420, height: 178 }, 
];

const dashboardSlices = positions.map((pos, i) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: {
        delay: i * baseDelay,
        duration: 1.0,
        ease: 'easeOut',
    },
    style: {
        position: 'absolute',
        top: `${pos.top}px`,
        left: `${pos.left}px`,
        width: `${pos.width}px`,
        height: `${pos.height}px`,
        objectFit: 'cover',
        overflow: 'hidden',
    },
}));

export default dashboardSlices;