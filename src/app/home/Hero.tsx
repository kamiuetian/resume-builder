import Link from "next/link";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { AutoTypingResume } from "home/AutoTypingResume";
import { useRouter } from "next/navigation";
import { RESUME_RESETTED_INITIAL_STATE } from "components/dashboard/ProjectTemplate";
export const Hero = () => {
  const router = useRouter();
  function createNewResume() {
    localStorage.removeItem("ijcv-resume-id");
    localStorage.setItem("ijcv-resume-state", JSON.stringify(RESUME_RESETTED_INITIAL_STATE));
    router.push('/resume-builder');
  }
  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
          Create an impressive
          <br />
          resume effortlessly
        </h1>
        <p className="mt-3 text-lg lg:mt-5 lg:text-xl">
          With WorkResume, a user-friendly platform that assists job seekers in crafting their perfect resume
        </p>
        <p onClick={createNewResume} className="btn-primary mt-6 lg:mt-14 cursor-pointer">
          Start Creating <span aria-hidden="true">→</span>
        </p>
        {/* <p className="mt-3 text-sm text-gray-600 lg:mt-16">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            resume parser
          </Link>
        </p> */}
        <p className="mt-3 text-sm text-gray-600 lg:mt-16">
          Already have an account?
          Simply save and manage your resumes, and even generate AI-powered cover letters directly from your resume.
        </p>
      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
      <div className="mt-6 flex justify-center lg:mt-4 lg:block lg:grow z-0 overflow-hidden">
        {/* <AutoTypingResume /> */}
        <video src="/assets/typing-resume.mp4" autoPlay muted className="w-fit -mt-10 z-0" />
      </div>
    </section>
  );
};
