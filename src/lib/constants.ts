import { BookTemplate, Home, Settings, Trash } from "lucide-react";
import { Theme } from "./types";

export const data = {
  user: {
    name: "Shadcnm",
    email: "m@example.com",
    avatar: "/avatar.png",
  },
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Template",
      url: "/template",
      icon: BookTemplate,
    },
    {
      title: "Trash",
      url: "/trash",
      icon: Trash,
    },
    {
      title: "Settings",
      url: "/setting",
      icon: Settings,
    },
  ],
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export const themes: Theme[] = [
  {
    name: "Default",
    fontFamily: '"Inter", sans-serif',
    fontColor: "#000000",
    backgroundColor: "#f0f0f0",
    slideBackgroundColor: "#ffffff",
    accentColor: "#3b82f6",
    navbarColor: "#ffffff",
    type: "light",
  },
  {
    name: "Dark Elegance",
    fontFamily: '"Playfair Display", serif',
    fontColor: "#ffffff",
    backgroundColor: "#1a1a1a",
    slideBackgroundColor: "#2c2c2c",
    accentColor: "#ffd700",
    gradientBackground: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
    navbarColor: "#2c2c2c",
    type: "dark",
  },
  {
    name: "Sakura Blossom",
    fontFamily: '"Noto Sans JP", sans-serif',
    fontColor: "#5d576b",
    backgroundColor: "#fff5f5",
    slideBackgroundColor: "#ffffff",
    accentColor: "#f687b3",
    gradientBackground: "linear-gradient(135deg, #fff5f5 0%, #fed7e2 100%)",
    navbarColor: "#fed7e2",
    type: "light",
  },
  
  {
    name: "Ocean Breeze",
    fontFamily: '"Lora", serif',
    fontColor: "#003366",
    backgroundColor: "#e0f7fa",
    slideBackgroundColor: "#ffffff",
    accentColor: "#0077b6",
    navbarColor: "#ffffff",
    type: "light",
  },
  {
    name: "Sunset Glow",
    fontFamily: '"Raleway", sans-serif',
    fontColor: "#5a1a00",
    backgroundColor: "#ffcc80",
    slideBackgroundColor: "#ffe0b2",
    accentColor: "#ff5722",
    navbarColor: "#ffcc80",
    type: "light",
  },
  {
    name: "Frosted Winter",
    fontFamily: '"Roboto", sans-serif',
    fontColor: "#1C2833",
    backgroundColor: "#D6EAF8",
    slideBackgroundColor: "#EBF5FB",
    accentColor: "#5DADE2",
    navbarColor: "#AED6F1",
    type: "light",
  },
  {
    name: "Pure Elegance",
    fontFamily: '"Lora", serif',
    fontColor: "#333333",
    backgroundColor: "#FFFFFF",
    slideBackgroundColor: "#F9F9F9",
    accentColor: "#FF6F61",
    navbarColor: "#EAEAEA",
    type: "light",
  },
  {
    name: "Soft Ivory",
    fontFamily: '"Nunito", sans-serif',
    fontColor: "#444444",
    backgroundColor: "#FAFAFA",
    slideBackgroundColor: "#F0F0F0",
    accentColor: "#FFA726",
    navbarColor: "#E0E0E0",
    type: "light",
  },
  {
    name: "Neon Cyberpunk",
    fontFamily: '"Rajdhani", sans-serif',
    fontColor: "#ffffff",
    backgroundColor: "#09090b",
    slideBackgroundColor: "#18181b",
    accentColor: "#22d3ee",
    gradientBackground: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
    navbarColor: "#18181b",
    type: "dark",
  },
  {
    name: "Pastel Breeze",
    fontFamily: '"Poppins", sans-serif',
    fontColor: "#2E3A59",
    backgroundColor: "#F8F8FF",
    slideBackgroundColor: "#E6E6FA",
    accentColor: "#64B5F6",
    navbarColor: "#D8BFD8",
    type: "light",
  },
  {
    name: "Sunshine Glow",
    fontFamily: '"Montserrat", sans-serif',
    fontColor: "#5C4033",
    backgroundColor: "#FFF8E1",
    slideBackgroundColor: "#FFF3E0",
    accentColor: "#FFB300",
    navbarColor: "#FFE082",
    type: "light",
  },
  {
    name: "Minimal Bliss",
    fontFamily: '"Inter", sans-serif',
    fontColor: "#1E1E1E",
    backgroundColor: "#FFFFFF",
    slideBackgroundColor: "#F5F5F5",
    accentColor: "#4CAF50",
    navbarColor: "#EEEEEE",
    type: "light",
  },
  {
    name: "Crystal White",
    fontFamily: '"Quicksand", sans-serif',
    fontColor: "#3D3D3D",
    backgroundColor: "#FDFDFD",
    slideBackgroundColor: "#FFFFFF",
    accentColor: "#00ACC1",
    navbarColor: "#E0F7FA",
    type: "light",
  },
  
  {
    name: "Sunset Bliss",
    fontFamily: '"Raleway", sans-serif',
    fontColor: "#6A1B9A",
    backgroundColor: "#F48FB1",
    slideBackgroundColor: "#FCE4EC",
    accentColor: "#D81B60",
    navbarColor: "#AD1457",
    type: "light",
  },
  {
    name: "Pastel Dream",
    fontFamily: '"Poppins", sans-serif',
    fontColor: "#4B3869",
    backgroundColor: "#FFF8F0",
    slideBackgroundColor: "#FAE3D9",
    accentColor: "#FF91A4",
    navbarColor: "#FFDCDC",
    type: "light",
  },
  
  {
    name: "Shadow Realm",
    fontFamily: '"Oswald", sans-serif',
    fontColor: "#BDBDBD",
    backgroundColor: "#212121",
    slideBackgroundColor: "#424242",
    accentColor: "#FF6F00",
    navbarColor: "#333333",
    type: "dark",
  },
  {
    name: "Minimalist Mono",
    fontFamily: '"Inter", sans-serif',
    fontColor: "#222222",
    backgroundColor: "#FFFFFF",
    slideBackgroundColor: "#F4F4F4",
    accentColor: "#666666",
    navbarColor: "#DDDDDD",
    type: "light",
  },
  {
    name: "Tropical Paradise",
    fontFamily: '"Pacifico", cursive',
    fontColor: "#004D40",
    backgroundColor: "#80CBC4",
    slideBackgroundColor: "#B2DFDB",
    accentColor: "#FF7043",
    navbarColor: "#26A69A",
    type: "light",
  },
  
  {
    name: "Nature Fresh",
    fontFamily: '"Quicksand", sans-serif',
    fontColor: "#3E4C40",
    backgroundColor: "#F0F8EC",
    slideBackgroundColor: "#E1F0DA",
    accentColor: "#6AA84F",
    navbarColor: "#C8E6C9",
    type: "light",
  },
];

export const CreatePageCard = [
  {
    title: "Use a",
    highlightedText: "Template",
    description: "Write a prompt and leave everything else for us to handle",
    type: "template",
  },
  {
    title: "Generate with",
    highlightedText: "Creative AI",
    description: "Write a prompt and leave everything else for us to handle",
    type: "creative-ai",
    highlight: true,
  },
  {
    title: "Start from",
    highlightedText: "Scratch",
    description: "Write a prompt and leave everything else for us to handle",
    type: "create-scratch",
  },
];
