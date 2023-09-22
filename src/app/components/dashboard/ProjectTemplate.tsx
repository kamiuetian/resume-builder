import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import { ResumePDF } from 'components/Resume/ResumePDF';
import { ResumeIframeCSR } from 'components/Resume/ResumeIFrame';
import { DEBUG_RESUME_PDF_FLAG } from 'lib/constants';

type Props = {
    resume: any
}
export const RESUME_RESETTED_INITIAL_STATE = {
    resume: {
        profile: {
            name: "",
            summary: "",
            email: "",
            phone: "",
            location: "",
            url: ""
        },
        workExperiences: [
            {
                company: "",
                jobTitle: "",
                date: "",
                descriptions: []
            }
        ],
        educations: [
            {
                school: "",
                degree: "",
                gpa: "",
                date: "",
                descriptions: []
            }
        ],
        projects: [
            {
                project: "",
                date: "",
                descriptions: []
            }
        ],
        skills: {
            featuredSkills: [
                {
                    skill: "",
                    rating: 4
                },
                {
                    skill: "",
                    rating: 4
                },
                {
                    skill: "",
                    rating: 4
                }
            ],
            descriptions: []
        },
        custom: {
            descriptions: []
        }
    },
    settings: {
        themeColor: "#38bdf8",
        fontFamily: "Roboto",
        fontSize: "11",
        documentSize: "Letter",
        formToShow: {
            workExperiences: true,
            educations: true,
            projects: true,
            skills: true,
            custom: false
        },
        formToHeading: {
            workExperiences: "WORK EXPERIENCE",
            educations: "EDUCATION",
            projects: "PROJECT",
            skills: "SKILLS",
            custom: "CUSTOM SECTION"
        },
        formsOrder: [
            "workExperiences",
            "educations",
            "projects",
            "skills",
            "custom"
        ],
        showBulletPoints: {
            educations: true,
            projects: true,
            skills: true,
            custom: true
        }
    }
}



function ProjectTemplate({ resume }: Props) {
    const router = useRouter();
    const FullResume = JSON.parse(resume.full_resume);
    function handleResumeClick() {
        localStorage.setItem("open-resume-state", JSON.stringify(FullResume));
        localStorage.setItem("open-resume-id", resume.resume_id);
        router.push('/resume-builder');
    }
    const date = new Date(resume.created_at);
    return (
        <div
            onClick={handleResumeClick}
            className="lg:col-span-2 md:col-span-3 col-span-6 h-80 group cursor-pointer">
            <div className=' relative cursor-pointer rounded-md py-2 overflow-hidden hover:opacity-60 w-fit'>
                <div className='absolute w-full h-full top-0 z-50' />
                {/* @ts-ignore */}
                <ResumeIframeCSR
                    documentSize={FullResume.settings.documentSize}
                    scale={0.3}
                    enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
                >
                    <ResumePDF
                        resume={FullResume.resume}
                        settings={FullResume.settings}
                        isPDF={DEBUG_RESUME_PDF_FLAG}
                    />
                </ResumeIframeCSR>
                <div className='flex mt-3 text-gray-500 justify-between items-center'>
                    <p className='text-xs   group-hover:text-gray-900'>{resume.name} Resume</p>
                    <span className='text-xs group-hover:text-gray-900'>{date.toLocaleDateString()}</span>
                </div>
            </div>
        </div>


    )
}

export default ProjectTemplate;

