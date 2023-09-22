

import React, { useEffect, useRef } from 'react';
import { Resume } from 'components/Resume';
import { MobilePreview } from 'components/Resume/MobilePreview';
type Props = {
    isOpen: boolean;
    setShowPreviewModal: (value: boolean) => void;
}

const PreviewResumeModal = ({ isOpen, setShowPreviewModal }: Props) => {
    // Add 'overflow-hidden' to body when modal is open,
    const ref = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (ref.current) {
                // @ts-ignore
                ref.current.click();
            }
        }
    }, []);

    // to prevent background from being scrollable
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // Modal overlay
        <div className="fixed inset-0 z-50 overflow-auto bg-white bg-opacity-50 flex backdrop-blur-sm">
            {/* Modal */}
            <div className="relative bg-white w-full max-w-md m-auto flex-col flex">
                {/* Content */}
                <div className="modal-content">
                    <div className='w-full'>
                        <div
                            onClick={() => setShowPreviewModal(false)}
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

                        <div className="flex flex-col items-center w-full">
                            <MobilePreview />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default PreviewResumeModal;