export type Link = {
  title: string;
  url: string;
  icon?: string;
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
    socialShareButtons: [
      { platform: 'twitter', enabled: true },
      { platform: 'facebook', enabled: true },
      { platform: 'linkedin', enabled: true },
    ],
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
      { title: 'Website', url: 'https://example.com', isPinned: true },
      { title: 'Facebook', url: 'https://github.com/johndoe' },
      { title: 'Twitter', url: 'https://twitter.com/johndoe' },
      { title: 'Instagram', url: 'https://instagram.com/johndoe' },
    ]
  },
  'ginger': {
    clientId: 'ginger',
    name: 'Chatzopoulou Eirini',
    bio: 'Αγροτοικός Οίκος Χατζόπουλος',
    avatar: '/images/ginger.png',
    theme: 'custom',
    enableQrCode: true,
    backgroundImage: '/patterns/circuit-board.svg',
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
      { title: 'Website', url: 'https://janesmith.com', isPinned: true },
      { title: 'Facebook', url: 'https://github.com/johndoe' },
      { title: 'Twitter', url: 'https://twitter.com/johndoe' },
      { title: 'Instagram', url: 'https://instagram.com/johndoe' },
    ],
    socialShareButtons: [
      { platform: 'twitter', enabled: true },
      { platform: 'linkedin', enabled: true },
      { platform: 'email', enabled: true },
    ],
  }
};

export async function getClientConfig(clientId: string): Promise<ClientConfig | null> {
  // In a real application, this would fetch from a database or API
  // Simulate a network request
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return clientConfigs[clientId] || null;
}
