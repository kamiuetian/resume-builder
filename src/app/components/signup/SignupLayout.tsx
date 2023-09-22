import Link from "next/link";



function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col items-center lg:py-8 md:py-4 py-0">
            <Link href="/" className="ml-auto w-8 h-8 text-gray-400 mr-12 mb-4">
                <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Close"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </Link>
            {children}
        </main>
    );
}

export default Layout;
