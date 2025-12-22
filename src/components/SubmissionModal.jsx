import { useEffect, useRef, useState } from 'react';
import MapboxAddressInput from './MapboxAddressInput';

const SERVICE_ZIP_CODES = [
    "49503", "49504", "49505", "49506", "49507", "49508", "49509", "49512", "49519", "49525", "49534", "49544", "49546", "49548", "49424", "49423", "49426", "49428", "49464", "49441", "49442", "49444", "49445", "49440", "49010", "49406", "49408", "49450", "49453", "49046", "49058", "49073", "48846", "48881", "48815", "49001", "49004", "49006", "49007", "49008", "49009", "49024"
];

export default function SubmissionModal({  quoteData, onClose, onCancel }) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        address: null, // Mapbox address object
        phone: '',
        email: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [turnstilePassed, setTurnstilePassed] = useState(false);
    const [zipValid, setZipValid] = useState(true); // true by default, or false if you want to force selection

    const formRef = useRef(null);
    const addressString = customer.address?.place_name || '';
    const quoteUrl = typeof window !== 'undefined' ? window.location.href : '';

    const { selectedModel, answers } = quoteData;

    // Validation functions
    const isNameValid = customer.firstname.trim().length > 1 && customer.lastname.trim().length > 1;
    const isPhoneValid = /^\d{10,}$/.test(customer.phone.replace(/\D/g, ''));
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
    const isAddressValid = !!customer.address?.place_name && zipValid;
    const isFormValid = isNameValid && isPhoneValid && isEmailValid && isAddressValid;

    function getZipFromMapboxFeature(feature) {
        const zipContext = feature?.context?.find(c => c.id.startsWith('postcode'));
        return zipContext ? zipContext.text : '';
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

    // Prevent submission if not valid
    const handleFormSubmit = (e) => {
        if (!isFormValid) {
            e.preventDefault();
            setError('Please fill out all fields correctly and select a valid address.');
            return false;
        }
        setSubmitting(true);
        setError(null);
        // Let the browser submit the form natively
    };

    const priceRange =
        selectedModel?.totalLow === selectedModel?.totalHigh
            ? `$${selectedModel?.totalLow.toLocaleString()}`
            : `$${selectedModel?.totalLow.toLocaleString()} - $${selectedModel?.totalHigh.toLocaleString()}`;

    return (
        <>
            <div className="bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-t-lg">
                <h2 className="text-xl font-semibold">A fine selection, if we may say so.</h2>
            </div>
            <div className="p-6">
                <p className="mb-2">Submit your quote to one of our techs. They'll confirm your setup by scheduling a quick video call or site visit to give you your exact price.</p>
                <p className="mb-2">If you entered everything correctly, your price will be within the range provided below.</p>
                <ul className="list-disc list-outside ml-4 mb-4 text-sm">
                    <li><strong>Model:</strong> {selectedModel.label}</li>
                    <li><strong>Fuel Type:</strong> {answers.fuel}</li>
                    <li><strong>Extended Warranty:</strong> {selectedModel.isWarrantySelected ? 'Yes' : 'No'}</li>
                    <li><strong>Total Price Range:</strong> {priceRange}</li>
                </ul>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form
                    ref={formRef}
                    action="https://contact-form-handler.jeffstienstra.workers.dev/"
                    // action="http://localhost:8787"
                    method="POST"
                    encType="application/x-www-form-urlencoded"
                    className="bg-white rounded-xl shadow-lg p-4 space-y-6"
                    onSubmit={handleFormSubmit}
                    autoComplete="off"
                >
                    <h3 className="text-xl font-semibold text-primary mb-4">Submit Your Quote</h3>

                    <div>
                        <label className="block text-sm font-medium">First Name*</label>
                        <input
                            type="text"
                            name="firstname"
                            required
                            placeholder="First name"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${!isNameValid && customer.name ? 'border-red-500' : ''}`}
                            value={customer.firstname}
                            onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Last Name*</label>
                        <input
                            type="text"
                            name="lastname"
                            required
                            placeholder="Last name"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${!isNameValid && customer.name ? 'border-red-500' : ''}`}
                            value={customer.lastname}
                            onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address*</label>
                        <MapboxAddressInput
                            value={customer.address}
                            classes={`background-red w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${customer.address && !zipValid ? 'border-red-500' : ''}`}
                            onSelect={addr => {
                                setCustomer({ ...customer, address: addr });
                                const zip = getZipFromMapboxFeature(addr);
                                setZipValid(SERVICE_ZIP_CODES.includes(zip));
                            }}
                            required
                        />
                        <input
                            type="hidden"
                            name="address"
                            value={addressString}
                            required
                        />
                        {customer.address && !zipValid && (
                            <p className="text-red-500 text-sm mt-1">
                                Sorry, this address is outside our service area.
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

                    {/* Hidden fields for model info and quote URL */}
                    <input type="hidden" name="model" value={selectedModel?.label || ''} />
                    <input type="hidden" name="fuel" value={answers?.fuel || ''} />
                    <input type="hidden" name="warranty" value={selectedModel?.isWarrantySelected ? 'Yes' : 'No'} />
                    <input type="hidden" name="priceRange" value={priceRange} />
                    <input type="hidden" name="quote_url" value={quoteUrl} />

                    {/* Cloudflare Turnstile widget for spam protection */}
                    <div
                        className="cf-turnstile mt-12 scale-[70%] xs:scale-82 sm:scale-100 origin-top-left"
                        data-sitekey="0x4AAAAAABAVhf0YyzaFtdkJ"
                        data-callback="javascriptCallback"
                        data-auto-render="false"
                    />

                    <div className="flex flex-wrap gap-4 justify-end">
                        <button className="btn btn-outline" type="button" onClick={onCancel}>Cancel</button>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!isFormValid || !turnstilePassed || submitting}
                        >
                            {submitting ? 'Submitting...' : 'Submit My Quote For Review'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}