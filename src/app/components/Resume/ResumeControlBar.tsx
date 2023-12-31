"use client";
//@ts-nocheck
import { useEffect, useState } from "react";
import { useSetDefaultScale } from "components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

//Modal imports
import SignUpModal from "components/modals/SignUpModal";
import LoginModal from "components/modals/LoginModal";
import PaymentModal from "components/modals/PaymentModal";
import Link from "next/link";

// Function to download file
async function downloadFile(url: string, fileName: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


async function saveResumeDataAsNew(email: string, data: any) {
  const res = await fetch("/api/resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, data }),
  });
  const json = await res.json();
  console.log(json);
}

async function updateExistingResume(resume_id: any, data: any) {
  const res = await fetch("/api/resume", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resume_id, data })
  });
  const json = await res.json();
  console.log(json);
}


const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
  openPreview,
  setOpenPreview,
  forMobileOnly = false,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
  openPreview: "none" | "for-desktop" | "for-mobile",
  setOpenPreview: any,
  forMobileOnly?: boolean;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });
  const [instance, update] = usePDF({ document });
  const { data: session } = useSession();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // const [userBoughtSubscription, setUserBoughtSubscription] = useState(false);

  // Hook to update pdf when document changes
  useEffect(() => {
    update();
  }, [update, document]);
  // Function to validate and download resume
  async function validateAndDownload() {
    if (!session?.user) {
      // setShowSignUpModal(true);
      setShowLoginModal(true);
      return;
    }
    // else if (!userBoughtSubscription) {
    //   setShowPaymentModal(true);
    //   return;
    // }

    if (instance.url) {
      downloadFile(instance.url, fileName);
      const storageItem = JSON.parse(localStorage.getItem("ijcv-resume-state") as string);
      if (storageItem) {
        const resume_id = JSON.parse(localStorage.getItem("ijcv-resume-id") as string);
        if (resume_id > 0) {
          updateExistingResume(resume_id, storageItem);
          return;
        } else {
          saveResumeDataAsNew(session.user.email as string, storageItem);
        }
      }
    }
  }
  return (
    <div className={`${forMobileOnly ? "flex-col" : "flex-row"} sticky bottom-0 left-0 right-0 flex h-[var(--resume-control-bar-height)] items-center justify-center px-[var(--resume-padding)] text-gray-600 lg:justify-between`}>
      {showSignUpModal && (<SignUpModal isOpen={showSignUpModal} setShowLoginModal={setShowLoginModal} setShowSignUpModal={setShowSignUpModal} />)}
      {showLoginModal && (<LoginModal isOpen={showLoginModal} setShowLoginModal={setShowLoginModal} setShowSignUpModal={setShowSignUpModal} />)}
      {/* {showPaymentModal && <PaymentModal setUserBoughtSubscription={setUserBoughtSubscription} isOpen={showPaymentModal} setShowPaymentModal={setShowPaymentModal} />} */}

      <div className={`items-center gap-2 ${forMobileOnly ? "hidden" : "hidden"}`}>

        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />

        <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
        <label className="hidden items-center gap-1 lg:flex">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none">Autoscale</span>
        </label>
      </div>

      <div
        className={` bg-main text-white ml-1 cursor-pointer flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5  lg:ml-8`}
        onClick={validateAndDownload}
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span className="whitespace-nowrap ">Download Resume</span>
      </div>
      {/*<Link href="/cover-letter-builder"
        className="ml-1 cursor-pointer flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 hover:bg-gray-100 lg:ml-8"
      >
        <EnvelopeIcon className="h-4 w-4" />
        <span className="whitespace-nowrap">Generate Cover Letter</span>
        </Link>*/}
      {
        !forMobileOnly ? (
          <button
            onClick={() => setOpenPreview(openPreview === "for-desktop" ? "none" : "for-desktop")}

            className="ml-1  bg-main text-white cursor-pointer flex items-center gap-1 rounded-md border border-gray-300 px-3 py-0.5 lg:ml-8">
            {/* <svg className="w-3 h-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
          <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
        </svg> */}
            <EyeIcon className="w-4 h-auto" />
            <p>Preview Resume</p>
          </button>
        ) : null
      }
    </div >
  );
};

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t-2 bg-gray-50" />
);
