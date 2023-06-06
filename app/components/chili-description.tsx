import BellPepperDescription from "@app-components/bell-pepper-description";
import JalapenoDescription from "@app-components/jalapeno-description";
import LongChiliDescription from "@app-components/long-chili-description";
import PimientoDescription from "@app-components/pimiento-description";
import SilingLabuyoDescription from "@app-components/siling-labuyo-description";
import ThaiChiliDescription from "@app-components/thai-chili-description";

export default function ChiliDescription({
  chili,
}: {
  chili: string | undefined;
}) {
  return (
    <div className="prose prose-slate mx-auto">
      {chili === undefined && null}
      {chili === "Bell Pepper" && <BellPepperDescription />}
      {chili === "Jalapeño" && <JalapenoDescription />}
      {chili === "Long Chili" && <LongChiliDescription />}
      {chili === "Pimiento Pepper" && <PimientoDescription />}
      {chili === "Siling Labuyo" && <SilingLabuyoDescription />}
      {chili === "Thai Chili" && <ThaiChiliDescription />}
    </div>
  );
}
