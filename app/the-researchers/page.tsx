import ResearcherCards from "@/components/researchers-cards";

export const metadata = {
  title: "The Researchers | ChiliFinder",
};

export default function TheResearchers() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0">
      <div className="my-8 prose prose-sm prose-slate mx-auto lg:prose-base">
        <h1>The Researchers</h1>
        <p className="lead">
          4th year BS Computer Science students of AMA University, Quezon City,
          Philippines.
        </p>
      </div>
      <ResearcherCards />
    </div>
  );
}
