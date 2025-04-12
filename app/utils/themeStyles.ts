import { CustomTheme } from "@/app/lib/getClientConfig";

// Type for theme styles
export interface ThemeStyles {
  container: string;
  link: string;
  pinnedLink: string;
  qrButton: string;
  newsletterInput: string;
  newsletterButton: string;
  contactItem?: string;
  contactCard?: string;
  contactSection?: string;
  customStyles?: {
    container?: React.CSSProperties;
    link?: React.CSSProperties;
    pinnedLink?: React.CSSProperties;
    qrButton?: React.CSSProperties;
    newsletterInput?: React.CSSProperties;
    newsletterButton?: React.CSSProperties;
    contactItem?: React.CSSProperties;
    contactCard?: React.CSSProperties;
    contactSection?: React.CSSProperties;
    contactIcon?: {
      color: string;
    };
  };
}

// Helper function to generate theme styles
export function getThemeStyles(theme?: string, customTheme?: CustomTheme): ThemeStyles {
  // Default light theme
  const lightTheme: ThemeStyles = {
    container: "bg-gradient-to-br from-white to-gray-50 text-gray-900",
    link: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-md",
    pinnedLink:
      "bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 shadow-md",
    qrButton: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    newsletterInput:
      "bg-white border-gray-200 text-gray-800 placeholder-gray-400",
    newsletterButton: "bg-blue-600 hover:bg-blue-700 text-white",
    contactItem: "bg-white hover:bg-gray-50 text-gray-900 border-0 shadow-sm hover:shadow",
    contactCard: "bg-white hover:bg-gray-50 text-gray-800 border border-gray-100 shadow-sm",
    contactSection: "w-full",
  };

  // Dark theme
  const darkTheme: ThemeStyles = {
    container: "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
    link: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 shadow-md",
    pinnedLink:
      "bg-blue-900 hover:bg-green-800 text-green-100 border border-green-800 shadow-md",
    qrButton: "bg-gray-800 text-gray-300 hover:bg-gray-700",
    newsletterInput:
      "bg-gray-800 border-gray-700 text-white placeholder-gray-400",
    newsletterButton: "bg-blue-600 hover:bg-blue-700 text-white",
    contactItem: "bg-gray-800 hover:bg-gray-750 text-white border-0 shadow-sm hover:shadow",
    contactCard: "bg-gray-800 hover:bg-gray-750 text-gray-100 border border-gray-700 shadow-sm",
    contactSection: "w-full",
  };

  // Custom theme
  if (theme === "custom" && customTheme) {
    const bgStyle =
      typeof customTheme.background === "string"
        ? customTheme.background
        : `linear-gradient(to bottom right, ${customTheme.background.gradient.join(
            ", "
          )})`;

    return {
      container: "",
      link: "",
      pinnedLink: "",
      qrButton: "bg-opacity-20 bg-white text-white hover:bg-opacity-30",
      newsletterInput:
        "bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60",
      newsletterButton: "bg-white bg-opacity-20 hover:bg-opacity-30 text-white",
      contactItem: "border-0 shadow-sm hover:shadow",
      contactCard: "border border-opacity-20 shadow-sm hover:bg-opacity-90",
      contactSection: "w-full pt-5 mt-3",
      customStyles: {
        container: {
          background: bgStyle,
          color: customTheme.text
        },
        link: {
          background: customTheme.linkBackground,
          color: customTheme.linkText,
          borderColor: customTheme.linkBorder,
          boxShadow: customTheme.linkShadow
            ? `0 4px 6px ${customTheme.linkShadow}`
            : undefined,
        },
        pinnedLink: {
          background: customTheme.linkBackground,
          color: customTheme.linkText,
          borderColor: customTheme.linkBorder,
          boxShadow: customTheme.linkShadow
            ? `0 4px 6px ${customTheme.linkShadow}`
            : undefined,
          borderWidth: "2px",
        },
        contactItem: {
          background: `${customTheme.linkBackground}`,
          color: customTheme.linkText,
          boxShadow: customTheme.linkShadow
            ? `0 2px 4px ${customTheme.linkShadow}`
            : undefined,
        },
        contactCard: {
          background: customTheme.linkBackground,
          color: customTheme.linkText,
          borderColor: customTheme.linkBorder || 'rgba(255,255,255,0.2)',
          boxShadow: customTheme.linkShadow
            ? `0 2px 4px ${customTheme.linkShadow}`
            : undefined,
        },
        contactIcon: {
          color: customTheme.linkText,
        },
      },
    };
  }

  return theme === "dark" ? darkTheme : lightTheme;
}
