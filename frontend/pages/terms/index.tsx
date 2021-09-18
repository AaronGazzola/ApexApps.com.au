import Link from 'next/link';
import Button from '../../components/Button';
import Meta from '../../components/Meta';

const Index = () => {
	return (
		<>
			<Meta title='Terms and conditions | Apex Apps' />
			<h1 className='title'>Terms and conditions</h1>
			<Button
				label='View privacy policy'
				type='link'
				path='/privacy'
				variant='simple'
				size='medium'
				buttonClasses=' px-1.5 py-1'
				color='green'
			/>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm'>Business Information</h2>
				<p className='box-text'>
					<span className='font-medium'>Business Name:</span> Apex Apps
				</p>
				<p className='box-text'>
					<span className='font-medium'>ABN:</span> 81700757157
				</p>
				<p className='box-text'>
					<span className='font-medium'>Business Name Holder:</span> Aaron
					Gazzola
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Development process</h2>
				<p className='box-text'>
					Apex Apps (the &quot;Developer&quot;) provides web application design
					and development. Each development project is divided into discrete
					sections, referred to as Milestones. Development is completed to the
					satisfaction of the requirements outlined in each Milestone.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Milestones</h2>
				<p className='box-text'>
					The details of each milestone will be specified by the Developer and
					agreed upon by both parties before development begins. Milestone
					details include development deliverables such as images and other
					media, visual and functional designs, and web application features in
					the form of HTML, CSS, JavaScript, TypeScript and/or other coding
					languages.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Schedule</h2>
				<p className='box-text'>
					The start and end dates for development of each Milestone will be
					agreed upon before development of the Milestone begins.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Payment</h2>
				<p className='box-text'>
					A fixed price for each Milestone will be agreed upon before
					development of the Milestone begins. <br />
					Payments will be made for each Milestone before development of the
					given Milestone begins. The Client will pay the Developer via
					www.upwork.com, where funds will be held in escrow until the Client
					has approved completion of the milestone.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Revisions</h2>
				<p className='box-text'>
					The Developer is under no obligation to provide revisions to completed
					milestones, provided that all milestone requirements have been
					satisfied. Revisions will be implemented as independent Milestones to
					be agreed upon by both parties.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Project dashboard</h2>
				<p className='box-text'>
					Each client is provided with access to a personalised project
					dashboard at www.apexapp.com.au. <br />
					Information in the dashboard will be updated frequently to reflect the
					recent progress and state of development. This information is to be
					considered approximate in nature and may not be up to date. Any
					developed content shared with the client before the completion of the
					milestone is a work in progress and may not reflect the final product.
					<br />
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Source code storage</h2>
				<p className='box-text'>
					A private repository is created for each development project at
					www.github.com/AaronGazzola. The project source code will frequently
					be uploaded to github throughout development. This source code can be
					made available to the client at any time.
				</p>
			</div>

			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Support</h2>
				<p className='box-text'>
					The Developer will not provide support for any deliverable once the
					Client accepts it, unless otherwise agreed in writing.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Contact</h2>
				<p className='box-text'>
					The Developer will typically respond within one business day of
					receiving an email or a message via upwork.com. The Developer is not
					expected to conduct frequent or extended exchanges during ongoing
					development. Communication will instead be primarily conducted before
					and after the development of each milestone.
				</p>
			</div>
			<div className='text-box w-full max-w-xl'>
				<h2 className='title-sm text-xl font-medium'>Branding</h2>
				<p className='box-text'>
					All web applications and websites produced by the Developer will
					include the brand name “Apex Apps”, and/or the Apex Apps logo, visible
					on every page of the application. Branding will be restricted to
					subtle and design-sensitive placement in the footer.
				</p>
			</div>

			<div className='text-box w-full max-w-xl'>
				<p className='title-sm text-xl font-medium'>Privacy policy</p>
				<p className='box-text'>
					Apex Apps is committed to protecting your privacy. You can{' '}
					<Link href='/privacy'>
						<a className='font-semibold italic text-green'>
							read the full Privacy Policy here
						</a>
					</Link>
				</p>
			</div>
		</>
	);
};

export default Index;
