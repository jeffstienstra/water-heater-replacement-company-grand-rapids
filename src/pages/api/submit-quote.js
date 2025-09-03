export const config = {
	runtime: 'edge',
};

export default async function handler(req) {
	if (req.method !== 'POST') {
		return new Response('Method Not Allowed', {status: 405});
	}

	let data;
	try {
		data = await req.json();
	} catch {
		return new Response('Invalid JSON', {status: 400});
	}

	const {customer, selectedModel, answers} = data || {};
	const {name, email, phone, address} = customer || {};

	if (!email || !name || !phone || !address?.place_name) {
		return new Response('Missing required fields', {status: 400});
	}

	const kvKey = `quote:${email.toLowerCase()}`;

	// Save to KV
	try {
		await ENV.WHRC_QUOTE_KV.put(
			kvKey,
			JSON.stringify({
				timestamp: Date.now(),
				customer,
				selectedModel,
				answers
			})
		);
	} catch (err) {
		console.error('KV put failed:', err);
		return new Response('Failed to store quote data', {status: 500});
	}

	// Prepare email
	const htmlContent = `
		<h2>New Quote Submission</h2>
		<p><strong>Name:</strong> ${name}</p>
		<p><strong>Phone:</strong> ${phone}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Address:</strong> ${address.place_name}</p>
		<hr />
		<p><strong>Model:</strong> ${selectedModel?.label}</p>
		<p><strong>Extended Warranty:</strong> ${selectedModel?.isWarrantySelected ? 'Yes' : 'No'}</p>
		<p><strong>Fuel Type:</strong> ${answers?.fuel}</p>
		<p><strong>Price Range:</strong> $${selectedModel?.totalLow?.toLocaleString?.() || '?'} - $${selectedModel?.totalHigh?.toLocaleString?.() || '?'}</p>
	`;

	try {
		const emailRes = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${ENV.RESEND_API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'Water Heater Quotes <service@yourdomain.com>',
				to: [email, 'internal@yourdomain.com'],
				subject: `New Quote Submission from ${name}`,
				html: htmlContent
			})
		});

		if (!emailRes.ok) {
			const errorText = await emailRes.text();
			console.error('Resend error:', errorText);
			throw new Error('Email send failed');
		}
	} catch (err) {
		console.error('Email error:', err);
		return new Response('Failed to send email', {status: 500});
	}

	return new Response(JSON.stringify({ok: true}), {
		headers: {'Content-Type': 'application/json'}
	});
}
