import { motion } from 'framer-motion';
import dashboardSlices from './animations';

const HeroDashboard = () => {
    const parts = [
        'topbar.png',
        'sidebar.png',
        'HeroSection1.png',
        'HeroSection2.1.png',
        'HeroSection2-2.png', 
        'HeroSection2.3.png',
        'HeroSection2.4.png',
        'HeroSection2.5.png',
        'HeroSection3.1.png',
        'HeroSection3.2.png',
        'HeroSection4.1.png', 
        'HeroSection4.2.png',
        'HeroSection4.3.png',
    ];

    // Your desired overall scale factor for the entire dashboard
    const overallScaleFactor = 0.7;

    // Calculate the base (unscaled) dimensions of your full dashboard canvas
    // These must match the max extent of your slices from animations.js
    const unscaledBaseWidth = 1503; // Max right (1083 + 420)
    const unscaledBaseHeight = 822; // Max bottom (797) - Min top (-25) = 822

    // Calculate the final display dimensions of the dashboard after scaling
    const finalDisplayWidth = unscaledBaseWidth * overallScaleFactor;   // 1503 * 0.7 = 1052.1
    const finalDisplayHeight = unscaledBaseHeight * overallScaleFactor; // 822 * 0.7 = 575.4

    // The outer container's height needs to be sufficient to contain the scaled dashboard
    // and allow for vertical centering. Add a buffer for visual spacing.
    const containerHeight = Math.ceil(finalDisplayHeight) + 60; // E.g., 576 + 60 = 636px. Adjust 60 as needed.

    return (
        <div
            className={`relative w-full h-[${containerHeight}px] bg-[#0b0b0f] overflow-hidden flex justify-center items-center rounded-lg shadow-xl`}
        >
            {/* This div acts as the "canvas" for your dashboard slices, set to their FINAL SCALED size */}
            {/* It no longer has transform: scale(), as scaling is applied to individual images */}
            <div
                className="relative"
                style={{
                    width: finalDisplayWidth,   // This is the scaled width of the dashboard
                    height: finalDisplayHeight, // This is the scaled height of the dashboard
                    // No transform: scale() here, as scaling is done per image
                    transformOrigin: 'center center', // Keep for logical centering if needed for nested transforms
                    margin: 'auto', // For centering within the flex parent
                }}
            >
                {parts.map((part, index) => {
                    const slice = dashboardSlices[index];

                    // IMPORTANT: Scale each individual style property by the overallScaleFactor
                    const scaledStyle = {
                        ...slice.style, // Start with the original styles
                        top: `${parseFloat(slice.style.top) * overallScaleFactor}px`,
                        left: `${parseFloat(slice.style.left) * overallScaleFactor}px`,
                        width: `${parseFloat(slice.style.width) * overallScaleFactor}px`,
                        height: `${parseFloat(slice.style.height) * overallScaleFactor}px`,
                    };

                    return (
                        <motion.img
                            key={part}
                            src={`/assets/dashboard-slices/${part}`}
                            alt={`dashboard-part-${index}`}
                            // Spread original Framer Motion props (initial, animate, transition)
                            initial={slice.initial}
                            animate={slice.animate}
                            // Apply the newly scaled style properties
                            style={scaledStyle}
                            className="shadow-md rounded-none" // Applied for better UI look
                            whileHover={{
                                scale: 1.01,
                                zIndex: 10,
                                filter: 'drop-shadow(0px 6px 16px rgba(0,0,0,0.5))',
                            }}
                            transition={{
                                ...slice.transition,
                                type: "spring",
                                stiffness: 50,
                                damping: 50
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default HeroDashboard;