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
      <h2 className="text-center text-3xl font-bold">Questions & Answers</h2>
      <div className="mt-6 divide-y divide-gray-300">
        {QAS.map(({ question, answer }) => (
          <div key={question} className="py-6">
            <h3 className="font-semibold leading-7">{question}</h3>
            <div className="mt-3 grid gap-2 leading-7 text-gray-600">
              {answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
