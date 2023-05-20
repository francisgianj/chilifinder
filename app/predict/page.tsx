import ImagePredict from "@/components/image-predict";

export default async function Predict() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-0">
      <h1 className="mb-10 text-xl md:text-3xl font-bold">Chili Predict</h1>
      <ImagePredict />
    </div>
  );
}
