import Image, { StaticImageData } from "next/image";
import RovicDisplayPicure from "@/public/static/images/rovic-display-picture.jpg";
import FrancisDisplayPicture from "@/public/static/images/francis-display-picture.jpg";
import { IoLogoFacebook, IoLogoGithub } from "react-icons/io5";
import Link from "next/link";

const researchers = [
  {
    name: "Francis Gian Juson",
    course: "BS Computer Science",
    school: "AMA University",
    displayPicture: FrancisDisplayPicture,
    links: {
      facebook: "https://www.facebook.com/francisgian.fgm",
      github: "https://github.com/francisgianj",
    },
  },
  {
    name: "Rovic Amiel Ancajas",
    course: "BS Computer Science",
    school: "AMA University",
    displayPicture: RovicDisplayPicure,
    links: {
      facebook: "https://www.facebook.com/amiel.ancajas",
    },
  },
];

interface ResearcherCardProps {
  name: string;
  course: string;
  school: string;
  displayPicture: StaticImageData;
  links?: {
    facebook?: string;
    github?: string;
  };
}

function ResearcherCard({
  name,
  course,
  school,
  displayPicture,
  links,
}: ResearcherCardProps) {
  return (
    <div className="bg-white drop-shadow-xl w-full p-2 md:p-4 rounded-xl">
      <div className="flex gap-4">
        <div className="relative h-24 w-24 md:h-32 md:w-32">
          <Image
            src={displayPicture}
            alt={name}
            fill
            sizes="100%"
            className="rounded-full"
            placeholder="blur"
            quality={100}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">{name}</h2>
            <p className="text-sm md:text-lg text-gray-800">
              {course}, {school}
            </p>
          </div>

          <div className="flex gap-2">
            {links?.facebook && (
              <Link
                href={links.facebook}
                target="_blank"
                className="bg-[#38589820] hover:bg-[#38589840] p-0.5 rounded-md flex items-center justify-center"
              >
                <IoLogoFacebook className="text-3xl text-[#385898]" />
              </Link>
            )}
            {links?.github && (
              <Link
                href={links?.github ?? "#"}
                target="_blank"
                className="bg-[#24292e20] hover:bg-[#24292e40] p-0.5 rounded-md flex items-center justify-center"
              >
                <IoLogoGithub className="text-3xl text-[#24292e]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResearcherCards() {
  return (
    <div className="space-y-8">
      {researchers.map((researcher) => (
        <ResearcherCard key={researcher.name} {...researcher} />
      ))}
    </div>
  );
}
