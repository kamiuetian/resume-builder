import React, { useState } from 'react'
import { cx } from "lib/cx";
import { Input, Textarea } from 'components/ResumeForm/Form/InputGroup';
import { BaseForm } from 'components/ResumeForm/Form';
type Props = {
    description: string;
    setDescription: (description: string) => void;
}

function JDEditor({ description, setDescription }: Props) {

    const [isHover, setIsHover] = useState(false);
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
                            Job Description (Optional)
                        </label>
                        <textarea
                            className="col-span-full min-h-[80vh] mt-1 px-3 py-2 block w-full rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </BaseForm>
            </section>
        </div>
    )
}

export default JDEditor