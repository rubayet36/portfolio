import { MotionValue, useAnimationControls, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Magnetic from "../Magnetic";
import { useLenis } from "@studio-freight/react-lenis";

type AboutSectionProps = {
  isAboutInView: boolean;
  isMobile: boolean;
  backgroundGradient: MotionValue<string>;
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom * 0.2,
      type: "tween",
      useNativeDriver: true,
    },
  }),
};

const lineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      type: "tween",
      useNativeDriver: true,
    },
  },
};

/**
 * Photo card with an Android-ish wiggly/segmented "progress" border.
 * Uses SVG stroke dash animation to create the moving progress feel.
 */
const WavyProgressBorder = ({
  src,
  alt = "Profile photo",
}: {
  src: string;
  alt?: string;
}) => {
  // Generate a scalloped (flower-like) path
  // r = R + A*cos(k*theta)
  const generateScallopedPath = (k: number, R: number, A: number) => {
    let path = "";
    const steps = 200; // Resolution
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * 2 * Math.PI;
      const r = R + A * Math.cos(k * theta);
      const x = 50 + r * Math.cos(theta); // Center (50, 50)
      const y = 50 + r * Math.sin(theta);
      path += `${i === 0 ? "M" : "L"} ${x},${y} `;
    }
    return path + "Z";
  };

  // k=12 bumps, Radius=42, Amplitude=3
  const scallopedPath = generateScallopedPath(12, 42, 3);
  const maskId = "scallop-mask";

  return (
    <div className="relative w-[300px] h-[300px] select-none group">
      {/* CSS Keyframes for mask rotation */}
      <style>{`
        @keyframes rotateMask {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotating-mask-path {
          animation: rotateMask 20s linear infinite;
          transform-origin: 50% 50%;
        }
      `}</style>

      {/* Container with float animation */}
      <motion.div
        className="w-full h-full"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <svg
          className="w-full h-full drop-shadow-xl"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label={alt}
        >
          <defs>
            <mask id={maskId}>
              <rect width="100%" height="100%" fill="black" />
              <path
                d={scallopedPath}
                fill="white"
                className="rotating-mask-path"
              />
            </mask>
          </defs>

          {/* Masked Image */}
          <image
            x="0"
            y="0"
            width="100"
            height="100"
            href={src}
            preserveAspectRatio="xMidYMid slice"
            mask={`url(#${maskId})`}
          />

          {/* Border Stroke - Rotating in sync with mask */}
          <motion.path
            d={scallopedPath}
            fill="none"
            stroke="rgba(0,0,0,0.90)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{
              pathLength: { duration: 1.5, ease: "easeOut" },
              rotate: { duration: 20, ease: "linear", repeat: Infinity },
            }}
            style={{ originX: "50%", originY: "50%" }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

const About: React.FC<AboutSectionProps> = ({
  isAboutInView,
  isMobile,
  backgroundGradient,
}) => {
  const aboutControls = useAnimationControls();
  const [hasAnimated, setHasAnimated] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isAboutInView && !hasAnimated) {
      aboutControls.start("visible");
      setHasAnimated(true);
    } else if (!isAboutInView && hasAnimated) {
      aboutControls.start("hidden");
      setHasAnimated(false);
    }
  }, [isAboutInView, aboutControls, hasAnimated]);

  const initialState = isMobile ? "visible" : "hidden";

  return (
    <motion.div
      style={{ background: backgroundGradient }}
      className="w-screen min-h-screen overflow-hidden flex justify-center items-center relative z-10"
    >
      <motion.div
        initial={initialState}
        animate={aboutControls}
        className="max-w-[1000px] px-4"
      >
        <motion.h1
          variants={fadeInUpVariants}
          custom={0}
          className={`khula-semibold ${isMobile ? "text-4xl" : "text-6xl"}`}
        >
          I design around real users, not assumptions. Every interaction is
          intentional and effortless.
        </motion.h1>

        <motion.div
          variants={fadeInUpVariants}
          custom={1}
          className={`mt-[10vh] ${isMobile && "mt-8"}`}
        >
          <p className="text-gray-3 poppins-light-italic ml-2 mb-1 select-none">
            This is me.
          </p>
          <motion.hr
            variants={lineVariants}
            className="bg-gray-3 origin-left w-full"
          />
        </motion.div>

        <div
          className={`flex justify-between items-start flex-row mt-16 ${
            isMobile && "mt-8 flex-col"
          }`}
        >
          {/* LEFT COLUMN */}
          <div className={`flex flex-col ${isMobile ? "w-full" : "w-1/2"}`}>
            <motion.h2
              variants={fadeInUpVariants}
              custom={2}
              className="khula-light text-5xl text-nowrap"
            >
              Hi, I'm Rubayet.
            </motion.h2>

            {/* NEW: Image above button - pushed down further */}
            <motion.div
              variants={fadeInUpVariants}
              custom={3}
              className={`${isMobile ? "mt-12" : "mt-20"}`}
            >
              <WavyProgressBorder
                src="https://i.postimg.cc/3wC2NKpH/DSC_8043_2_NEF.jpg"
                alt="Rubayet"
              />
            </motion.div>

            {/* Desktop button */}
            {!isMobile && (
              <Magnetic>
                <motion.button
                  variants={fadeInUpVariants}
                  custom={4}
                  onClick={() => lenis?.scrollTo("#contact")}
                  className="flex bg-dark rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max poppins-regular mt-10 select-none"
                >
                  <ArrowUpRight />
                  Get in Touch
                </motion.button>
              </Magnetic>
            )}

            {/* Mobile button (moved under image so it's always "above" description) */}
            {isMobile && (
              <motion.button
                variants={fadeInUpVariants}
                custom={4}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView()
                }
                className="flex bg-dark rounded-full text-light pl-4 pr-6 gap-x-1 py-3 w-max h-fit poppins-regular select-none mt-8"
              >
                <ArrowUpRight />
                Get in Touch
              </motion.button>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div
            className={`flex flex-col gap-y-4 w-1/2 khula-light text-2xl mt-20 ${
              isMobile && "!mt-8 text-lg w-full"
            }`}
          >
            <motion.p variants={fadeInUpVariants} custom={7}>
              I'm a Frontend Engineer dedicated to turning ideas into creative
              solutions. I specialize in creating seamless and intuitive user
              experiences.
            </motion.p>
            <motion.p variants={fadeInUpVariants} custom={8}>
              I'm involved in every step of the process: from discovery and
              design to development, testing, and deployment. I focus on
              delivering high-quality, scalable results that drive positive user
              experiences.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
