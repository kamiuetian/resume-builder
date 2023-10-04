"use client";
import { Provider } from "react-redux";
import { store } from "lib/redux/store";
import { ResumeForm } from "components/ResumeForm";
import { Resume } from "components/Resume";
import { useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PreviewResumeModal from "components/modals/PreviewResumeModal";




export default function Create() {
  const router = useRouter();
  const { data } = useSession();
  const searchParams = useSearchParams();
  const newlyGoogleAuthenticated = searchParams.get("auth") === "google";

  async function saveSignUpData(user: any) {
    //Save data in DB;
    const [firstName, lastName] = user.name.split(" ");
    const email = user.email;
    const image = user.image;
    const provider = "google";
    const res = await fetch("/api/auth/save-google-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        image,
        provider
      }),


    });
    const data = await res.json();
    if (data.status === "success") {
      router.push("/resume-builder");
    }

  }

  useEffect(() => {
    if (newlyGoogleAuthenticated) {
      //Save data in DB...
      if (data?.user) {
        saveSignUpData(data.user);
      }
    }
  }, []);
  const [showPreview, setShowPreview] = useState<"none" | "for-desktop" | "for-mobile">("none");

  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden bg-white">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="basis-1/2">
            <ResumeForm />
          </div>
          <div className="basis-1/2">
            <Resume openPreview={showPreview} setOpenPreview={setShowPreview} />
            <PreviewResumeModal isOpen={showPreview} setShowPreviewModal={setShowPreview} />
            <button
              className="block md:hidden"
              onClick={() => setShowPreview("for-mobile")}
            >
              <PreviewResumeButton />
            </button>
          </div>
        </div>
      </main>
    </Provider>
  );
}




function PreviewResumeButton() {
  return <div data-dial-init className="fixed right-6 bottom-4 group">
    <button type="button" data-dial-toggle="speed-dial-menu-bottom-right" aria-controls="speed-dial-menu-bottom-right" aria-expanded="false" className="flex items-baseline space-x-3 rounded-md justify-center text-white bg-blue-700 py-2 px-5 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
      </svg>
      <p>Preview and Download</p>
    </button>
  </div>

}