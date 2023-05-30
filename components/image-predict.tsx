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

enum Label {
  BELL_PEPPER = "Bell Pepper 🫑",
  JALAPENO = "Jalapeño",
  LONG_CHILI = "Long Chili ",
  PIMIENTO_PEPPER = "Pimiento Pepper 🍅",
  SILING_LABUYO = "Siling Labuyo 🌶️",
  THAI_CHILI = "Thai Chili 🌶️",
}

const LABEL_MAPPER: { [n: number]: Label } = {
  0: Label.BELL_PEPPER,
  1: Label.JALAPENO,
  2: Label.LONG_CHILI,
  3: Label.PIMIENTO_PEPPER,
  4: Label.SILING_LABUYO,
  5: Label.THAI_CHILI,
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
          <p className="text-sm md:text-base">Loading model...</p>
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

      <div className="flex flex-wrap gap-2">
        {results.map((result, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden bg-white drop-shadow-lg border border-gray-300/20"
          >
            <div className="relative w-56 h-56 bg-white">
              <Image
                src={URL.createObjectURL(result.imageFile)}
                alt="image"
                fill
                sizes="100%"
              />
            </div>

            <div className="p-2 space-y-1">
              <p className="text-lg">
                {result.isProcessing ? "Predicting..." : result.label}
              </p>

              {result.isProcessing ? (
                <>
                  <div className="animate-pulse bg-gray-500 h-4 w-3/4 rounded-sm" />
                  <div className="animate-pulse bg-gray-500 h-4 w-1/2 rounded-sm" />
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    {result.probability?.toFixed(2)}% probability
                  </p>
                  <p className="text-sm text-gray-500">
                    {((result?.timeInference || 0) / 1000).toFixed(2)} secs
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
