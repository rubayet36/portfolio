import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import Magnetic from "../Magnetic";

// Icon components for specific brands
// HtmlIcon removed as it was unused and replaced by Icons.HTML
// Note: For a real production app, we'd use proper brand SVGs.
// Since I cannot fetch external assets easily, I will use some Lucide icons and some custom paths where possible or fallbacks.
// Actually, I will use Lucide for everything I can and text for others, or try to approximate.
// BETTER: I will use text labels and Lucide icons that represent the tech (e.g. Code for HTML/CSS, etc.)
// OR even better: I'll use a reliable set of SVG paths for these standard icons.

const TechItem = ({ name, icon: Icon }: { name: string; icon: any }) => {
  return (
    <Magnetic>
      <motion.div
        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-gray-1/20 bg-gray-1/5 backdrop-blur-sm cursor-pointer hover:border-light/50 transition-colors group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-gray-3 group-hover:text-light transition-colors duration-300">
          {Icon}
        </div>
        <p className="poppins-regular text-sm text-gray-3 group-hover:text-light transition-colors">
          {name}
        </p>
      </motion.div>
    </Magnetic>
  );
};

// SVG Paths for Brand Icons
const Icons = {
  HTML: (
    <img
      src="https://i.postimg.cc/q7Hgc48q/angle-area-text-brand-other-html-5-d90fd7b01461c6a7b39fec5234779ae5.png"
      alt="HTML"
      className="w-10 h-10 object-contain"
    />
  ),
  CSS: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
      alt="CSS"
      className="w-10 h-10 object-contain"
    />
  ),
  JS: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#F7DF1E"
      className="w-10 h-10"
    >
      <rect x="0" y="0" width="24" height="24" rx="3" fill="#F7DF1E" />
      <path
        d="M12.5 17h2v-8h-2v8zm-5 0h2v-5h-2v5zm10 0h-2v-5h2v5z"
        fill="#000"
        opacity="0.1"
      />
      <text
        x="12"
        y="17"
        fontSize="12"
        fontWeight="bold"
        fill="#000"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        JS
      </text>
    </svg>
  ),
  React: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#61DAFB"
      strokeWidth="1.5"
      className="w-10 h-10"
    >
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  TS: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#3178C6"
      className="w-10 h-10"
    >
      <rect x="0" y="0" width="24" height="24" rx="3" fill="#3178C6" />
      <text
        x="12"
        y="17"
        fontSize="12"
        fontWeight="bold"
        fill="#FFF"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        TS
      </text>
    </svg>
  ),
  Figma: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
      alt="Figma"
      className="w-8 h-12 object-contain"
    />
  ),
  Node: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
      alt="Node.js"
      className="w-10 h-10 object-contain"
    />
  ),
  Firebase: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#FFCA28"
      className="w-10 h-10"
    >
      <path d="M3.89 15.67L6.5 2.62a.48.48 0 01.91-.06l2.12 6.57L12 2.62a.48.48 0 01.91.06l1.58 6.57 2.12-6.57a.48.48 0 01.91.06l2.61 13.05-7.53 4.29a.96.96 0 01-.94 0l-7.53-4.29z" />
      <path d="M12 2.62l1.58 6.57-2.12 6.57z" fill="#FFA000" />
    </svg>
  ),
  Supabase: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#3ECF8E"
      className="w-10 h-10"
    >
      <path d="M12 2L4 14h6v8l8-12h-6z" />
    </svg>
  ),
  VSCode: (
    <img
      src="https://i.postimg.cc/G20NhSwZ/Google-Antigravity-logo.jpg"
      alt="Antigravity"
      className="w-10 h-10 object-contain rounded-full"
    />
  ),
  Git: (
    <img
      src="https://i.postimg.cc/cCCQq0kd/Git-Icon-1788C.png"
      alt="Git"
      className="w-10 h-10 object-contain"
    />
  ),
  GitHub: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
      alt="GitHub"
      className="w-10 h-10 object-contain bg-white rounded-full p-[1px]"
    />
  ),
};

const TechStack = ({}: { isMobile: boolean }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);
  const technologies = [
    { name: "HTML", icon: Icons.HTML },
    { name: "CSS", icon: Icons.CSS },
    { name: "JavaScript", icon: Icons.JS },
    { name: "React", icon: Icons.React },
    { name: "TypeScript", icon: Icons.TS },
    { name: "Figma", icon: Icons.Figma },
    { name: "Node.js", icon: Icons.Node },
    { name: "Firebase", icon: Icons.Firebase },
    { name: "Supabase", icon: Icons.Supabase },
    { name: "Antigravity", icon: Icons.VSCode },
    { name: "Git", icon: Icons.Git },
    { name: "GitHub", icon: Icons.GitHub },
  ];

  return (
    <section className="min-h-[50vh] w-screen py-20 flex flex-col items-center justify-center relative z-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="khula-semibold text-5xl md:text-7xl mb-16 text-light">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <TechItem name={tech.name} icon={tech.icon} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
