import { ContactInfo as ContactInfoType } from '@/app/lib/getClientConfig';
import { ThemeStyles } from '@/app/utils/themeStyles';
import Icon from './Icon';

interface ContactInfoProps {
  contact: ContactInfoType;
  themeStyles: ThemeStyles;
  theme?: string;
}

export default function ContactInfo({ contact, themeStyles, theme = 'light' }: ContactInfoProps) {
  const { phone, email, location } = contact;
  
  const getPhoneUrl = (phoneNumber: string) => {
    return `tel:${phoneNumber.replace(/\s+/g, '')}`;
  };
  
  const getEmailUrl = (emailAddress: string) => {
    return `mailto:${emailAddress}`;
  };
  
  const getMapUrl = (address: string, coordinates?: { lat: number; lng: number }) => {
    if (coordinates) {
      return `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`;
    }
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  };
  
  const iconColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 
                     theme === 'custom' ? themeStyles.customStyles?.contactIcon?.color as string : 
                     'currentColor';
  
  // Determine if we have phone and/or email for the grid layout
  const hasContactMethods = (phone ? 1 : 0) + (email ? 1 : 0);
  
  return (
    <div className="w-full">
      {/* Phone and Email Row (side by side) */}
      {hasContactMethods > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          {phone && (
            <a 
              href={getPhoneUrl(phone)} 
              className={`
                group flex items-center justify-between p-3 rounded-lg
                transition-all duration-300 
                hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow
                ${themeStyles.contactCard}
              `}
              style={themeStyles.customStyles?.contactCard}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3 transition-transform group-hover:scale-110 duration-300">
                  <Icon name="phone" color={iconColor} size={18} />
                </div>
                <span className="text-sm font-medium truncate">{phone}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          )}
          
          {email && (
            <a 
              href={getEmailUrl(email)} 
              className={`
                group flex items-center justify-between p-3 rounded-lg
                transition-all duration-300
                hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow
                ${themeStyles.contactCard}
              `}
              style={themeStyles.customStyles?.contactCard}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-3 transition-transform group-hover:scale-110 duration-300">
                  <Icon name="email" color={iconColor} size={18} />
                </div>
                <span className="text-sm font-medium truncate">{email}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          )}
        </div>
      )}
      
      {/* Location (always full width) */}
      {location && (
        <div className="w-full">
          <a 
            href={getMapUrl(location.address, location.coordinates)} 
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center justify-between p-3 rounded-lg
              transition-all duration-300
              hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow
              ${themeStyles.contactCard}
            `}
            style={themeStyles.customStyles?.contactCard}
          >
            <div className="flex items-center max-w-[90%]">
              <div className="flex-shrink-0 mr-3 transition-transform group-hover:scale-110 duration-300">
                <Icon name="location" color={iconColor} size={18} />
              </div>
              <span className="text-sm font-medium truncate">{location.address}</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
