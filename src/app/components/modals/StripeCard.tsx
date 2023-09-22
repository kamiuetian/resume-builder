//@ts-nocheck
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";
import { tickIcon } from "./PaymentModal";

const stripePromise = loadStripe(
    "pk_test_51N53sQKqHnLiINxvoQdb93dKZvEUCmz27SwzJTVBfebN9ebyoITimHxZWhNwCo6hI6DAXjOpButiC8JvpoiJ0HGw003wpg4PNq"
);

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            color: "rgba(0, 0, 0, 0.8)",
            letterSpacing: "0.025em",
            // fontFamily: "Source Code Pro, monospace",
            // "::placeholder": {
            //     color: "rgba(0, 0, 0, 0.5)",
            // },
        },
        invalid: {
            iconColor: "red",
            color: "red",
        },
    },
};

const CardField = ({ onChange, setSelectedStep }: any) => (
    <>
        <div className="flex items-center">
            <button
                onClick={() => { setSelectedStep((step) => step - 1) }}
            >
                <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="mr-1 inline h-5 w-5 text-gray-600 sm:-ml-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    ></path>
                </svg>
            </button>
            <h2 className="text-2xl font-semibold">Download Your Resume</h2>
        </div>
        <div className="mt-4 flex flex-col space-y-2 text-gray-500">
            <div className="flex items-center space-x-2 text-sm">
                {tickIcon}
                <span>Cancel any time</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
                {tickIcon}
                <span>Money-back gurantee</span>
            </div>
        </div>

        <>
            <div className="mt-4 flex gap-2">
                <div>
                    <svg
                        className="h-9 w-9"
                        viewBox="0 0 40 24"
                        role="img"
                        aria-hidden="true"
                        aria-label="Visa Card"
                        focusable="false"
                    >
                        <path
                            fill="#DBDBDB"
                            d="M2.5,0 L37.5,0 C38.8807106,0 40,1.1192894 40,2.5 L40,21.5 C40,22.8807125 38.8807106,24 37.5,24 L2.5,24 C1.119288,24 0,22.8807125 0,21.5 L0,2.5 C0,1.1192894 1.119288,0 2.5,0 Z M2.5,1 C1.671573,1 1,1.6715698 1,2.5 L1,21.5 C1,22.3284264 1.671573,23 2.5,23 L37.5,23 C38.3284302,23 39,22.3284264 39,21.5 L39,2.5 C39,1.6715698 38.3284302,1 37.5,1 L2.5,1 Z"
                        ></path>
                        <path
                            fill="#FFFFFF"
                            d="M39,21.5 C39,22.3284302 38.3284302,23 37.5,23 L2.5,23 C1.6715698,23 1,22.3284302 1,21.5 L1,2.5 C1,1.6715698 1.6715698,1 2.5,1 L37.5,1 C38.3284302,1 39,1.6715698 39,2.5 L39,21.5 Z"
                        ></path>
                        <path
                            fill="#122D98"
                            d="M16.6103927,8.14763354 L13.2967874,16.0531857 L11.1349763,16.0531857 L9.50395139,9.74350943 C9.40435575,9.35450061 9.31882068,9.2127233 9.01769035,9.04868109 C8.52674247,8.78153045 7.71474513,8.53195668 7,8.37611881 L7.04804072,8.14177614 L10.5280288,8.14177614 C10.7546265,8.14270531 10.9734557,8.22437373 11.1452523,8.37212092 C11.3170489,8.51986811 11.4305645,8.7240169 11.4653995,8.94791608 L12.3266088,13.5175981 L14.4544402,8.13708812 L16.6103927,8.14763354 Z M25.0807084,13.4719013 C25.0889104,11.3850798 22.1959502,11.2702519 22.2158693,10.3387398 C22.2217279,10.0551852 22.4923936,9.75288314 23.0829372,9.67672178 C23.7744824,9.61014502 24.4711831,9.73159311 25.0994558,10.0282358 L25.4591718,8.351514 C24.8473031,8.12148089 24.1993456,8.00244476 23.5457639,8 C21.5245584,8 20.1020985,9.07445995 20.0892096,10.6129207 C20.0763208,11.7506544 21.1050851,12.385723 21.8795876,12.7641864 C22.6763526,13.1520235 22.9435033,13.4004267 22.9411599,13.7472539 C22.9411599,14.27804 22.3049195,14.511211 21.7167194,14.5205847 C20.6891268,14.535817 20.0927247,14.2428886 19.6170091,14.0214348 L19.2467477,15.7532271 C19.7248068,15.9723375 20.6071069,16.1633268 21.5210433,16.1727005 C23.6699655,16.1727005 25.0748498,15.1111282 25.0818801,13.4683861 L25.0807084,13.4719013 Z M30.420206,16.0461554 L32.3113514,16.0461554 L30.6604073,8.14060326 L28.9145544,8.14060326 C28.7273146,8.13932375 28.5440587,8.19455597 28.3888066,8.29907866 C28.2334374,8.40360134 28.1133368,8.55255071 28.0439714,8.72645992 L24.9752542,16.052014 L27.1230047,16.052014 L27.5495084,14.870927 L30.1729745,14.870927 L30.420206,16.0461554 Z M28.1388802,13.2445889 L29.2156847,10.276639 L29.8296625,13.2516191 L28.1388802,13.2445889 Z M19.5349892,8.14060326 L17.8442069,16.0461554 L15.796052,16.0461554 L17.488006,8.14060326 L19.5349892,8.14060326 Z"
                        ></path>
                    </svg>
                </div>
                <div>
                    <svg
                        className="h-9 w-9"
                        viewBox="0 0 40 24"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-hidden="true"
                        aria-label="Mastercard"
                        focusable="false"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path
                                fill="#F26122"
                                fillRule="nonzero"
                                d="M16.54 6.56836L23.48 6.56836 23.48 18.098 16.54 18.098z"
                            ></path>
                            <path
                                d="M19.98 18.098a7.075 7.075 0 0 1-4.44 1.569 7.263 7.263 0 0 1-7.2-7.334A7.263 7.263 0 0 1 15.54 5c1.616 0 3.183.554 4.44 1.569a7.435 7.435 0 0 0 0 11.53z"
                                fill="#EA1D25"
                                fillRule="nonzero"
                            ></path>
                            <path
                                d="M31.64 12.333a7.263 7.263 0 0 1-7.2 7.334A7.075 7.075 0 0 1 20 18.098a7.435 7.435 0 0 0 0-11.53A7.074 7.074 0 0 1 24.44 5a7.263 7.263 0 0 1 7.2 7.333z"
                                fill="#F69E1E"
                                fillRule="nonzero"
                            ></path>
                            <path
                                d="M37.5 0h-35A2.5 2.5 0 0 0 0 2.5v19A2.5 2.5 0 0 0 2.5 24h35a2.5 2.5 0 0 0 2.5-2.5v-19A2.5 2.5 0 0 0 37.5 0zM1 2.5A1.5 1.5 0 0 1 2.5 1h35A1.5 1.5 0 0 1 39 2.5v19a1.5 1.5 0 0 1-1.5 1.5h-35A1.5 1.5 0 0 1 1 21.5v-19z"
                                fill="#DCDBDB"
                            ></path>
                        </g>
                    </svg>
                </div>
                <div>
                    <svg
                        className="h-9 w-9"
                        viewBox="0 0 40 24"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-hidden="true"
                        aria-label="American Express Card"
                        focusable="false"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path
                                d="M39 21.5a1.5 1.5 0 0 1-1.5 1.5h-35A1.5 1.5 0 0 1 1 21.5v-19A1.5 1.5 0 0 1 2.5 1h35A1.5 1.5 0 0 1 39 2.5v19z"
                                fill="#2A70C8"
                            ></path>
                            <path
                                d="M37.5 0h-35A2.5 2.5 0 0 0 0 2.5v19A2.5 2.5 0 0 0 2.5 24h35a2.5 2.5 0 0 0 2.5-2.5v-19A2.5 2.5 0 0 0 37.5 0zM1 2.5A1.5 1.5 0 0 1 2.5 1h35A1.5 1.5 0 0 1 39 2.5v19a1.5 1.5 0 0 1-1.5 1.5h-35A1.5 1.5 0 0 1 1 21.5v-19z"
                                fill="#DBDBDB"
                            ></path>
                            <path
                                d="M7.61 8L4 15.99h4.322l.536-1.274h1.225l.536 1.274h4.757v-.973l.424.973h2.461l.424-.993v.993h9.894l1.203-1.241 1.127 1.24L35.99 16l-3.622-3.983L35.99 8h-5.003l-1.171 1.218L28.725 8H17.962l-.925 2.062L16.092 8h-4.314v.94l-.48-.94H7.61zm.837 1.135h2.107l2.394 5.417V9.135h2.308l1.85 3.884 1.705-3.884h2.296v5.733H19.71l-.012-4.493-2.037 4.493h-1.25l-2.048-4.493v4.493h-2.875l-.545-1.286H8l-.544 1.285h-1.54l2.532-5.732zm13.939 0h5.681l1.738 1.877L31.6 9.135h1.738l-2.64 2.881 2.64 2.848H31.52l-1.738-1.899-1.803 1.9h-5.593v-5.73zm-12.914.97l-.97 2.29h1.938l-.968-2.29zm14.317.217v1.046h3.1v1.167h-3.1v1.142h3.476l1.616-1.683-1.547-1.673h-3.545z"
                                fill="#FFF"
                                fillRule="nonzero"
                            ></path>
                        </g>
                    </svg>
                </div>
                <div>
                    <svg
                        className="h-9 w-9"
                        viewBox="0 0 40 24"
                        role="img"
                        aria-hidden="true"
                        aria-label="Discover Card"
                        focusable="false"
                    >
                        <path
                            d="m39 21.5c0 .83-.67 1.5-1.5 1.5h-35c-.83 0-1.5-.67-1.5-1.5v-19c0-.83.67-1.5 1.5-1.5h35c .83 0 1.5.67 1.5 1.5z"
                            fill="#fff"
                        ></path>
                        <path d="m6.21 8.45h-1.39v4.63h1.38c.73 0 1.26-.17 1.73-.54.55-.44.88-1.1.88-1.78 0-1.37-1.07-2.32-2.6-2.32zm1.1 3.48c-.3.26-.68.37-1.29.37h-.25v-3.06h.25c.61 0 .98.1 1.29.37.33.28.52.71.52 1.15 0 .45-.2.89-.52 1.17zm1.93-3.48h.94v4.63h-.94zm3.25 1.78c1.07.38 1.39.71 1.39 1.45 0 .89-.69 1.52-1.67 1.52-.72 0-1.24-.27-1.68-.88l.61-.56c.22.4.58.62 1.03.62.42 0 .73-.28.73-.65 0-.19-.09-.36-.28-.48-.1-.06-.28-.14-.65-.26-.89-.31-1.19-.63-1.19-1.27 0-.75.65-1.32 1.51-1.32.53 0 1.02.17 1.42.51l-.49.62c-.25-.26-.48-.37-.76-.37-.41 0-.7.22-.7.51 0 .25.17.38.73.58zm1.69.54c0-1.35 1.15-2.42 2.58-2.42.41 0 .75.08 1.16.28v1.06c-.39-.37-.73-.52-1.18-.52-.89 0-1.58.7-1.58 1.59 0 .94.67 1.6 1.62 1.6.43 0 .76-.14 1.14-.51v1.06c-.43.19-.78.27-1.18.27-1.44 0-2.56-1.06-2.56-2.42zm11.39.79 1.31-3.11h1.02l-2.09 4.75h-.51l-2.05-4.75h1.03zm2.76 1.52v-4.63h2.68v.78h-1.73v1.03h1.67v.79h-1.67v1.25h1.73v.79h-2.68zm6.42-3.27c0-.87-.62-1.37-1.71-1.37h-1.4v4.63h.95v-1.86h.12l1.3 1.86h1.16l-1.52-1.95c.71-.14 1.1-.6 1.1-1.31zm-1.89.76h-.27v-1.4h.29c.59 0 .91.24.91.69 0 .46-.32.71-.92.71z"></path>
                        <path
                            d="m23.39 10.78c0 1.33-1.13 2.42-2.52 2.42s-2.52-1.08-2.52-2.42c0-1.33 1.13-2.42 2.52-2.42s2.52 1.08 2.52 2.42m15.61 1.7v10.52h-30.35c19.63-3.25 30.35-10.52 30.35-10.52z"
                            fill="#e6772f"
                        ></path>
                        <path
                            d="m2.5 0h35c1.38 0 2.5 1.12 2.5 2.5v19c0 1.38-1.12 2.5-2.5 2.5h-35c-1.38 0-2.5-1.12-2.5-2.5v-19c0-1.38 1.12-2.5 2.5-2.5zm0 1c-.83 0-1.5.67-1.5 1.5v19c0 .83.67 1.5 1.5 1.5h35c .83 0 1.5-.67 1.5-1.5v-19c0-.83-.67-1.5-1.5-1.5z"
                            fill="#dbdbdb"
                        ></path>
                    </svg>
                </div>
            </div>
        </>

        <div className="grid grid-cols-1 gap-y-2">
            <div>
                <label htmlFor="name" className="block items-center text-sm text-gray-700">
                    Card number
                </label>
                <CardNumberElement
                    className=" focus:border-primary-600 mt-1 block w-full appearance-none truncate rounded-sm border-0 border-b-2 border-transparent bg-gray-100 px-3 py-2 text-lg text-black focus:outline-none"
                    options={CARD_OPTIONS}
                    onChange={onChange}
                />
            </div>

            <div>
                <label htmlFor="name" className="block items-center text-sm text-gray-700">
                    Expiry date
                </label>
                <CardExpiryElement
                    className=" focus:border-primary-600 mt-1 block w-full appearance-none truncate rounded-sm border-0 border-b-2 border-transparent bg-gray-100 px-3 py-2 text-lg text-black focus:outline-none"
                    options={CARD_OPTIONS}
                    onChange={onChange}
                />
            </div>

            <div>
                <label htmlFor="name" className="block items-center text-sm text-gray-700">
                    Security code
                </label>
                <CardCvcElement
                    className=" focus:border-primary-600 mt-1 block w-full appearance-none truncate rounded-sm border-0 border-b-2 border-transparent bg-gray-100 px-3 py-2 text-lg text-black focus:outline-none"
                    options={CARD_OPTIONS}
                    onChange={onChange}
                />
            </div>
        </div>
    </>
);

const CheckoutForm = ({ setSelectedStep, secret }: { setSelectedStep: any, secret: any }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        console.log("Client secret:", secret);
        if (!stripe) {
            return;
        }


        if (!secret) {
            return;
        }
        stripe.retrievePaymentIntent(secret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        })
    }, [stripe]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        //     const { error, payload } = await stripe.createPaymentMethod({
        //         type: "card",
        //         card: elements.getElement(CardNumberElement),


        //     });

        //     if (!error) {
        //         console.log(payload);
        //     }
        //     else {
        //         console.log(error);
        //     }
    };
    const [paymentSuccess, setPaymentSuccess] = React.useState(false);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <CardField onChange={(e) => console.log(e)} setSelectedStep={setSelectedStep} />
            {/* type="submit" */}
            <button onClick={() => setPaymentSuccess(true)} className="btn-primary mx-auto mt-6">
                Upgrade & Download
            </button>
            {paymentSuccess && <div className="text-center mt-4 text-green-600">{"Subscribed successfully!"}</div>}
        </form>
    );
};


function StripeCard({ setSelectedStep }: { setSelectedStep: any }) {
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 13.99 }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);


    if (!clientSecret) return (<div>Loading...</div>);

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
        }
    };


    return (
        <>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm setSelectedStep={setSelectedStep} secret={clientSecret} />
            </Elements>
        </>
    );
}


export default StripeCard;
