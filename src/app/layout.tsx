import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth";
import SessionContext from "lib/contexts/SessionContext";

export const metadata = {
  title: "InstantJobCV - ",
  description:
    "InstantJobCV is a free and powerful resume builder that allows anyone to create a modern professional resume.",
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
