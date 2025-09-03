import {useState} from 'react';
import MapboxAddressInput from './MapboxAddressInput';

export default function ConfirmQuoteModal({quoteData, onClose, onCancel}) {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);
    const [customer, setCustomer] = useState({
        name: '',
        address: null, // expect full address object from Mapbox
        phone: '',
        email: ''
    });

const isFormValid =
	customer.name.trim() &&
	customer.address?.place_name && // or your preferred property from Mapbox object
	customer.phone.trim() &&
	customer.email.includes('@');

	const {selectedModel, answers} = quoteData;

	function getRandomConfirmationPhrase() {
		const phrases = [
			"A fine selection, if we may say so.",
			"That’s a solid choice.",
			"Smart move — that one’s a winner.",
			"Excellent pick. You know your stuff.",
			"That’ll do the job beautifully.",
			"Great call. That one’s built to last.",
			"Nice choice, can’t go wrong with that one.",
			"Strong pick. You’ve got good instincts."
		];
		return phrases[Math.floor(Math.random() * phrases.length)];
	}

	const handleSubmit = async () => {
		setSubmitting(true);
		setError(null);
		try {
			const response = await fetch('/api/submit-quote', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    ...quoteData,
                    customer
                })
			});
			if (!response.ok) throw new Error('Failed to submit quote.');
			setSubmitted(true);
		} catch (err) {
			console.error(err);
			setError(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const priceRange =
		selectedModel?.totalLow === selectedModel?.totalHigh
			? `$${selectedModel?.totalLow.toLocaleString()}`
			: `$${selectedModel?.totalLow.toLocaleString()} - $${selectedModel?.totalHigh.toLocaleString()}`;

	if (submitted) {
		return (
			<div className="p-4">
				<h2 className="text-xl font-semibold mb-2">Quote Submitted</h2>
				<p>We've sent you a confirmation email and notified our team. We'll be in touch shortly.</p>
				<button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
			</div>
		);
	}

    const isPhoneValid = /^\d{10,}$/.test(customer.phone);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
    const isNameValid = customer.name.trim().length > 1;

    const canSubmit = isPhoneValid && isEmailValid && isNameValid;

	return (
		<>
			<div className="bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-t-lg">
				<h2 className="text-xl font-semibold">{getRandomConfirmationPhrase()}</h2>
			</div>
			<div className="p-6">
				<p className="mb-2">Submit your quote to one of our techs. They'll confirm your setup by scheduling a quick video call or site visit to give you your exact price.</p>

				<ul className="list-disc list-outside ml-4 mb-4 text-sm">
                    <li><strong>Model:</strong> {selectedModel.label}</li>
                    <li><strong>Fuel Type:</strong> {answers.fuel}</li>
                    <li><strong>Extended Warranty:</strong> {selectedModel.isWarrantySelected ? 'Yes' : 'No'}</li>
                    <li><strong>Total Price Range:</strong> {priceRange}</li>
                </ul>


				{error && <p className="text-red-500 mb-2">{error}</p>}
                <div className="mb-6 grid gap-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name*</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={customer.name}
                            onChange={e => setCustomer({...customer, name: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Address*</label>
                        <MapboxAddressInput
                            value={customer.address}
                            onSelect={(addr) => setCustomer({...customer, address: addr})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone*</label>
                        <input
                            type="tel"
                            className="input input-bordered w-full"
                            value={customer.phone}
                            onChange={e => setCustomer({...customer, phone: e.target.value})}
                            required
                            minLength={10}
                            pattern="[0-9]{10,}"
                            placeholder="e.g. 6165551234"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email*</label>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            value={customer.email}
                            onChange={e => setCustomer({...customer, email: e.target.value})}
                            required
                        />
                    </div>
                </div>

				<div className="flex gap-4 justify-end">
					<button className="btn btn-outline" onClick={onCancel}>Cancel</button>
                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!canSubmit || submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit My Quote'}
                    </button>
				</div>
			</div>
		</>
	);
}
