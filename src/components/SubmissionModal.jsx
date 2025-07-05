import {useState} from 'react';

export default function ConfirmQuoteModal({quoteData, onClose, onCancel}) {
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null);

	const {selectedModel, answers} = quoteData;

	function getRandomConfirmationPhrase() {
		const phrases = [
			"A fine selection, if we may say so.",
			"That’s a solid choice.",
			"Ooh, great choice!",
			"Smart move — that one’s a winner.",
			"Excellent pick. You know your stuff.",
			"Nice choice — it’s a popular one for a reason.",
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
				body: JSON.stringify(quoteData)
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
		selectedModel.totalLow === selectedModel.totalHigh
			? `$${selectedModel.totalLow.toLocaleString()}`
			: `$${selectedModel.totalLow.toLocaleString()} - $${selectedModel.totalHigh.toLocaleString()}`;

	if (submitted) {
		return (
			<div className="p-4">
				<h2 className="text-xl font-semibold mb-2">Quote Submitted</h2>
				<p>We've sent you a confirmation email and notified our team. We'll be in touch shortly.</p>
				<button className="btn btn-primary mt-4" onClick={onClose}>Close</button>
			</div>
		);
	}

	return (
		<>
			<div className="bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-t-lg">
				<h2 className="text-xl font-semibold">{getRandomConfirmationPhrase()}</h2>
			</div>
			<div className="p-6">
				<p className="mb-2">Once you submit your quote we'll pass it to one of our techs.</p>
				<p className="mb-4">They'll confirm your setup and final price with a quick video call or site check. No commitment required.</p>

				<ul className="list-disc list-outside ml-4 mb-4 text-sm">
                    <li><strong>Model:</strong> {selectedModel.label}</li>
                    <li><strong>Fuel Type:</strong> {answers.fuel}</li>
                    <li><strong>Extended Warranty:</strong> {selectedModel.isWarrantySelected ? 'Yes' : 'No'}</li>
                    <li><strong>Total Price Range:</strong> {priceRange}</li>
                </ul>


				{error && <p className="text-red-500 mb-2">{error}</p>}

				<div className="flex gap-4 justify-end">
					<button className="btn btn-outline" onClick={onCancel}>Cancel</button>
					<button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
						{submitting ? 'Submitting...' : 'Submit My Quote'}
					</button>
				</div>
			</div>
		</>
	);
}
