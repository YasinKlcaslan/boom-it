'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState } from 'react';

const sections = [
	{
		id: 'introduction',
		title: 'Introduction',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Introduction</h2>
				<p className="mb-4">
					This Privacy & Cookie Policy explains how BoomIt! collects, uses,
					shares, and protects your personal data when you use our services,
					software, and websites. By using BoomIt!, you agree to the practices
					described in this policy. Please read it carefully to understand your
					rights and our responsibilities regarding your information.
				</p>
			</>
		),
	},
	{
		id: 'data-collection',
		title: 'Data Collection',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Data Collection</h2>
				<p className="mb-4">
					We collect personal data in several ways to provide and improve our
					services:
				</p>
				<ul className="list-disc ml-6 mb-4">
					<li>
						<b>Information you provide:</b> Such as your name, email, address,
						company, phone number, payment details, and any content you upload or
						share.
					</li>
					<li>
						<b>Automatically collected information:</b> Device details, IP
						address, usage data, cookies, and technical logs when you use our
						services.
					</li>
					<li>
						<b>Information from third parties:</b> Data from partners, payment
						providers, and other users, as required for service delivery and
						security.
					</li>
				</ul>
			</>
		),
	},
	{
		id: 'data-usage',
		title: 'Data Usage',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Data Usage</h2>
				<p className="mb-4">We use your data to:</p>
				<ul className="list-disc ml-6 mb-4">
					<li>Deliver, operate, and maintain our services</li>
					<li>Process payments and manage subscriptions</li>
					<li>Improve and personalize your experience</li>
					<li>Communicate with you about updates, offers, and support</li>
					<li>Ensure security, prevent fraud, and comply with legal obligations</li>
				</ul>
				<p className="mb-4">
					We rely on legal bases such as contract performance, legitimate
					interest, consent, and legal compliance for processing your data.
				</p>
			</>
		),
	},
	{
		id: 'data-sharing',
		title: 'Data Sharing',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Data Sharing</h2>
				<p className="mb-4">
					We may share your data with service providers, business partners, legal
					authorities, and other BoomIt! entities when necessary for service
					delivery, legal compliance, or business operations. We ensure that
					appropriate safeguards are in place, especially when transferring data
					outside the EEA.
				</p>
			</>
		),
	},
	{
		id: 'cookies',
		title: 'Cookies',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Cookies</h2>
				<p className="mb-4">
					We use cookies and similar technologies to operate our services, remember
					your preferences, analyze usage, and deliver relevant advertising. You can
					manage or disable cookies in your browser settings, but this may affect
					your experience.
				</p>
			</>
		),
	},
	{
		id: 'security',
		title: 'Security',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Security</h2>
				<p className="mb-4">
					We implement technical and organizational measures to protect your
					personal data, including encryption, access controls, and regular staff
					training. While we strive to safeguard your information, no system is
					completely secure. Please contact us if you suspect any security issues.
				</p>
			</>
		),
	},
	{
		id: 'retention',
		title: 'Data Retention',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
				<p className="mb-4">
					We retain your personal data only as long as necessary to provide our
					services, fulfill legal obligations, resolve disputes, and enforce our
					agreements. Retention periods may vary depending on the type of data and
					applicable laws.
				</p>
			</>
		),
	},
	{
		id: 'rights',
		title: 'Your Rights',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
				<p className="mb-4">
					Under GDPR and similar laws, you have the right to access, correct,
					delete, restrict, or object to the processing of your data, and to
					withdraw consent at any time. You may also lodge a complaint with a
					supervisory authority. To exercise your rights, contact us at{' '}
					<a
						href="mailto:legal@boomit.com"
						className="text-blue-600 underline"
					>
						legal@boomit.com
					</a>
					.
				</p>
			</>
		),
	},
	{
		id: 'minors',
		title: "Children's Privacy",
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Children’s Privacy</h2>
				<p className="mb-4">
					BoomIt! is not intended for children under 16 years of age. We do not
					knowingly collect personal data from minors. If you are under 16, please
					do not use our services or provide any personal information.
				</p>
			</>
		),
	},
	{
		id: 'contact',
		title: 'Contact',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Contact</h2>
				<p className="mb-4">
					If you have any questions or concerns about this Privacy & Cookie Policy
					or your data, please contact us at{' '}
					<a
						href="mailto:legal@boomit.com"
						className="text-blue-600 underline"
					>
						legal@boomit.com
					</a>{' '}
					or by mail at Keizersgracht 281, 1016 ED, Amsterdam, The Netherlands.
					You can also reach our Data Protection Officer at{' '}
					<a
						href="mailto:dpo@boomit.com"
						className="text-blue-600 underline"
					>
						dpo@boomit.com
					</a>
					.
				</p>
			</>
		),
	},
];

function page() {
	const [activeSection, setActiveSection] = useState(sections[0].id);

	return (
		<div className="min-h-screen bg-white">
			<Navbar />
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
				<div className="flex gap-12">
					<aside className="w-80 flex-shrink-0">
						<div className="sticky top-8">
							<h2 className="text-xl font-semibold mb-6 text-gray-900">Privacy & Cookie Policy</h2>
							<nav className="space-y-1">
								{sections.map((section) => (
									<button
										key={section.id}
										onClick={() => setActiveSection(section.id)}
										className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
											activeSection === section.id
												? 'bg-gray-100 text-gray-900 font-medium'
												: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
										}`}
									>
										{section.title}
									</button>
								))}
							</nav>
						</div>
					</aside>

					<main className="flex-1 max-w-4xl">
						<div className="mb-8">
							<h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy & Cookie Policy</h1>
							<p className="text-lg text-gray-600">
								This Privacy & Cookie Policy explains how BoomIt! collects, uses, shares, and protects your personal data when you use our services.
							</p>
						</div>

						<div className="prose prose-lg max-w-none">
							{sections.find((section) => section.id === activeSection)?.content}
						</div>

						<div className="mt-12 pt-8 border-t border-gray-200">
							<p className="text-sm text-gray-500">Last updated: July 31, 2025</p>
						</div>
					</main>
				</div>
			</div>
			
			<Footer/>
		</div>
	);
}

export default page;