"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import logoSrc from "public/logo.png";
import { cx } from "lib/cx";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";




function Avatar({ imgUrl }: { imgUrl: string }) {
  const [isOpen, setIsOpen] = React.useState(false);


  // try {
  //   if (document) {

  //   }
  // }
  // catch (e) { }
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target instanceof HTMLImageElement) {
        return;
      }
      setIsOpen(false);
    });
  }, []);


  return <div className="relative">
    <img className="w-10 h-10 rounded-full object-cover" src={imgUrl} onClick={() => setIsOpen(!isOpen)} />
    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    <div className={`bg-white z-50 shadow px-4 py-2 rounded divide-y divide-gray-200 absolute top-10 right-0 w-48 h-fit ${isOpen ? "flex" : "hidden"} flex-col`}>
      <Link href="/dashboard/my-account" className="block text-start text-sm font-medium text-gray-500 hover:text-gray-900 py-2">
        My Account
      </Link>
      <Link href="/dashboard/subscriptions" className="block text-start text-sm font-medium text-gray-500 hover:text-gray-900 py-2" >
        Subscriptions
      </Link>
      <Link href="/dashboard/projects" className="block text-start text-sm font-medium text-gray-500 hover:text-gray-900 py-2" >
        Resumes
      </Link>
      <button onClick={() => signOut()} className="block text-start text-sm font-medium text-red-500 hover:text-red-700 py-2" >
        Sign out
      </button>
    </div>
  </div>
}


export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const { data: session } = useSession();

  let isLoggedIn = false;
  if (session?.user) {
    isLoggedIn = true;
  }


  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">OpenResume</span>
          <Image
            src={logoSrc}
            alt="OpenResume Logo"
            className="h-8 w-full"
            priority
          />
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {
            isLoggedIn ?
              <>
                <Avatar imgUrl={session?.user?.image ?? "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"} />
              </>
              :
              <>
                <Link
                  className="rounded-md px-1.5 py-2 text-gray-500 hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
                  href="/sign-up"
                >Sign up
                </Link>

                <Link
                  className="rounded-md btn-primary px-1.5 py-2 lg:px-4"
                  href="/login"
                >Login
                </Link>
              </>
          }
        </nav>
      </div>
    </header >
  );
};
