import ImagePredict from "@/components/image-predict";

export const metadata = {
  title: "Chili Predict",
  description:
    "Perform image prediction directly in the browser using a pre-trained CNN MobileNet model to recognize Bell Pepper, Jalapeño, Long Chili, Pimiento Pepper, Siling Labuyo, and Thai Chili.",
};

export default async function Predict() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0">
      <h1 className="mb-4 text-xl md:text-3xl font-bold">Chili Predict</h1>
      <div className="space-y-2">
        <p className="text-sm md:text-base">
          Perform image prediction directly in the browser using a pre-trained
          CNN MobileNet model to recognize{" "}
          <span className="text-red-500">Bell Pepper</span>,{" "}
          <span className="text-red-500">Jalapeño</span>,{" "}
          <span className="text-red-500">Long Chili</span>,{" "}
          <span className="text-red-500">Pimiento Pepper</span>,{" "}
          <span className="text-red-500">Siling Labuyo</span>, and{" "}
          <span className="text-red-500">Thai Chili</span>. This approach
          ensures that the{" "}
          <span className="italic">
            image stays local and is not uploaded to any external servers
          </span>
          .
        </p>
        <ImagePredict />
      </div>
    </div>
  );
}
