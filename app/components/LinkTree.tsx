"use client";

import { ClientConfig, Link as LinkType } from "@/app/lib/getClientConfig";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SocialShareButtons from "./SocialShareButtons";
import { getThemeStyles } from "@/app/utils/themeStyles";
import LinkItem from "./LinkItem";
import ContactInfo from "./ContactInfo";

// Import QRCodeComponent and NewsletterSignup dynamically to avoid hydration issues
const QRCodeComponent = dynamic(() => import("./QRCodeComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-40 w-40 bg-gray-200 rounded-md mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Loading QR code...</p>
      </div>
    </div>
  ),
});

const NewsletterSignup = dynamic(() => import("./NewsletterSignup"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-20 animate-pulse bg-gray-100 rounded-xl"></div>
  ),
});

export default function LinkTree({ config }: { config: ClientConfig }) {
  const {
    name,
    bio,
    avatar,
    links,
    theme,
    customTheme,
    socialShareButtons,
    newsletterSignup,
    backgroundImage,
    enableQrCode,
    clientId,
    analytics,
    contact,
  } = config;

  const [showQrCode, setShowQrCode] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side effects after component mounts
  useEffect(() => {
    setIsMounted(true);
    setProfileUrl(`${window.location.origin}/${clientId}`);
  }, [clientId]);

  // Track link clicks
  const trackClick = (link: LinkType) => {
    if (analytics?.enabled) {
      console.log(`Tracking click for: ${link.title}`);
      // In a real app, send tracking data to an analytics service
    }
  };

  // Generate theme styles
  const themeStyles = getThemeStyles(theme, customTheme);

  // Background style with optional image
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }
    : {};

  // Get pinned and regular links
  const pinnedLinks = links.filter((link) => link.isPinned);
  const regularLinks = links.filter((link) => !link.isPinned);

  return (
    <div
      className={`w-full max-w-[92%] sm:max-w-xl mx-auto flex flex-col items-center gap-6 sm:gap-8 p-5 sm:p-8 rounded-2xl shadow-2xl ${themeStyles.container}`}
      style={{
        ...backgroundStyle,
        ...themeStyles.customStyles?.container,
      }}
    >
      {avatar && (
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105 duration-300">
          <Image
            src={avatar}
            alt={name}
            width={112}
            height={112}
            className="object-cover bg-white h-full"
            priority
          />
        </div>
      )}

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
        {bio && (
          <p className="text-sm sm:text-base text-center opacity-80 max-w-xs mx-auto">
            {bio}
          </p>
        )}
      </div>

      <div className="flex w-full justify-center items-center gap-3">
        {isMounted && socialShareButtons && socialShareButtons.length > 0 && (
          <SocialShareButtons
            buttons={socialShareButtons}
            url={profileUrl}
            title={`Check out ${name}'s link tree`}
          />
        )}
        {isMounted && enableQrCode && (
          <div className="">
            <button
              onClick={() => setShowQrCode(!showQrCode)}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all ${themeStyles.qrButton}`}
            >
              {showQrCode ? "Hide QR Code" : "Show QR Code"}
            </button>
          </div>
        )}
      </div>

      {/* QR Code display - only client side */}
      {isMounted && enableQrCode && showQrCode && (
        <QRCodeComponent url={profileUrl} name={name} />
      )}

      {/* Contact Information */}
      {contact &&
        Object.keys(contact).some(
          (key) => !!contact[key as keyof typeof contact]
        ) && (
          <div className={`${themeStyles.contactSection} w-full`}>
            <ContactInfo
              contact={contact}
              themeStyles={themeStyles}
              theme={theme}
            />
          </div>
        )}

      {/* Pinned Links (if any) */}
      {pinnedLinks.length > 0 && (
        <div className="w-full space-y-3 sm:space-y-4">
          {pinnedLinks.map((link, index) => (
            <LinkItem
              key={`pinned-${index}`}
              link={link}
              isPinned={true}
              themeStyles={themeStyles}
              theme={theme}
              onTrackClick={trackClick}
            />
          ))}
        </div>
      )}

      {/* Regular Links */}
      <div className="w-full space-y-3 sm:space-y-4">
        {regularLinks.map((link, index) => (
          <LinkItem
            key={index}
            link={link}
            isPinned={false}
            themeStyles={themeStyles}
            theme={theme}
            onTrackClick={trackClick}
          />
        ))}
      </div>

      {/* Newsletter Signup - only client side */}
      {isMounted && newsletterSignup?.enabled && (
        <NewsletterSignup
          title={newsletterSignup.title}
          buttonText={newsletterSignup.buttonText}
          placeholder={newsletterSignup.placeholder}
          endpoint={newsletterSignup.endpoint}
          themeStyles={themeStyles}
        />
      )}

      <footer className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-60 text-center">
        <p>Made with ❤️</p>
      </footer>
    </div>
  );
}
