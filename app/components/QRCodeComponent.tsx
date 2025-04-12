'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function QRCodeComponent({ url, name }: { url: string, name: string }) {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create ref for animation
  const qrCodeRef = useRef<HTMLDivElement>(null);
  
  // Generate QR code
  useEffect(() => {
    let isMounted = true;
    
    // Dynamic import to avoid SSR issues with QR code generation
    const generateQR = async () => {
      try {
        setIsLoading(true);
        
        // Import QRCode dynamically
        const QRCodeModule = await import('qrcode');
        
        // Only update state if component is still mounted
        if (!isMounted) return;
        
        const code = await QRCodeModule.default.toDataURL(url, {
          errorCorrectionLevel: 'M',
          margin: 2,
          scale: 8,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        });
        
        if (isMounted) {
          setQrCode(code);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to generate QR code:', err);
        if (isMounted) {
          setError('Failed to generate QR code');
          setIsLoading(false);
        }
      }
    };
    
    generateQR();
    
    return () => {
      isMounted = false;
    };
  }, [url]);
  
  // Animation effect when QR code is loaded
  useEffect(() => {
    if (!isLoading && qrCode && qrCodeRef.current) {
      // Set initial state
      gsap.set(qrCodeRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        y: 10 
      });
      
      // Create animation
      gsap.to(qrCodeRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }
    
    // Clean up animation when component unmounts
    return () => {
      if (qrCodeRef.current) {
        gsap.killTweensOf(qrCodeRef.current);
      }
    };
  }, [isLoading, qrCode]);
  
  if (isLoading) {
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-40 w-40 bg-gray-200 rounded-md mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Generating QR code...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-6 text-center text-red-500">
        <p>{error}</p>
        <p className="text-sm mt-1">Please try again later</p>
      </div>
    );
  }
  
  return (
    <div 
      ref={qrCodeRef}
      className="bg-white p-4 rounded-xl shadow-md"
    >
      {qrCode && (
        <div className="relative w-40 h-40 mx-auto">
          <Image 
            src={qrCode} 
            alt={`QR Code for ${name}`}
            fill
            sizes="160px"
            className="object-contain"
            unoptimized // Required for data URLs
          />
        </div>
      )}
      <p className="text-xs text-center mt-2 text-gray-500">Scan to visit this link tree</p>
    </div>
  );
}
