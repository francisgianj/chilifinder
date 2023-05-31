import ResearcherCards from "@/components/researchers-cards";

export const metadata = {
  title: "The Researchers",
  description:
    "Get to know the brilliant minds behind ChiliFinder, a team of fourth-year Computer Science students hailing from AMA University in Quezon City, Philippines.",
};

export default function TheResearchers() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0">
      <div className="my-8 prose prose-sm prose-slate mx-auto lg:prose-base">
        <h1>The Researchers</h1>
        <p className="lead">
          Get to know the brilliant minds behind ChiliFinder, a team of
          fourth-year Computer Science students hailing from AMA University in
          Quezon City, Philippines.
        </p>
      </div>
      <ResearcherCards />
    </div>
  );
}
