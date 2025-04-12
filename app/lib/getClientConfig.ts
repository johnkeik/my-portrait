export type Link = {
  title: string;
  url: string;
  icon?: string;
  image?: string;
  isPinned?: boolean;
  analyticsId?: string;
};

export type SocialShareButton = {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'whatsapp';
  enabled: boolean;
};

export type CustomTheme = {
  background: string | { gradient: string[] };
  text: string;
  linkBackground: string;
  linkText: string;
  linkBorder?: string;
  linkShadow?: string;
  fontFamily?: string;
};

export type ContactInfo = {
  phone?: string;
  email?: string;
  location?: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
};

export type ClientConfig = {
  clientId: string;
  name: string;
  bio?: string;
  avatar?: string;
  theme?: 'light' | 'dark' | 'custom';
  customTheme?: CustomTheme;
  enableQrCode?: boolean;
  socialShareButtons?: SocialShareButton[];
  newsletterSignup?: {
    enabled: boolean;
    title: string;
    buttonText: string;
    placeholder: string;
    endpoint: string;
  };
  backgroundImage?: string;
  links: Link[];
  contact?: ContactInfo;
  analytics?: {
    enabled: boolean;
    provider?: 'google' | 'custom';
    trackingId?: string;
  };
};

// Mock database of client configurations
const clientConfigs: Record<string, ClientConfig> = {
  'aggi': {
    clientId: 'aggi',
    name: 'Chatzopoulou Aggeliki',
    bio: 'Αγροτοικός Οίκος Χατζόπουλος',
    avatar: '/images/aggi.png',
    theme: 'light',
    enableQrCode: true,
    contact: {
      phone: '+30 6980708900',
      email: 'chatz31agg@gmail.com',
      location: {
        address: 'Kilkis, Pedino 611 00',
        coordinates: {
          lat: 40.896323,
          lng: 22.863423
        }
      }
    },
    // socialShareButtons: [
    //   { platform: 'twitter', enabled: true },
    //   { platform: 'facebook', enabled: true },
    //   { platform: 'linkedin', enabled: true },
    // ],
    // newsletterSignup: {
    //   enabled: true,
    //   title: 'Join my developer newsletter',
    //   buttonText: 'Subscribe',
    //   placeholder: 'Your email address',
    //   endpoint: '/api/subscribe',
    // },
    analytics: {
      enabled: true,
      provider: 'custom',
    },
    links: [
      { title: 'Website', url: 'http://grainsbio.com/', isPinned: true, image: '/button-icons/chatzopoulos-logo.png' },
      { title: 'Facebook', url: 'https://www.facebook.com/la.v.ebella.5', icon: 'facebook' },
      { title: 'Instagram', url: 'https://www.instagram.com/aggeliki_chatzopoulou/', icon: 'instagram' },
    ]
  },
  'ginger': {
    clientId: 'ginger',
    name: 'Chatzopoulou Eirini',
    bio: 'Αγροτοικός Οίκος Χατζόπουλος',
    avatar: '/images/ginger.png',
    theme: 'custom',
    enableQrCode: true,
    contact: {
      phone: '+30 6983621605',
      email: 'eirini@grainsbio.com',
      location: {
        address: 'Thessaloniki, Krithia 572 00',
        coordinates: {
          lat: 40.83811122676807,
          lng: 22.97963245714484
        }
      }
    },
    // newsletterSignup: {
    //   enabled: true,
    //   title: 'Subscribe to my newsletter',
    //   buttonText: 'Subscribe',
    //   placeholder: 'Enter your email',
    //   endpoint: '/api/subscribe',
    // },
    analytics: {
      enabled: true,
      provider: 'google',
      trackingId: 'G-XXXXXXXX',
    },
    links: [
      { title: 'Website', url: 'https://janesmith.com', isPinned: true, image: '/button-icons/chatzopoulos-logo.png'  },
      { title: 'Facebook', url: 'https://www.facebook.com/eirinaki.chatzopoulou', icon: 'facebook' },
      { title: 'Instagram', url: 'https://www.instagram.com/eirini.chatzopoulou/' , icon: 'instagram' },
    ],
    // socialShareButtons: [
    //   { platform: 'twitter', enabled: true },
    //   { platform: 'linkedin', enabled: true },
    //   { platform: 'email', enabled: true },
    // ],
  }
};

export async function getClientConfig(clientId: string): Promise<ClientConfig | null> {
  // In a real application, this would fetch from a database or API
  // Simulate a network request
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return clientConfigs[clientId] || null;
}
