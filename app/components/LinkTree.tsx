"use client";

import { ClientConfig, Link as LinkType } from "@/app/lib/getClientConfig";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import SocialShareButtons from "./SocialShareButtons";
import { getThemeStyles } from "@/app/utils/themeStyles";
import LinkItem from "./LinkItem";
import ContactInfo from "./ContactInfo";
import { gsap } from "gsap";
import { staggerElements } from "@/app/utils/animations";

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
  const qrWrapperRef = useRef<HTMLDivElement>(null);

  // Create refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const pinnedLinksRefs = useRef<(HTMLDivElement | null)[]>([]);
  const regularLinksRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  // Prepare link refs arrays
  useEffect(() => {
    pinnedLinksRefs.current = pinnedLinksRefs.current.slice(0, links.filter((link) => link.isPinned).length);
    regularLinksRefs.current = regularLinksRefs.current.slice(0, links.filter((link) => !link.isPinned).length);
  }, [links]);

  // Handle client-side effects after component mounts
  useEffect(() => {
    setIsMounted(true);
    setProfileUrl(`${window.location.origin}/${clientId}`);

    // Run staggered animations on mount
    if (containerRef.current) {
      // Fade in the container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );

      // Stagger the profile section
      staggerElements(
        [bioRef.current, actionsRef.current],
        { delay: 0.3, staggerAmount: 0.15 }
      );

      // Stagger the contact section
      if (contactSectionRef.current) {
        staggerElements([contactSectionRef.current], { delay: 0.5 });
      }

      // Stagger the pinned links
      if (pinnedLinksRefs.current.length > 0) {
        staggerElements(pinnedLinksRefs.current, { delay: 0.6, staggerAmount: 0.08 });
      }

      // Stagger the regular links
      if (regularLinksRefs.current.length > 0) {
        staggerElements(regularLinksRefs.current, {
          delay: 0.7 + (pinnedLinksRefs.current.length * 0.05),
          staggerAmount: 0.05
        });
      }

      // Animate the footer
      if (footerRef.current) {
        staggerElements([footerRef.current], {
          delay: 0.8 + (pinnedLinksRefs.current.length + regularLinksRefs.current.length) * 0.03
        });
      }
    }
  }, [clientId]);

  // Handle QR code toggle with animation
  const toggleQrCode = () => {
    if (!showQrCode) {
      // Show QR code
      setShowQrCode(true);
    } else {
      // Hide QR code with animation
      if (qrWrapperRef.current) {
        gsap.to(qrWrapperRef.current, {
          opacity: 0,
          y: -20,
          scale: 0.9,
          duration: 0.3,
          onComplete: () => setShowQrCode(false),
        });
      } else {
        setShowQrCode(false);
      }
    }
  };

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
      ref={containerRef}
      className={`w-full max-w-[92%] sm:max-w-xl mx-auto flex flex-col items-center gap-6 sm:gap-8 p-5 sm:p-8 rounded-2xl shadow-2xl opacity-0 ${themeStyles.container}`}
      style={{
        ...backgroundStyle,
        ...themeStyles.customStyles?.container,
      }}
    >
      {avatar && (
        <div
          className="w-24 h-24 sm:w-28 sm:h-28 relative overflow-hidden rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105 duration-300"
        >
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

      <div ref={bioRef} className="text-center space-y-2 opacity-0">
        <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
        {bio && (
          <p className="text-sm sm:text-base text-center opacity-80 max-w-xs mx-auto">
            {bio}
          </p>
        )}
      </div>

      <div ref={actionsRef} className="flex w-full justify-center items-center gap-3 opacity-0">
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
              onClick={toggleQrCode}
              className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all ${themeStyles.qrButton}`}
            >
              {showQrCode ? "Hide QR Code" : "Show QR Code"}
            </button>
          </div>
        )}
      </div>

      {/* QR Code display with animation wrapper */}
      {isMounted && enableQrCode && showQrCode && (
        <div ref={qrWrapperRef} className="w-full">
          <QRCodeComponent url={profileUrl} name={name} />
        </div>
      )}

      {/* Contact Information */}
      {contact &&
        Object.keys(contact).some(
          (key) => !!contact[key as keyof typeof contact]
        ) && (
          <div ref={contactSectionRef} className={`${themeStyles.contactSection} w-full opacity-0`}>
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
            <div
              key={`pinned-${index}`}
              ref={(el) => {
                pinnedLinksRefs.current[index] = el;
              }}
              className="opacity-0"
            >
              <LinkItem
                link={link}
                isPinned={true}
                themeStyles={themeStyles}
                theme={theme}
                onTrackClick={trackClick}
              />
            </div>
          ))}
        </div>
      )}

      {/* Regular Links */}
      <div className="w-full space-y-3 sm:space-y-4">
        {regularLinks.map((link, index) => (
          <div
            key={index}
            ref={(el) => {
              regularLinksRefs.current[index] = el;
            }}
            className="opacity-0"
          >
            <LinkItem
              link={link}
              isPinned={false}
              themeStyles={themeStyles}
              theme={theme}
              onTrackClick={trackClick}
            />
          </div>
        ))}
      </div>

      {/* Newsletter Signup - only client side */}
      {isMounted && newsletterSignup?.enabled && (
        <div className="opacity-0">
          <NewsletterSignup
            title={newsletterSignup.title}
            buttonText={newsletterSignup.buttonText}
            placeholder={newsletterSignup.placeholder}
            endpoint={newsletterSignup.endpoint}
            themeStyles={themeStyles}
          />
        </div>
      )}

      <footer ref={footerRef} className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-0 text-center">
        <p>Made with ❤️</p>
      </footer>
    </div>
  );
}
