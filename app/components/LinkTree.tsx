'use client';

import { ClientConfig, Link as LinkType } from '@/app/lib/getClientConfig';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SocialShareButtons from './SocialShareButtons';

// Import QRCodeComponent and NewsletterSignup dynamically to avoid hydration issues
const QRCodeComponent = dynamic(() => import('./QRCodeComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-40 w-40 bg-gray-200 rounded-md mx-auto"></div>
        <p className="mt-2 text-sm text-gray-500">Loading QR code...</p>
      </div>
    </div>
  )
});

const NewsletterSignup = dynamic(() => import('./NewsletterSignup'), {
  ssr: false,
  loading: () => <div className="w-full h-20 animate-pulse bg-gray-100 rounded-xl"></div>
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
    analytics
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
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'repeat' }
    : {};
  
  // Get pinned and regular links
  const pinnedLinks = links.filter(link => link.isPinned);
  const regularLinks = links.filter(link => !link.isPinned);
  
  return (
    <div 
      className={`w-full max-w-[92%] sm:max-w-xl mx-auto flex flex-col items-center gap-6 sm:gap-8 p-5 sm:p-8 rounded-2xl shadow-2xl ${themeStyles.container}`}
      style={backgroundStyle}
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
        {bio && <p className="text-sm sm:text-base text-center opacity-80 max-w-xs mx-auto">{bio}</p>}
      </div>
      
      {/* Social Share Buttons - only render when client-side */}
      {isMounted && socialShareButtons && socialShareButtons.length > 0 && (
        <SocialShareButtons 
          buttons={socialShareButtons}
          url={profileUrl}
          title={`Check out ${name}'s link tree`}
        />
      )}
      
      {/* QR Code toggle button */}
      {isMounted && enableQrCode && (
        <div className="w-full flex justify-center mb-2">
          <button 
            onClick={() => setShowQrCode(!showQrCode)}
            className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all ${themeStyles.qrButton}`}
          >
            {showQrCode ? 'Hide QR Code' : 'Show QR Code'}
          </button>
        </div>
      )}
      
      {/* QR Code display - only client side */}
      {isMounted && enableQrCode && showQrCode && (
        <QRCodeComponent 
          url={profileUrl}
          name={name}
        />
      )}
      
      {/* Pinned Links (if any) */}
      {pinnedLinks.length > 0 && (
        <div className="w-full space-y-3 sm:space-y-4">
          <h2 className="text-sm font-medium opacity-60 text-center mb-1">PINNED</h2>
          {pinnedLinks.map((link, index) => (
            <Link 
              key={`pinned-${index}`}
              href={link.url}
              onClick={() => trackClick(link)}
              target="_blank" 
              rel="noopener noreferrer"
              className={`
                block py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl text-center font-medium 
                transform transition-all duration-300 
                hover:scale-105 hover:-translate-y-1 hover:shadow-lg
                active:scale-95 active:shadow-inner
                text-sm sm:text-base
                ${themeStyles.pinnedLink}
              `}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
      
      {/* Regular Links */}
      <div className="w-full space-y-3 sm:space-y-4">
        {regularLinks.map((link, index) => (
          <Link 
            key={index} 
            href={link.url}
            onClick={() => trackClick(link)}
            target="_blank" 
            rel="noopener noreferrer"
            className={`
              block py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl text-center font-medium 
              transform transition-all duration-300 
              hover:scale-105 hover:-translate-y-1 hover:shadow-lg
              active:scale-95 active:shadow-inner
              text-sm sm:text-base
              ${themeStyles.link}
            `}
          >
            {link.title}
          </Link>
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
        <p>Made with ❤️ using Next.js</p>
      </footer>
    </div>
  );
}

// Helper function to generate theme styles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getThemeStyles(theme?: string, customTheme?: any) {
  // Default light theme
  const lightTheme = {
    container: 'bg-gradient-to-br from-white to-gray-50 text-gray-900',
    link: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-md',
    pinnedLink: 'bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 shadow-md',
    qrButton: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    newsletterInput: 'bg-white border-gray-200 text-gray-800 placeholder-gray-400',
    newsletterButton: 'bg-blue-600 hover:bg-blue-700 text-white'
  };
  
  // Dark theme
  const darkTheme = {
    container: 'bg-gradient-to-br from-gray-900 to-gray-800 text-white',
    link: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 shadow-md',
    pinnedLink: 'bg-blue-900 hover:bg-green-800 text-green-100 border border-green-800 shadow-md',
    qrButton: 'bg-gray-800 text-gray-300 hover:bg-gray-700',
    newsletterInput: 'bg-gray-800 border-gray-700 text-white placeholder-gray-400',
    newsletterButton: 'bg-blue-600 hover:bg-blue-700 text-white'
  };
  
  // Custom theme
  if (theme === 'custom' && customTheme) {
    const bgStyle = typeof customTheme.background === 'string' 
      ? customTheme.background 
      : `linear-gradient(to bottom right, ${customTheme.background.gradient.join(', ')})`;
      
    return {
      container: '',
      link: '',
      pinnedLink: '',
      qrButton: 'bg-opacity-20 bg-white text-white hover:bg-opacity-30',
      newsletterInput: 'bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder-white placeholder-opacity-60',
      newsletterButton: 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white',
      customStyles: {
        container: {
          background: bgStyle,
          color: customTheme.text
        },
        link: {
          background: customTheme.linkBackground,
          color: customTheme.linkText,
          borderColor: customTheme.linkBorder,
          boxShadow: customTheme.linkShadow ? `0 4px 6px ${customTheme.linkShadow}` : undefined
        },
        pinnedLink: {
          background: customTheme.linkBackground,
          color: customTheme.linkText,
          borderColor: customTheme.linkBorder,
          boxShadow: customTheme.linkShadow ? `0 4px 6px ${customTheme.linkShadow}` : undefined,
          borderWidth: '2px'
        }
      }
    };
  }
  
  return theme === 'dark' ? darkTheme : lightTheme;
}
