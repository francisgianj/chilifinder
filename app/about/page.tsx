import Link from "next/link";

export const metadata = {
  title: "ChiliFinder",
};

export default function About() {
  return (
    <div className="xd">
      <div className="my-8 prose prose-slate mx-auto lg:prose-lg">
        <h1>What is ChiliFinder?</h1>
        <p className="lead">
          ChiliFinder is the product of our research entitled{" "}
          <span className="italic">
            Automatic Chili Pepper Plant Species Identification using
            Convolutional Neural Networks
          </span>{" "}
          presented to the faculty of the College of Computer Studies, AMA
          University, Quezon City, Philippines.
        </p>

        <p>
          The research aims to develop a system that can automatically identify
          the species of a chili pepper that&apos;s being sold in the
          Philippines market. This will help the consumers to know the species
          of the chili pepper they are buying and help them to avoid buying the
          wrong chili pepper species.
        </p>

        <h2>
          <span className="italic">Chili Pepper</span>?
        </h2>
        <p>
          Chili pepper is the fruit of plants from the genus Capsicum, members
          of the nightshade family, Solanaceae. Chili peppers are widely used in
          many cuisines as a spice to add heat to dishes. The substances giving
          chili peppers their intensity when ingested or applied topically are
          capsaicin and related compounds known as capsaicinoids.
        </p>

        <h3>
          The Problems <span className="italic">ChiliFinder</span> is trying to
          solve
        </h3>

        <ul>
          <li>
            <strong>Lack of information</strong> - Many people may not have
            access to accurate information about the different types of chilies
            available in the Philippine market. This can lead to confusion, and
            people may end up purchasing the wrong type of chili for their
            recipe or use.
          </li>
          <li>
            <strong>Agricultural management</strong> - Farmers and growers could
            use our ChiliFinder app to identify the types of chilies growing on
            their land, which could help them optimize their agricultural
            practices.
          </li>
          <li>
            <strong>Encourage local produce</strong> - By focusing on the
            chilies commonly found in the Philippine market, this app can
            encourage users to purchase locally sourced chilies and support
            local agriculture.
          </li>
        </ul>

        <h2>Contribution and Acknowledgement</h2>
        <p>
          This research is made possible by the following people and
          organizations:
        </p>

        <ul>
          <li>
            The people who contributed to the development of this app.
            <ul>
              <li>Francis Gian Juson</li>
              <li>Mike Jerard del Rosario</li>
              <li>Rovic Amiel Ancajas</li>
            </ul>
          </li>
          <li>
            <strong>AMA University</strong> - For providing the resources and
            facilities needed to conduct this research.
          </li>
          <li>
            <strong>Our Research Advisers</strong> - For guiding us throughout
            the research process.
          </li>
          <li>
            <strong>Our Research Panels</strong> - For providing us with
            constructive feedback and suggestions.
          </li>
          <li>
            <strong>Our Family and Friends</strong> - For their support and
            encouragement.
          </li>
        </ul>

        <p>
          If you&apos;re interested in learning more about the researchers
          behind the ChiliFinder app, please visit our{" "}
          <Link
            href="/the-researchers"
            className="text-red-500 underline hover:text-red-600"
          >
            Researchers page
          </Link>
          . Additionally, if you&apos;d like to contribute to the project,
          ChiliFinder is open source, and you can find the source code on our{" "}
          <Link
            href="https://github.com/francisgianj/chilifinder"
            target="_blank"
            className="text-red-500 underline hover:text-red-600"
          >
            GitHub repository
          </Link>
          . If you have any questions or would like to contact the lead
          developer, you can learn more about him and his work by visiting his{" "}
          <Link
            href="https://francisgianj.github.io/"
            target="_blank"
            className="text-red-500 underline hover:text-red-600"
          >
            portfolio
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
