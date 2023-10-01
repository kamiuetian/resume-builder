"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
    ResumeControlBarCSR,
    ResumeControlBarBorder,
} from "components/Resume/ResumeControlBar";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { useAppSelector } from "lib/redux/hooks";
import { selectResume } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import {
    useRegisterReactPDFFont,
    useRegisterReactPDFHyphenationCallback,
} from "components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "components/fonts/NonEnglishFontsCSSLoader";

export const MobilePreview = ({ openPreview, setOpenPreview }: { openPreview: "none" | "for-desktop" | "for-mobile", setOpenPreview: any }) => {
    const [scale, setScale] = useState(openPreview === "for-mobile" ? 0.8 : 2);
    const resume = useAppSelector(selectResume);
    const settings = useAppSelector(selectSettings);
    const document = useMemo(
        () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
        [resume, settings]
    );

    useRegisterReactPDFFont();
    useRegisterReactPDFHyphenationCallback(settings.fontFamily);

    return (
        <>
            <NonEnglishFontsCSSLazyLoader />
            <div className="relative flex justify-center md:justify-start">
                <FlexboxSpacer maxWidth={50} className="hidden md:block" />
                <div className="relative">
                    <section className=" overflow-hidden w-full">
                        {/* @ts-ignore */}
                        <ResumeIframeCSR
                            documentSize={settings.documentSize}
                            scale={openPreview === "for-mobile" ? 0.45 : 1}
                            enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
                        >
                            <ResumePDF
                                resume={resume}
                                settings={settings}
                                isPDF={DEBUG_RESUME_PDF_FLAG}
                            />
                        </ResumeIframeCSR>
                    </section>
                    {/* @ts-ignore */}
                    <ResumeControlBarCSR
                        forMobileOnly={openPreview === "for-mobile" ? true : false}
                        scale={scale}
                        setScale={setScale}
                        documentSize={settings.documentSize}
                        document={document}
                        fileName={resume.profile.name + " - Resume"}
                    />
                </div>
                {/* <ResumeControlBarBorder /> */}
            </div>
        </>
    );
};
