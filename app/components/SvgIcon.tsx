'use client';

import React, { useEffect, useState } from 'react';

interface SvgIconProps {
  src: string;
  color?: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function SvgIcon({ src, color = 'currentColor', className = '', width = 24, height = 24 }: SvgIconProps) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(src);
        const svgText = await response.text();
        
        // Replace the fill or stroke with the desired color
        const colorizedSvg = svgText
          .replace(/fill="[^"]*"/g, `fill="${color}"`)
          .replace(/stroke="[^"]*"/g, `stroke="${color}"`);
          
        setSvgContent(colorizedSvg);
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadSvg();
  }, [src, color]);

  return (
    <div 
      className={className}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
