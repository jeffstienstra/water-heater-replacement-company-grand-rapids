import canzenroiImg from '../assets/images/reviews/tankless-water-heater-installation-creston-grand-rapids-mi-canzoneri.png'
import eblyImg from '../assets/images/reviews/40-gallon-atmospheric-water-heater-installation-south-east-end-grand-rapids-mi-ebli.webp'
import petersonImg from '../assets/images/reviews/50-gallon-atmospheric-water-heater-installation-rooling-meadows-jenison-mi-peterson.jpg'
import fragaImg from '../assets/images/reviews/40-gallon-direct-vent-mobile-home-water-heater-installation-windmill-estates-holland-mi-fraga.jpg'
export interface OwnerResponse {
	response_date: string;
	text: string;
}

export interface Review {
	author: string;
	rating: 1 | 2 | 3 | 4 | 5;
	review_count: number;
	date: string;
	highlight: string | null;
	content: string;
	phrases?: string[]; // words/phrases to bold within the review content
	services_rendered: string[];
	owner_response: OwnerResponse | null;
	image?: string; // optional path relative to /public/, e.g. '/images/reviews/gordon.webp'
    alt?: string; // alt text for the image, required if image is provided
}

export const overallRating = 5.0;
export const totalReviewCount = 6;

export const reviews: Review[] = [
	{
		author: 'Gordon Canzoneri',
		rating: 5,
		review_count: 2,
		date: 'April 2026',
		highlight: 'Great price | $1,000+',
		content: `I cannot recommend Jeff and Water Heater Replacement Company enough! After getting 6 quotes from different companies, Jeff came in as the most affordable - and somehow also provided the absolute best service. He was even able to install a tankless unit for less than what other companies were quoting me just for a standard tank unit. The value is truly unmatched. What really set Jeff apart was how easy and stress-free the entire process was. He did a FaceTime walkthrough of my setup and was able to give me a firm, accurate quote on the spot - no surprises, no runaround. He answered every single question I had with patience and zero sales pressure, which I genuinely appreciated. When it came time for the installation, he was fast, thorough, and did excellent work. But what really blew me away was the cleanup - he left the area cleaner than it was when he started. That kind of attention to detail and professionalism is rare. If you're looking for someone who is communicative, honest, affordable, and does outstanding work, look no further. Jeff is the real deal. 10/10, would recommend to anyone without hesitation! -Nick`,
		phrases: ['most affordable', 'absolute best service', 'FaceTime walkthrough', 'zero sales pressure', 'left the area cleaner than it was when he started'],
		services_rendered: ['Water heater installation', 'Tankless unit installation'],
		owner_response: {
			response_date: 'April 2026',
			text: `Thanks so much for the thoughtful review Nick! I'm glad to hear you did your homework with 6 quotes, getting at least 3 quotes is exactly what I encourage people to do. I'm really glad the video call was convenient and that the tankless system worked out well for your home. Enjoy the extra storage space with that huge tank out of the way. If any questions come up or you need a quick walkthrough on your first water heater flush don't hesitate to reach out. I appreciate you trusting me with the tankless water heater installation for your home in Grand Rapids! -Jeff`,
		},
        image: canzenroiImg.src,
        alt: 'A newly installed Rheem high efficiency tankless gas water heater in a clean grand rapids basement, matching the review from Gordon Canzoneri.'
	},
	{
		author: 'Mark Peterson',
		rating: 5,
		review_count: 2,
		date: 'April 2026',
		highlight: 'Reasonable price | $1,000+',
		content: 'Called at 11am on a Saturday, he was there by 1 and done by 4. Excellent and professional, would highly recommend him.',
		phrases: ['Excellent and professional'],
		services_rendered: ['Water heater installation'],
		owner_response: {
			response_date: 'April 2026',
			text: `Thanks Mark, I really appreciate your business! Glad we could take care of your water heater replacement in Hudsonville. I hope your upcoming move goes smoothly. Take care!`,
		},
        image: petersonImg.src,
        alt: 'A newly installed Rheem 50 gallon atmospheric natural draft water heater in a Jenison basement, matching the review from Mark Peterson.'
	},
	{
		author: 'Maria Fraga',
		rating: 5,
		review_count: 5,
		date: 'April 2026',
		highlight: 'Great price | $1,000+',
		content: `Had a great experience getting my water heater installed. The technician arrived on time, explained the installation process, and completed the job quickly and professionally. Everything was left clean, and the new heater works perfectly. I really appreciate the quality service and would definitely recommend them. Thank you! Jeff`,
		phrases: ['arrived on time', 'completed the job quickly and professionally', 'Everything was left clean'],
		services_rendered: ['Water heater installation'],
		owner_response: {
			response_date: 'April 2026',
			text: `Thank you Maria, it was a pleasure working with you! Out of all the companies offering water heater replacement in Holland, I appreciate you choosing us! I'm glad you don't need to worry about your old water heater's strange noises anymore. :)`,
		},
        image: fragaImg.src,
        alt: 'A newly installed Rheem 40 gallon direct vent atmospheric water heater in a Holland mobile home exterior utility closet, matching the review from Maria Fraga.'
	},
	{
		author: 'Kailyn Ebli',
		rating: 5,
		review_count: 1,
		date: 'March 2026',
		highlight: null,
		content: `Loved how easy it was. Got an instant quote online with a really quick response time and was able to schedule next day service. Jeff was super knowledgeable and great to work with, highly recommend!`,
		phrases: ['instant quote online', 'next day service', 'super knowledgeable'],
		services_rendered: ['Water heater installation'],
		owner_response: {
			response_date: 'March 2026',
			text: `Thanks Kailyn! I genuinely appreciate your business and am glad the online quote process was easy for you. :)`,
		},
        image: eblyImg.src,
        alt: 'A newly installed Rheem 40 gallon atmospheric natural draft water heater in a Grand Rapids basement, matching the review from Kailyn Ebli.'
	},
	{
		author: 'Doug DeKruyter',
		rating: 5,
		review_count: 3,
		date: 'April 2026',
		highlight: null,
		content: `I'd highly recommend Jeff, nice guy, explained to us the problems with furnace and gave a reasonable quote and replaced it right away. He'd text me when he was going to be there, when he had to leave to get parts and when he'd be back.`,
		phrases: ['reasonable quote', 'text me when he was going to be there'],
		services_rendered: ['Furnace replacement'],
		owner_response: {
			response_date: 'April 2026',
			text: `Thanks Doug, I appreciate it! Glad we could replace your furnace in Hudsonville and get the heat back on now that winter decided to return (again).`,
		},
	},
	{
		author: 'echo 5oscar',
		rating: 5,
		review_count: 17,
		date: 'March 2026',
		highlight: 'Local Guide',
		content: 'Professional, friendly, fast, and very knowledgeable. Would highly recommend [Jeff] in Jenison. Thanks for the prompt help!',
		phrases: ['Professional, friendly, fast'],
		services_rendered: ['Water heater repair'],
		owner_response: {
			response_date: 'April 2026',
			text: `Aww, thanks! We really appreciate your business, I'm glad we could repair your water heater in Jenison.`,
		},
	},
];
