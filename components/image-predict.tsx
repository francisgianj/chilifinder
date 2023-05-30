"use client";

import * as tf from "@tensorflow/tfjs";
import { loadable } from "jotai/utils";
import { useState, useCallback } from "react";
import { atom, useAtom } from "jotai";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import preprocessImage from "@/utils/preprocess-image";
import loadImage from "@/utils/load-image";
import { CgSpinner } from "react-icons/cg";

enum LabelEnum {
  "BELL PEPPER" = "Bell Pepper",
  "JALAPENO" = "Jalapeño",
  "LONG CHILI" = "Long Chili",
  "PIMIENTO PEPPER" = "Pimiento Pepper",
  "SILING LABUYO" = "Siling Labuyo",
  "THAI CHILI" = "Thai Chili",
}

const LABEL_MAPPER: { [n: number]: LabelEnum } = {
  0: LabelEnum["BELL PEPPER"],
  1: LabelEnum["JALAPENO"],
  2: LabelEnum["LONG CHILI"],
  3: LabelEnum["PIMIENTO PEPPER"],
  4: LabelEnum["SILING LABUYO"],
  5: LabelEnum["THAI CHILI"],
};

const asyncModelAtom = atom(async () => {
  const timeLoadModel = performance.now();
  const model = await tf.loadLayersModel("/static/model-tfjs/model.json");

  return {
    model,
    timeLoadModel: performance.now() - timeLoadModel,
  };
});

const loadableModelAtom = loadable(asyncModelAtom);

export default function ImagePredict() {
  const [loadModel, setLoadModel] = useState(false);
  const [modelAtom] = useAtom(loadableModelAtom);
  const isModelLoading =
    modelAtom.state === "loading" || modelAtom.state !== "hasData";

  const [results, setResults] = useState<
    {
      label?: string;
      isProcessing?: boolean;
      timeInference?: number;
      probability?: number;
      imageFile: File;
    }[]
  >([]);

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      // Do something with the files
      const image = acceptedFiles?.[0] as File;
      if (isModelLoading || !image) return;

      let timeInference = performance.now();
      setResults((prev) => [
        ...prev,
        {
          isProcessing: true,
          imageFile: image,
        },
      ]);

      const img = await loadImage(image);
      const processedImg = await preprocessImage(img);

      if (!modelAtom?.data && !processedImg) return;

      const model = modelAtom?.data.model;

      const prediction = model.predict(processedImg) as tf.Tensor<tf.Rank>;
      const predictedClassIndex = tf.argMax(prediction, -1).dataSync()[0];

      timeInference = performance.now() - timeInference;

      setResults((prev) => [
        ...prev.slice(0, prev.length - 1),
        {
          label: LABEL_MAPPER[predictedClassIndex],
          probability: prediction.dataSync()[predictedClassIndex],
          timeInference,
          imageFile: image,
        },
      ]);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [modelAtom]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="px-2 py-8 md:px-4 md:py-16 flex items-center justify-center cursor-pointer border-2 border-gray-400 hover:border-gray-800 border-dotted"
      >
        <input
          type="file"
          placeholder="Upload an image"
          accept="image/jpeg, image/jpg, image/bmp, image/png"
          className=""
          {...getInputProps()}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="text-gray-400 text-center space-y-2">
            <p>Drag and drop some files here, or click to select files</p>
            <p className="italic text-sm">
              (Only *.jpeg, *.jpg, *.bmp, *.png images will be accepted)
            </p>
          </div>
        )}
      </div>

      {isModelLoading ? (
        <div className="flex gap-2 items-center">
          <p className="text-sm md:text-base text-red-500">Loading model...</p>
          <CgSpinner className="text-sm md:text-base text-red-500 animate-spin" />
        </div>
      ) : (
        <p className="text-sm md:text-base text-red-500">
          Model loaded in {(modelAtom.data.timeLoadModel / 1000).toFixed(2)}{" "}
          secs
        </p>
      )}

      <p className="text-xs md:text-sm text-gray-600">
        The pre-trained model will be loaded as soon as you drop or upload an
        image for the first time. It may take a few seconds to complete the
        loading process.
      </p>

      <div className="flex flex-wrap gap-4">
        {results.map((result, index) => (
          <div key={index} className="mx-auto rounded-lg bg-gray-200 p-4">
            <div className="relative w-56 h-56 rounded-lg overflow-hidden">
              <Image
                src={URL.createObjectURL(result.imageFile)}
                alt="image"
                fill
                sizes="100%"
              />
            </div>

            <div className="">
              <h1 className="text-2xl font-bold">
                {result.isProcessing ? "Predicting..." : result.label}
              </h1>
              <p className="text-sm text-gray-500">
                {result.probability?.toFixed(2)}
              </p>
              {result.timeInference && (
                <p className="text-sm text-gray-500">
                  {(result.timeInference / 1000).toFixed(2)} secs
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
