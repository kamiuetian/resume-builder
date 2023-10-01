import { useState } from "react";

const QAS = [
  {
    question:
      "Q1. What is a resume builder? Why is WorkResume's resume builder better than using resume template docs?",
    answer: (
      <>
        <p>
          In today's job market, there are two options for creating a resume. One option is to use a resume template, such as an office/google doc, and customize it to match your needs. The other option is to use WorkResume's resume builder, an online tool specifically designed for creating resumes.
        </p>
      </>
    ),
  },
  {
    question:
      "Q2. What sets WorkResume apart from other resume builders and templates?",
    answer: (
      <>
        <p>
          <span className="font-semibold">
            1. WorkResume focuses on helping job seekers in creating resumes tailored for the U.S. job market and following best practices.
          </span>
          <br />
          Unlike other resume builders that cater to a global audience and offer extensive customization options, WorkResume deliberately provides options aligned with U.S. best practices. For instance, it excludes the option to add a profile picture in order to eliminate bias and prevent discrimination.
        </p>
        <p>
          <span className="font-semibold">
            2. WorkResume prioritizes privacy and data security.
          </span>{" "}
          <br />
          While other resume builders may require email sign up and store user data in their databases, WorkResume believes that resume data should remain private and accessible only on the user's local machine. Therefore, WorkResume does not require sign up to use the platform, and all inputted data is stored in the user's browser, ensuring that only the user has access to it.
        </p>
      </>
    ),
  },
  {
    question: "Q3. Who created WorkResume and why?",
    answer: (
      <p>
        WorkResume was created by a team of individuals who, as immigrants to the U.S., had faced challenges when creating their first resumes and applying for internships and jobs. They recognized the need for a platform that simplifies the resume creation process and helps job seekers present their skills and experiences effectively.
      </p>
    ),
  },
  {
    question: "Q4. How can I support WorkResume?",
    answer: (
      <>
        <p>
          The best way to support WorkResume is by providing your thoughts and feedback. Your input will help us further improve the platform and make it more user-friendly.
        </p>
        <p>
          Another great way to support WorkResume is by spreading the word. Share it with your friends, on social media platforms, or with your school's career center. Our goal is to reach more job seekers who struggle with creating their resumes, and your support in spreading awareness would be highly appreciated.
        </p>
      </>
    ),
  },
];

export const QuestionsAndAnswers = () => {
  return (
    <section className="mx-auto max-w-3xl divide-y divide-gray-300 lg:mt-4 lg:px-2">
      <h2 className="text-center text-3xl font-bold">Frequently Asked Questions</h2>
      <div className="my-6">
        {QAS.map(({ question, answer }, index) => (
          <Accordion key={index} question={question} answer={answer} />
          // <div key={question} className="py-6">
          //   <h3 className="font-semibold leading-7">{question}</h3>
          //   <div className="mt-3 grid gap-2 leading-7 text-gray-600">
          //     {answer}
          //   </div>
          // </div>
        ))}
      </div>
    </section>


  );
};


function Accordion({ question, answer }: { question: string, answer: any }) {
  const [open, setOpen] = useState(false);
  return <>
    <h2>
      <button
        onClick={() => setOpen(!open)}
        type="button" className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl hover:bg-gray-100">
        <span>{question}</span>
        <svg data-accordion-icon className={`w-3 h-3 ${open ? "" : "rotate-180"} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
    </h2>
    <div className={`${open ? "" : "hidden"}`} >
      <div className="p-5 border border-b-0 border-gray-200 grid gap-2 leading-7 text-gray-600">
        {/* <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
        <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p> */}
        {answer}
      </div>
    </div></>
}