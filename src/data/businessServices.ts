export interface ServiceEntry {
    name: string;
    url: string;
    description: string;
    serviceType: string; // describes the type of service in nautural language - "Water Heater Repair and Replacement in Grand Rapids, MI"
    matchKey: string;
}

export const businessServices: ServiceEntry[] = [
    {
        name: 'Water Heater Replacement',
        url: '/services/water-heater-replacement/',
        description: 'Professional water heater replacement services in Grand Rapids, MI. Expert installation of energy-efficient water heaters to keep your home comfortable.',
        serviceType: 'Water Heater Replacement in Grand Rapids, MI',
        matchKey: 'water heater replacement',
    },
    {
        name: 'Water Heater Repair',
        url: '/services/water-heater-repair/',
        description: 'Fast and reliable water heater repair services in Grand Rapids, MI. We fix leaks, no hot water, and other urgent issues to restore your comfort.',
        serviceType: 'Water Heater Repair in Grand Rapids, MI',
        matchKey: 'water heater repair',
    },
    {
        name: 'Leaking Water Heater Emergency',
        url: '/services/leaking-water-heater-emergency/',
        description: 'Leaking water heater emergency services in Grand Rapids, MI. Quick response to stop leaks and prevent water damage. Available 24/7 for urgent repairs.',
        serviceType: 'Leaking Water Heater Emergency Services in Grand Rapids, MI',
        matchKey: 'leaking water heater emergency',
    },
];