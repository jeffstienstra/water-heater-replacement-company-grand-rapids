// import type { CallToAction } from '~/types';
import mainLogoFile from '../../public/mainLogo.webp';
import mainPhoto from '../../public/mainPhoto.webp';

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

interface GeoCoordinates {
    lat: string;
    lng: string;
}

interface OpeningHoursSpecification {
	"@type": "OpeningHoursSpecification";
	dayOfWeek: string[];
	opens: string;
	closes: string;
}

interface ImageObject {
	"@type": "ImageObject";
	url: string;
	width: number;
	height: number;
	caption: string;
}

interface BlogCategories {
    title: string;
    slug: string;
}
interface SocialLinks {
     // Explicitly define each platform key as needed
    linkedIn?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
}

interface BusinessInfo {
    analytics: {
        googleAnalyticsId: string;
        googleTagManagerId: string;
        googleSiteVerificationId: string;
        partytown: boolean;
    };
    name: string;
    logo: string;
    mainImage: ImageObject;
    url: string;
    email: string;
    primaryPhone: string;
    address: Address;
    areaServed: string[];
    geo: GeoCoordinates;
    hours: OpeningHoursSpecification[];
    website: string;
    description: string;
    blogDescription: string;
    blogTitle: string;
    blogSubtitle: string;
    blogCategories: BlogCategories[];
    defaultImgAltText: string;
    social: SocialLinks;
    indexNowKey: string;
    // ctaPrimary: CallToAction;
    // ctaSecondary: CallToAction;
    metadata: {
        title: string;
        description: string;
        robots: {
            index: boolean;
            follow: boolean;
        };
        canonical: string;
        openGraph: {
            title: string;
            description: string;
            url: string;
            type: string;
            images: Array<{
                url: string;
                width: number;
                height: number;
                alt: string;
            }>;
        };
    };
}

const baseUrl = `https://waterheaterreplacementcompany.com`;
const mainLogo = mainLogoFile.src;
const defaultImgAltText = 'Water Heater Replacement Company Logo | Water Heater Replacement Services';
const primaryPhone = '616-315-0999';
const title = 'Water Heater Replacement Services Grand Rapids | Water Heater Replacement Company';
const description = 'Water Heater Replacement Company in Grand Rapids, MI offers professional water heater replacement services for both tank and tankless systems.';
const blogDescription = 'Water Heater Replacement Company Blog | Insights and Tips for Home Water Heater Solutions';
const blogTitle = 'Water Heater Replacement Company Blog';
const blogSubtitle = 'Helpful articles and resources for homeowners seeking water heater replacement services in Grand Rapids, MI.';
const blogCategories: BlogCategories[] = [
    // {title: 'Tank Water Heaters', slug: 'tank-water-heaters'},
    // {title: 'Tankless Water Heaters', slug: 'tankless-water-heaters'},
];

export const businessInfo: BusinessInfo = {
    // NOTE: add new client domains to cloudflare Turnstile <=======================IMPORTANT========================
    analytics: {
        googleAnalyticsId: 'G-BHGY4J6RHH',
        googleTagManagerId: 'GTM-T2QWW9RC',
        googleSiteVerificationId: '',
        partytown: true,
    },
    name: 'Water Heater Replacement Company',
    address: {
        street: '7210 Coconut Dr',
        city: 'Jenison',
        state: 'MI',
        zip: '49428',
        country: 'US',
    },
    areaServed: ['Grand Rapids', 'Jenison', 'Hudsonville', 'Allendale', 'Wyoming', 'Kentwood', 'Walker', 'Comstock Park', 'Byron Center', 'East Grand Rapids', 'Ada', 'Caledonia', 'Zeeland', 'Holland', 'Grandville'],
    primaryPhone: primaryPhone,
    email: 'service@waterheaterreplacementcompany.com',
    website: baseUrl,
    url: baseUrl,
    hours: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            opens: "00:00",
            closes: "23:59"
        }
    ],
    social: {
        linkedIn: '',
        facebook: '',
    },
    logo: mainLogo,
    mainImage: {
        "@type": "ImageObject",
        url: mainPhoto.src,
        width: 1200,
        height: 800,
        caption: defaultImgAltText,
    },
    geo: {
        lat: '42.91',
        lng: '-85.79',
    },
    description: description,
    blogDescription: blogDescription,
    blogTitle: blogTitle,
    blogSubtitle: blogSubtitle,
    // NOTE: add new blog categories to the blogCategories array above <=======================IMPORTANT================
    blogCategories: blogCategories,
    defaultImgAltText: defaultImgAltText,
    indexNowKey: '9b143c67a55a33bce47d65885ebb51ba', // used to auto-generate a .txt file on build for IndexNow <=======================IMPORTANT========================
    // ctaPrimary: {
    //     variant: 'primary',
    //     text: 'Call Now',
    //     href: `tel:${primaryPhone}`,
    //     icon: 'tabler:phone',
    //     classes: 'text-white dark:text-secondary rounded-xl',
    //     id: 'call-button_cta',
    // },
    // ctaSecondary: {
    //     variant: 'secondary',
    //     text: 'Get My Exact Quote',
    //     href: '/instant-quote/?step=1',
    //     target: '_blank',
    //     icon: 'tabler:mail',
    //     classes: 'text-white dark:text-white rounded-xl',
    //     id: 'email-button_cta',
    // },
    metadata: {
        title: title,
        description: description,
        robots: {
            'index': true,
            'follow': true
        },
        canonical: baseUrl,
        openGraph: {
            title: title,
            description: description,
            url: baseUrl,
            type: 'website',
            images: [
                {
                    url: mainLogo,
                    width: 800,
                    height: 600,
                    alt: defaultImgAltText,
                },
            ],
        },
    },
};

export default businessInfo;