import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth";
import SessionContext from "lib/contexts/SessionContext";

export const metadata = {
  title: "OpenResume - Resume Builder and Parser",
  description:
    "OpenResume is a free and powerful resume builder that allows anyone to create a modern professional resume in 3 simple steps. For those who have an existing resume, OpenResume also provides a resume parser to help test and confirm its ATS readability.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <SessionContext session={session}>
          <TopNavBar />
          {children}
          <Analytics />
        </SessionContext>
      </body>
    </html>
  );

}
