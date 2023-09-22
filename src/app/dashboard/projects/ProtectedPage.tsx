import Loading from 'components/dashboard/LoadingProjects';
import ProjectTemplate from 'components/dashboard/ProjectTemplate';
import SideBar from 'components/dashboard/SideBar';
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { RESUME_RESETTED_INITIAL_STATE } from 'components/dashboard/ProjectTemplate';
type Props = {
    userEmail: string
}

async function fetcher(url: string) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

function ProtectedPage({ userEmail }: Props) {
    const { isLoading, data, error } = useSWR('/api/resume?email=' + userEmail, fetcher);
    const router = useRouter();

    if (isLoading) {
        return <Loading />
    }
    if (error) {
        return <div>Error</div>
    }

    function createNewResume() {
        localStorage.removeItem("open-resume-id");
        localStorage.setItem("open-resume-state", JSON.stringify(RESUME_RESETTED_INITIAL_STATE));
        router.push('/resume-builder');
    }

    try {
        if (data.status === "error" || data.status === "not-found") {
            return <div className="grid grid-cols-[1fr,5fr] divide-x divide-gray-200">
                <SideBar />
                <div className='w-[80%] mx-auto my-12 pl-8 flex flex-col items-center space-y-6'>
                    <div className="text-center text-2xl font-semibold mt-24 text-gray-500">No resumes found</div>
                    <Link href="/resume-builder" className='btn-primary'>Create your first resume <span aria-hidden="true">→</span></Link>
                </div>
            </div>
        }
    } catch (e) {
        return <div className="grid grid-cols-[1fr,5fr] divide-x divide-gray-200">
            <SideBar />
            <div className='w-[80%] mx-auto my-12 pl-8 flex flex-col items-center space-y-6'>
                <div className="text-center text-2xl font-semibold mt-24 text-gray-500">No resumes found</div>
                <p onClick={createNewResume} className='btn-primary cursor-pointer'>Create your first resume <span aria-hidden="true">→</span></p>
            </div>
        </div>
    }

    return (
        <div className="grid grid-cols-[1fr,5fr] divide-x divide-gray-200">
            <SideBar />

            <form className='w-[80%] mx-auto my-12 pl-8'>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Resumes</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Your previous projects are displayed below.
                                </p>
                            </div>
                            <p onClick={createNewResume} className='btn-primary h-fit cursor-pointer'>Create Resume</p>


                        </div>

                        <div className="mt-10 grid grid-cols-6 gap-8 sm:grid-cols-6 lg:pr-24 md:pr-8 pr-0">
                            {
                                data.map((resume: any, index: number) => {
                                    return <ProjectTemplate key={index} resume={resume} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ProtectedPage