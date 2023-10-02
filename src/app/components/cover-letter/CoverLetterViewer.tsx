import React, { useState } from 'react'
import { cx } from "lib/cx";
import { BaseForm } from 'components/ResumeForm/Form';

type Props = {
    generateCover: () => void;
    setCoverLetter: (coverLetter: string) => void;
    coverLetter: string;
    processing: boolean
}

function CoverLetterViewer({ coverLetter, generateCover, processing, setCoverLetter }: Props) {
    const [isHover, setIsHover] = useState(false);
    const generateCoverLetter = () => {
        generateCover();
    }

    return (
        <div
            className={cx(
                "flex justify-center scrollbar scrollbar-track-gray-100 scrollbar-w-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
                isHover && "scrollbar-thumb-gray-200"
            )}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <section className="flex flex-col gap-8 w-full p-[var(--resume-padding)]">
                <BaseForm>
                    <div className="grid grid-cols-6 gap-3">
                        <label className={`text-base font-medium col-span-full text-gray-700`}>
                            Cover letter
                        </label>
                        <textarea
                            onChange={(e) => setCoverLetter(e.target.value)}
                            value={coverLetter}
                            className="col-span-full min-h-[70vh] mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base"
                        />
                    </div>
                </BaseForm>
                <div className='mx-auto'>

                   { /**<button
                        disabled={processing}
                        className={`${processing ? "opacity-70" : ""} btn-primary`}
                        onClick={generateCoverLetter}>
                        {processing ? <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg> : null}
                        Generate Cover Letter
            </button>**/}
                </div>
            </section>
        </div>
    )
}

export default CoverLetterViewer