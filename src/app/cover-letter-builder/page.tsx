"use client";
import React, { useState } from 'react'
import JDEditor from 'components/cover-letter/JDEditor'
import CoverLetterViewer from 'components/cover-letter/CoverLetterViewer';

type Props = {}

function Page({ }: Props) {
    const [coverLetter, setCoverLetter] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [generatingProgress, setGeneratingProgress] = useState(false);
    async function generateCoverLetter() {
        setGeneratingProgress(true);
        const res = await fetch("/api/cover-letter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jobDescription: jobDescription,
                resume: JSON.parse(localStorage.getItem("open-resume-state") ?? "").resume
            })
        })
        const data = await res.json();
        setCoverLetter(data.coverLetter);
        setGeneratingProgress(false);
    }
    return (
        <main className="relative h-full w-full overflow-hidden bg-gray-50">
            <div className="grid grid-cols-3 md:grid-cols-6">
                <div className="col-span-3">
                    <JDEditor description={jobDescription} setDescription={setJobDescription} />
                </div>
                <div className="col-span-3">
                    <CoverLetterViewer setCoverLetter={setCoverLetter} processing={generatingProgress} generateCover={generateCoverLetter} coverLetter={coverLetter} />
                </div>
            </div>
        </main>
    )
}

export default Page