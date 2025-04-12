"use client";

import { Link as LinkType } from "@/app/lib/getClientConfig";
import Link from "next/link";
import Image from "next/image";
import Icon from "./Icon";
import { ThemeStyles } from "../utils/themeStyles";

interface LinkItemProps {
  link: LinkType;
  isPinned?: boolean;
  themeStyles: ThemeStyles;
  theme?: string;
  onTrackClick: (link: LinkType) => void;
}

export default function LinkItem({
  link,
  isPinned = false,
  themeStyles,
  theme = "light",
  onTrackClick,
}: LinkItemProps) {
  // Get icon name from URL or path
  const getIconName = (iconPath: string) => {
    if (!iconPath) return "";
    // Extract the icon name from the path
    const fileName = iconPath.split("/").pop() || "";
    // Remove the extension and return the name
    return fileName.split(".")[0];
  };

  const linkClass = isPinned
    ? themeStyles.pinnedLink
    : themeStyles.link;

  const linkStyle = isPinned
    ? themeStyles.customStyles?.pinnedLink
    : themeStyles.customStyles?.link;

  return (
    <div
      className={`
        relative block rounded-xl text-center font-medium 
        transform transition-all duration-300 
        hover:scale-105 hover:-translate-y-1 hover:shadow-lg
        active:scale-95 active:shadow-inner
        text-sm sm:text-base
        ${linkClass}
      `}
      style={linkStyle}
    >
      {/* Render image if present */}
      {link.image && (
        <Image
          src={link.image}
          alt={link.title}
          width={23}
          height={23}
          className="object-contain absolute left-[15px] top-[50%] translate-y-[-50%] w-[23px] z-2"
          priority
        />
      )}
      
      {/* Render icon if present and no image */}
      {!link.image && link.icon && (
        <div className="absolute left-[15px] top-[50%] translate-y-[-50%] w-[26px] z-2">
          <Icon
            name={getIconName(link.icon)}
            color={theme === "dark" ? "#ffffff" : "#4b5563"}
            size={26}
          />
        </div>
      )}
      
      {/* Link itself */}
      <Link
        href={link.url}
        onClick={() => onTrackClick(link)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full justify-center py-3.5 sm:py-4 px-4 sm:px-5"
      >
        {link.title}
      </Link>
    </div>
  );
}
