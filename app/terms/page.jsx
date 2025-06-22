'use client'
import React, { useState } from 'react';
import Footer from '@/components/Footer'; 

const sections = [
	{
		id: 'introduction',
		title: 'Introduction',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Introduction</h2>
				<p className="mb-4">
					These Terms of Service ("Terms") explain the rules, responsibilities, and rights you have when using BoomIt! services. By accessing or using our services, you agree to these Terms. You must be at least 16 years old to use BoomIt! and are expected to comply with all applicable laws and regulations. Please read these Terms carefully before using our services.
				</p>
			</>
		),
	},
	{
		id: 'user-content',
		title: 'User Content',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">User Content</h2>
				<p className="mb-4">
					All files, data, and content you upload, share, or store through BoomIt! remain your property and responsibility. BoomIt! does not claim ownership of your content. You are responsible for ensuring that your content does not violate any laws or the rights of others. Please only share content you have the right to share, and respect the privacy and intellectual property of others.
				</p>
			</>
		),
	},
	{
		id: 'usage',
		title: 'Usage Rules',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Usage Rules</h2>
				<ul className="list-disc ml-6 mb-4">
					<li>Do not use BoomIt! for illegal, harmful, or abusive activities, including but not limited to hacking, spreading malware, or harassment.</li>
					<li>Respect intellectual property and privacy rights. Do not upload or share content that infringes on copyrights, trademarks, or personal data.</li>
					<li>Do not upload, share, or distribute prohibited, offensive, or illegal content, including hate speech, violence, or explicit material.</li>
					<li>Respect the rights and privacy of other users at all times.</li>
				</ul>
				<p className="mb-4">Violation of these rules may result in suspension or termination of your account and legal action if necessary.</p>
			</>
		),
	},
	{
		id: 'account',
		title: 'Account & Security',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Account & Security</h2>
				<p className="mb-4">
					You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please use a strong password and do not share your login information with others. BoomIt! is not liable for any unauthorized use of your account. If you suspect any unauthorized activity, please contact us immediately.
				</p>
			</>
		),
	},
	{
		id: 'liability',
		title: 'Limitation of Liability',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
				<p className="mb-4">
					BoomIt! provides its services "as is" and makes no warranties, express or implied, regarding the reliability, availability, or suitability of the services for your needs. To the fullest extent permitted by law, BoomIt! is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the services, including but not limited to data loss, service interruptions, or unauthorized access.
				</p>
			</>
		),
	},
	{
		id: 'changes',
		title: 'Changes to Terms',
		content: (
			<>
				<h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
				<p className="mb-4">
					BoomIt! may update these Terms of Service from time to time to reflect changes in our services, legal requirements, or business practices. We will notify you of significant changes, but it is your responsibility to review the Terms regularly. Continued use of the services after changes are posted means you accept the updated Terms.
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
					If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at{' '}
					<a href="mailto:legal@boomit.com" className="text-blue-600 underline">
						legal@boomit.com
					</a>
					. We are here to help and will respond as soon as possible.
				</p>
			</>
		),
	},
]

function page() {
	const [activeSection, setActiveSection] = useState(sections[0].id)

	return (
		<div className="flex min-h-screen">
			<aside className="w-80 min-w-[220px] border-r border-gray-200 bg-[#171717] py-16 px-8 flex flex-col gap-2 text-gray-100">
				<a href="/">
					<img src="/boomit-white.png" alt="BoomIt Logo" className="w-32 mb-6 self-center" />
				</a>
				<h2 className="font-bold text-lg mb-4">Terms of Service</h2>
				<nav className="flex flex-col gap-2 text-base">
					{sections.map((section) => (
						<button
							key={section.id}
							onClick={() => setActiveSection(section.id)}
							className={`text-left px-2 py-1 rounded transition-colors ${
								activeSection === section.id
									? 'bg-gray-200 font-semibold text-black'
									: 'hover:bg-gray-100'
							}`}
						>
							{section.title}
						</button>
					))}
				</nav>
			</aside>
			<main className="flex-1 flex flex-col items-start justify-center px-8 py-16">
				<h1 className="text-5xl font-bold mb-8">Terms of Service</h1>
				<div className="prose max-w-2xl text-gray-900 w-full">
					{sections.find((section) => section.id === activeSection)?.content}
				</div>
			</main>
      <Footer/>
		</div>
	)
}

export default page