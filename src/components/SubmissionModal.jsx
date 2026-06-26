import { useEffect, useRef, useState } from 'react';
import MapboxAddressInput from './MapboxAddressInput';
import exampleWidePhoto from '../assets/images/reviews/50-gallon-atmospheric-water-heater-installation-cedar-lake-jenison-mi-hippey.jpg';
import exampleDataPlatePhoto from '../assets/images/wh-data-sticker.jpg';

const SERVICE_ZIP_CODES = [
    "49503", "49504", "49505", "49506", "49507", "49508", "49509", "49512", "49519", "49525", "49534", "49544", "49546", "49548", "49424", "49423", "49426", "49428", "49464", "49441", "49442", "49444", "49445", "49440", "49010", "49406", "49408", "49450", "49453", "49046", "49058", "49073", "48846", "48881", "48815", "49001", "49004", "49006", "49007", "49008", "49009", "49024"
];

export default function SubmissionModal({  quoteData, onClose, onCancel }) {
    const [customer, setCustomer] = useState({
        fullName: '',
        address: '',
        zipCode: '',
        phone: '',
        email: '',
        comments: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [photoFiles, setPhotoFiles] = useState({
        wide: null,
        plate: null
    });
    const [widePreviewUrl, setWidePreviewUrl] = useState('');
    const [platePreviewUrl, setPlatePreviewUrl] = useState('');
    const [selectedAddressFeature, setSelectedAddressFeature] = useState(null);
    const [addressVerifiedAutocomplete, setAddressVerifiedAutocomplete] = useState(false);
    const [turnstilePassed, setTurnstilePassed] = useState(false);
    const [zipValid, setZipValid] = useState(true);
    const [zipMessage, setZipMessage] = useState('');

    const formRef = useRef(null);
    const quoteUrl = typeof window !== 'undefined' ? window.location.href : '';
    const smsHref = 'sms:+16163150999?&body=Hello%2C%20here%20are%202%20photos%20of%20my%20water%20heater%20for%20price%20verification.';

    const { selectedModel, answers } = quoteData;

    // Validation functions
    const isNameValid = customer.fullName.trim().length > 1;
    const isPhoneValid = /^\d{10,}$/.test(customer.phone.replace(/\D/g, ''));
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
    const isZipFormatValid = /^\d{5}$/.test(customer.zipCode);
    const isAddressValid = customer.address.trim().length > 4;
    const isFormValid = isNameValid && isPhoneValid && isEmailValid && isAddressValid && isZipFormatValid;
    const photoCount = [photoFiles.wide, photoFiles.plate].filter(Boolean).length;
    const MAX_PHOTO_MB = 8;
    const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const fuelNameMap = {
        gas: 'Natural Gas',
        electric: 'Electric',
        propane: 'Propane',
        oil: 'Fuel Oil'
    };

    function getZipFromMapboxFeature(feature) {
        const zipContext = feature?.context?.find(c => c.id.startsWith('postcode'));
        return zipContext ? zipContext.text : '';
    }

    function validateServiceZip(zipCode) {
        const normalizedZip = zipCode.trim();

        if (!/^\d{5}$/.test(normalizedZip)) {
            setZipValid(false);
            setZipMessage('Please enter a valid 5-digit zip code.');
            return false;
        }

        const inServiceArea = SERVICE_ZIP_CODES.includes(normalizedZip);
        setZipValid(inServiceArea);
        setZipMessage(
            inServiceArea
                ? ''
                : `We currently don't service ${normalizedZip}. To maintain our same-day installation standard, we restrict our service radius to West Michigan. If you believe this is an error, please call us at 616-315-0999.`
        );

        return inServiceArea;
    }

    // Handle Turnstile script load (optional, for local dev)
    useEffect(() => {
        if (!window.turnstile) {
            const script = document.createElement('script');
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    // Verify Turnstile has passed
    useEffect(() => {
        window.javascriptCallback = function(token) {
            setTurnstilePassed(!!token);
        };
        return () => {
            window.javascriptCallback = undefined;
        };
    }, []);

    useEffect(() => {
        if (!photoFiles.wide) {
            setWidePreviewUrl('');
            return;
        }

        const objectUrl = URL.createObjectURL(photoFiles.wide);
        setWidePreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [photoFiles.wide]);

    useEffect(() => {
        if (!photoFiles.plate) {
            setPlatePreviewUrl('');
            return;
        }

        const objectUrl = URL.createObjectURL(photoFiles.plate);
        setPlatePreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [photoFiles.plate]);

    // Prevent submission if not valid
    const handleFormSubmit = (e) => {
        if (!isFormValid) {
            e.preventDefault();
            setError('Please fill out all fields correctly and enter a valid zip code.');
            return false;
        }

        if (!validateServiceZip(customer.zipCode)) {
            e.preventDefault();
            setError('Please enter a serviceable West Michigan zip code or call 616-315-0999 for help.');
            return false;
        }

        const invalidUploads = [];
        const selectedFiles = [
            { label: 'wide photo', file: photoFiles.wide },
            { label: 'data plate photo', file: photoFiles.plate }
        ];

        for (const { label, file } of selectedFiles) {
            if (!file) {
                continue;
            }

            if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
                invalidUploads.push(`${label} must be a JPG, PNG, WEBP, or HEIC image.`);
            }

            if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
                invalidUploads.push(`${label} must be ${MAX_PHOTO_MB}MB or smaller.`);
            }
        }

        if (invalidUploads.length > 0) {
            e.preventDefault();
            setError(invalidUploads[0]);
            return false;
        }

        setSubmitting(true);
        setError(null);
        // Let the browser submit the form natively
    };

    const handlePhotoChange = (type, event) => {
        const file = event.target.files?.[0] || null;
        setPhotoFiles((prev) => ({ ...prev, [type]: file }));
        setError(null);
    };

    const handleAddressSelect = (addressFeature) => {
        const featureZip = getZipFromMapboxFeature(addressFeature);

        setSelectedAddressFeature(addressFeature);
        setAddressVerifiedAutocomplete(true);
        setCustomer((prev) => ({
            ...prev,
            address: addressFeature.place_name,
            zipCode: featureZip || prev.zipCode
        }));

        if (featureZip) {
            validateServiceZip(featureZip);
        }
    };

    const handleAddressInputChange = (value) => {
        setSelectedAddressFeature(null);
        setAddressVerifiedAutocomplete(false);
        setCustomer((prev) => ({ ...prev, address: value }));
    };

    const handleZipChange = (event) => {
        const nextZip = event.target.value.replace(/\D/g, '').slice(0, 5);
        setCustomer((prev) => ({ ...prev, zipCode: nextZip }));
        setError(null);

        if (zipMessage) {
            setZipMessage('');
        }

        if (nextZip.length < 5) {
            setZipValid(true);
        }
    };

    const priceRange =
        selectedModel?.totalLow === selectedModel?.totalHigh
            ? `$${selectedModel?.totalLow.toLocaleString()}`
            : `$${selectedModel?.totalLow.toLocaleString()} - $${selectedModel?.totalHigh.toLocaleString()}`;

    const quoteDataPayload = JSON.stringify({
        model: {
            ...selectedModel,
            displayName: [selectedModel?.brand, selectedModel?.seriesName, selectedModel?.typeLabel]
                .filter(Boolean).join(' '),
            displayCapacity: selectedModel?.type === 'tankless'
                ? (selectedModel?.gpm ? `${selectedModel.gpm} GPM` : null)
                : (selectedModel?.size ? `${selectedModel.size} Gallon` : null),
            displayPrice: priceRange
        },
        user: {
            system: {
                ...answers,
                displayFuel: fuelNameMap[answers?.fuel] ?? null,
                displaySystemFuel: [
                    answers?.currentSystem === 'tankless' ? 'Tankless'
                        : answers?.currentSystem === 'tank' ? 'Tank water heater' : null,
                    fuelNameMap[answers?.fuel] ?? null
                ].filter(Boolean).join(' \u2014 ') || null,
                displayShowers: answers?.showers
                    ? `${answers.showers === 'plus' ? '6+' : answers.showers} shower${answers.showers !== '1' ? 's' : ''} in household`
                    : null,
                displayVent: answers?.ventType === 'pvc' ? 'Power vent'
                    : answers?.ventType === 'metal' ? 'Natural draft' : null,
                displayMobileHome: answers?.isMobileHome === 'true' ? 'Mobile home installation' : null
            },
            contact: {
                fullName: customer.fullName,
                address: customer.address,
                zipCode: customer.zipCode,
                phone: customer.phone,
                email: customer.email,
                comments: customer.comments
            }
        }
    });

    return (
        <>
            <div className="bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">Good pick. One quick check and your quote is set.</h2>
            </div>

            <div className="p-6">

                <h3 className="text-xl font-semibold text-primary">Model Information</h3>

                <ul className="list-disc list-outside ml-4 mb-4 text-sm">
                    <li><strong>Model:</strong> {selectedModel?.brand ?? 'Rheem'} {selectedModel.label}</li>
                    <li><strong>Fuel Type:</strong> {fuelNameMap[answers.fuel]}</li>
                    <li><strong>Unit Warranty:</strong>
                        {
                            selectedModel?.warranty?.tank
                                ? ` ${selectedModel?.warranty?.tank + 4} Yr Tank, ${selectedModel?.warranty?.parts} Yr Parts`
                                : ` ${selectedModel?.warranty?.heatExchanger} Yr Heat Exchanger, ${selectedModel?.warranty?.parts} Yr Parts`
                        }
                    </li>
                    <li><strong>Labor Warranty:</strong>
                        {
                            selectedModel?.warranty?.labor
                                ? ` ${selectedModel?.warranty?.labor} Yr Labor`
                                : ' Ask for details'
                        }
                    </li>
                    <li><strong>Installed Price: {priceRange}</strong></li>
                </ul>

                <h3 className="text-xl font-semibold text-primary mb-2">Next Step: Lock In Your Price</h3>

                <p className="mb-2">
                    Add 2 quick photos below to skip the in-person visit and lock in your quote faster.
                </p>
                <p className="mb-4">
                    No photos? No problem. Submit this form without them and we'll follow up by text to finish up.
                </p>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form
                    className="bg-white space-y-6 mt-6"
                    ref={formRef}
                    action="https://contact-form-handler.jeffstienstra.workers.dev/"
                    // action="http://localhost:8787"
                    method="POST"
                    encType="multipart/form-data"
                    onSubmit={handleFormSubmit}
                    autoComplete="off"
                >
                    <h3 className="text-xl font-semibold text-primary mb-2">Your details</h3>

                    <div>
                        <label className="block text-sm font-medium">Full Name*</label>
                        <input
                            type="text"
                            name="full_name"
                            required
                            placeholder="Full name"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${!isNameValid && customer.fullName ? 'border-red-500' : ''}`}
                            value={customer.fullName}
                            onChange={e => setCustomer({ ...customer, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address*</label>
                        <MapboxAddressInput
                            value={selectedAddressFeature || customer.address}
                            classes={`background-red w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${customer.address && !isAddressValid ? 'border-red-500' : ''}`}
                            onSelect={(addr) => {
                                if (!addr) {
                                    setSelectedAddressFeature(null);
                                    setAddressVerifiedAutocomplete(false);
                                    return;
                                }

                                handleAddressSelect(addr);
                            }}
                            onInputChange={handleAddressInputChange}
                            required
                        />
                        <input type="hidden" name="address" value={customer.address} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Zip Code*</label>
                        <input
                            type="text"
                            name="zip"
                            inputMode="numeric"
                            pattern="[0-9]{5}"
                            required
                            placeholder="49503"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${customer.zipCode && !zipValid ? 'border-red-500' : ''}`}
                            value={customer.zipCode}
                            onChange={handleZipChange}
                            onBlur={() => {
                                if (customer.zipCode) {
                                    validateServiceZip(customer.zipCode);
                                }
                            }}
                        />
                        {zipMessage && (
                            <p className="text-red-500 text-sm mt-1">
                                {zipMessage}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone*</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            minLength={10}
                            pattern="[0-9]{10,}"
                            placeholder="e.g. 616-315-0999"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${!isPhoneValid && customer.phone ? 'border-red-500' : ''}`}
                            value={customer.phone}
                            onChange={e => setCustomer({ ...customer, phone: e.target.value.replace(/\D/g, '') })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email*</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email address"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${!isEmailValid && customer.email ? 'border-red-500' : ''}`}
                            value={customer.email}
                            onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Comments (optional)</label>
                        <textarea
                            name="comments"
                            placeholder="Add any comments or questions here..."
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={customer.comments}
                            onChange={e => setCustomer({ ...customer, comments: e.target.value })}
                        />
                    </div>

                    <div className="mt-6 rounded-lg bg-slate-50 p-4 border border-slate-200">
                        <h4 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                            <img src="/favicon.svg" alt="Company Logo" className="w-6 h-6" />
                            Skip the Home Visit: Help Us Verify Your Quote Faster
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 mb-4">
                            Snap two quick photos so we can verify your venting and connections. No home visit required.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <label
                                className={`relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all group min-h-[170px] ${photoFiles.wide ? 'border-emerald-500 bg-slate-900' : 'border-slate-300 bg-white hover:bg-slate-100 hover:border-blue-500'}`}
                                style={photoFiles.wide && widePreviewUrl ? {
                                    backgroundImage: `url(${widePreviewUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                } : undefined}
                            >
                                <input
                                    id="verification_photo_wide"
                                    type="file"
                                    name="verification_photo_wide"
                                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                                    className="sr-only"
                                    onChange={(event) => handlePhotoChange('wide', event)}
                                />

                                {!photoFiles.wide && (
                                    <>
                                        <div className="w-16 h-22 overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-2 group-hover:scale-105 transition-transform bg-slate-100 p-1">
                                            <img
                                                src={exampleWidePhoto.src}
                                                alt="Example wide photo of a full water heater with top piping visible"
                                                className="w-full h-full object-contain object-top"
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-slate-800 block">1. WIDE SHOT</span>
                                        <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">Entire unit and top piping visible</span>
                                        <span className="mt-3 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            + Tap to Snap
                                        </span>
                                    </>
                                )}

                                {photoFiles.wide && (
                                    <>
                                        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                                        <span className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-md py-2 px-2 text-[11px] font-semibold text-white shadow-sm flex items-center justify-center gap-1.5">
                                            <svg className="w-15 h-15 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>Photo Added (Click to Change)</span>
                                        </span>
                                    </>
                                )}
                            </label>

                            <label
                                className={`relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all group min-h-[170px] ${photoFiles.plate ? 'border-emerald-500 bg-slate-900' : 'border-slate-300 bg-white hover:bg-slate-100 hover:border-blue-500'}`}
                                style={photoFiles.plate && platePreviewUrl ? {
                                    backgroundImage: `url(${platePreviewUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                } : undefined}
                            >
                                <input
                                    id="verification_photo_plate"
                                    type="file"
                                    name="verification_photo_plate"
                                    accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                                    className="sr-only"
                                    onChange={(event) => handlePhotoChange('plate', event)}
                                />

                                {!photoFiles.plate && (
                                    <>
                                        <div className="w-16 h-22 overflow-hidden rounded-lg border border-slate-200 shadow-sm mb-2 group-hover:scale-105 transition-transform bg-slate-100 p-1">
                                            <img
                                                src={exampleDataPlatePhoto.src}
                                                alt="Example close-up photo of a water heater data plate label"
                                                className="w-full h-full object-contain object-center"
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-slate-800 block">2. CLOSE-UP</span>
                                        <span className="text-[11px] text-slate-500 mt-0.5 leading-tight">Data plate sticker with model details</span>
                                        <span className="mt-3 text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            + Tap to Snap
                                        </span>
                                    </>
                                )}

                                {photoFiles.plate && (
                                    <>
                                        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
                                        <span className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/30 bg-white/20 backdrop-blur-md py-2 px-2 text-[11px] font-semibold text-white shadow-sm flex items-center justify-center gap-1.5">
                                            <svg className="w-15 h-15 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>Photo Added (Click to Change)</span>
                                        </span>
                                    </>
                                )}
                            </label>
                        </div>

                        <p className="text-center text-[11px] text-slate-400 mt-4">
                            Can't upload now? No problem. Submit your quote request first, then text your photos later to <a href={smsHref} className="text-slate-600 font-medium underline">616-315-0999</a>.
                        </p>
                    </div>

                    {/* Structured quote data: model + user system + contact */}
                    <input type="hidden" name="quote_data" value={quoteDataPayload} />
                    <input type="hidden" name="priceRange" value={priceRange} />
                    <input type="hidden" name="quote_url" value={quoteUrl} />
                    <input type="hidden" name="comments" value={customer.comments} />
                    <input type="hidden" name="address_verified_autocomplete" value={addressVerifiedAutocomplete ? 'Yes' : 'No'} />
                    <input type="hidden" name="photo_count" value={String(photoCount)} />
                    <input
                        type="hidden"
                        name="photo_status"
                        value={photoCount === 2 ? 'both_uploaded' : photoCount === 1 ? 'one_uploaded' : 'none_uploaded'}
                    />

                    {/* Cloudflare Turnstile widget for spam protection */}
                    <div
                        className="cf-turnstile mt-6 scale-[70%] xs:scale-82 sm:scale-100 origin-top-left"
                        data-sitekey="0x4AAAAAABAVhf0YyzaFtdkJ"
                        data-callback="javascriptCallback"
                        data-auto-render="false"
                    />

                    <div className="flex flex-wrap gap-4 justify-end -mt-3">
                        <button className="btn btn-outline" type="button" onClick={onCancel}>Cancel</button>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isFormValid || !turnstilePassed || submitting || !zipValid}
                        >
                            {submitting ? 'Submitting...' : 'Submit Quote'}
                        </button>
                    </div>
                    <p className='text-gray-500'>
                        Having trouble? Call <a href="tel:616-315-0999" className="underline">616-315-0999</a> to reach a technician.
                    </p>
                </form>
            </div>
        </>
    );
}