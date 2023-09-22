import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PriceCard from './PriceCard';
import StripeCard from './StripeCard';

type Props = {
    isOpen: boolean;
    setShowPaymentModal: (value: boolean) => void;
    setUserBoughtSubscription: (value: boolean) => void;
}

export const tickIcon = (<svg focusable="false" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>);

const priceList = [
    {
        duration: '14-day trail',
        price: 13.99,
        mostPopular: true
    },
    {
        duration: '1 month',
        price: 29.99,
    },
]


const PaymentModal = ({ isOpen, setShowPaymentModal, setUserBoughtSubscription }: Props) => {
    const router = useRouter();
    const [selectedStep, setSelectedStep] = React.useState(1);

    //Price 1: 14 day trail
    //Price 2: 1 month
    const [selectedPrice, setSelectedPrice] = React.useState(priceList[0].price);



    // to prevent background from being scrollable
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;


    const stepOne = (
        <>
            <h2 className='text-2xl font-semibold'>
                Download Your Resume
            </h2>
            <p className='text-gray-500 text-sm'>To download your resume simply sign up for your Membership. As an added bonus, you’ll gain instant access to our Templates and Color Palette.
            </p>
            <h3 className='text-lg font-semibold'>
                Here is what you get
            </h3>
            <div className='flex flex-col space-y-2 text-gray-500'>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>Unlimited PDF Downloads
                    </span>
                </div>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>Unlimited resumes
                    </span>
                </div>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>Duplicate resumes</span>
                </div>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>7 templates</span>
                </div>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>Cancel any time</span>
                </div>
            </div>
            <button className='btn-primary' onClick={() => {
                setSelectedStep((step) => step + 1)


            }}>Upgrade and Download</button>
        </>
    );


    const stepTwo = (
        <>
            <div className='flex items-center'>
                <button
                    onClick={() => { setSelectedStep((step) => step - 1) }}
                > <svg focusable="false" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="mr-1 inline h-5 w-5 text-gray-600 sm:-ml-3" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg></button>
                <h2 className='text-2xl font-semibold'>
                    Download Your Resume
                </h2>

            </div>
            <div className='flex flex-col space-y-2 text-gray-500'>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>Cancel any time
                    </span>
                </div>
                <div className='flex items-center text-sm space-x-2'>
                    {tickIcon}
                    <span>Money-back gurantee
                    </span>
                </div>
            </div>
            <div>
                {priceList.map((item, index) => {
                    return <PriceCard key={index} selectedPrice={selectedPrice} setSelectedPrice={setSelectedPrice} duration={item.duration} price={item.price} mostPopular={item.mostPopular} />
                })}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-4"><span>Due today:</span><span className="tracking-tight">${selectedPrice}</span></div>
            <div className="mr-3 mt-3 flex items-center justify-center gap-2"><div className="animate-pulse h-2 w-2 rounded-full bg-green-400"></div><p className="text-sm text-gray-600">161 people have used 7-day trial today</p></div>
            <button className='btn-primary' onClick={() => {
                setShowPaymentModal(false);
                setUserBoughtSubscription(true);
            }} >Next</button>
        </>
    );

    return (
        // Modal overlay
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-200 bg-opacity-50 flex backdrop-blur-sm">
            {/* Modal */}
            <div className="relative shadow-sm shadow-gray-100 bg-white w-full lg:max-w-4xl max-w-lg m-auto flex-col flex rounded-lg overflow-hidden">
                {/* Content */}
                <div className="modal-content">
                    <div className='w-full'>

                        <div className="grid grid-cols-5 w-full">
                            <div className="lg:col-span-2 col-span-5 flex flex-col space-y-4 px-8 py-5">
                                {selectedStep === 1 ? stepOne : null}
                                {selectedStep === 2 ? stepTwo : null}
                                {/* {selectedStep === 3 ? <StripeCard setSelectedStep={setSelectedStep} /> : null} */}
                            </div>
                            {/* Right Side */}
                            <div className="col-span-3 hidden items-center justify-between bg-gray-100 p-5 shadow-inner lg:flex lg:flex-col">
                                <div className=" flex flex-col items-center gap-4">

                                    <div
                                        onClick={() => setShowPaymentModal(false)}
                                        className="ml-auto w-8 h-8 p-1 cursor-pointer hover:text-black text-gray-400">
                                        <svg
                                            focusable="false"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-label="Close"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className="flex space-x-3 mt-6 mb-10">
                                        <Image
                                            className='h-20 w-fit'
                                            alt="DP" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" src="/assets/download.png" />
                                        <div>
                                            <p className="font-semibold">Awais Yusaf</p>
                                            <p className="text-gray-400">OpenResume has been incredibly useful for me — love this App. It's saved me loads of time, and my resume look great!</p>
                                        </div>
                                    </div>

                                    <Image alt="" width="400" height="300" decoding="async" data-nimg="1" src="/assets/my-resume.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PaymentModal;