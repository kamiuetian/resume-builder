import Image from "next/image";
import featureFreeSrc from "public/assets/feature-free.svg";
import featureUSSrc from "public/assets/feature-us.svg";
import featurePrivacySrc from "public/assets/feature-privacy.svg";
import featureOpenSourceSrc from "public/assets/feature-open-source.svg";
import { Link } from "components/documentation";
const FEATURES = [
  {
    src: featureFreeSrc,
    title: "Enhanced Features and Subscriptions",
    text: "WorkResume offers upgraded features and subscription plans to provide job seekers with even more comprehensive resume-building capabilities.",
  },

  {
    src: featureUSSrc,
    title: "Tailored for the Job Market",
    text: "WorkResume incorporates best practices tailored specifically for the job market, ensuring your resume aligns with industry standards and maximizes compatibility with popular ATS platforms like Greenhouse and Lever.",
  },
  {


    src: featurePrivacySrc,
    title: "Data Privacy at its Core",
    text: "WorkResume prioritizes your privacy by securely storing data using advanced measures. With WorkResume, you retain complete control and exclusive access to your personal information.",
  },
  {


    src: featureOpenSourceSrc,
    title: "Proprietary Platform",
    text: "WorkResume is a proprietary platform designed to deliver an exceptional resume-building experience. The source code is not publicly available like in open-source projects."
  },
];

export const Features = () => {
  return (
    <section className="py-16 lg:py-36">
      <div className="mx-auto lg:max-w-4xl">
        <dl className="grid grid-cols-1 justify-items-center gap-y-8 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-16">
          {FEATURES.map(({ src, title, text }) => (
            <div className="px-2" key={title}>
              <div className="relative w-96 self-center pl-16">
                <dt className="text-2xl font-bold">
                  <Image
                    src={src}
                    className="absolute left-0 top-1 h-12 w-12"
                    alt="Feature icon"
                  />
                  {title}
                </dt>
                <dd className="mt-2">{text}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
