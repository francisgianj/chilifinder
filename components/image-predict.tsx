"use client";

import * as tf from "@tensorflow/tfjs";
import { loadable } from "jotai/utils";
import { useState, useCallback } from "react";
import { atom, useAtom } from "jotai";
import NextImage from "next/image";
import { useDropzone } from "react-dropzone";

const asyncModelAtom = atom(async () => {
  const model = await tf.loadLayersModel(
    "https://chilifinder.vercel.app/static/model/model.json"
  );

  return model;
});

const loadableModelAtom = loadable(asyncModelAtom);

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = e.target?.result as string;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const preprocessImage = async (
  image: HTMLImageElement
): Promise<tf.Tensor3D | tf.Tensor<tf.Rank>> => {
  return tf.tidy(() => {
    const tensor = tf.browser.fromPixels(image);
    const resized = tf.image.resizeBilinear(tensor, [224, 224]); // Resizing the image to the required input dimensions of our model
    const normalized = resized.div(255); // Normalize pixel values between 0 and 1
    const expanded = normalized.expandDims(); // Add an extra dimension to represent the batch size

    return expanded;
  });
};

const chilis = [
  "bell pepper",
  "jalapeno",
  "long chili",
  "pimiento pepper",
  "siling labuyo",
  "thai chili",
];

export default function ImagePredict() {
  const [modelAtom] = useAtom(loadableModelAtom);

  const [processing, setProcessing] = useState(false);
  const [predicted, setPredicted] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    const file = acceptedFiles?.[0] as File;

    setImage(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (modelAtom.state === "loading" || modelAtom.state !== "hasData") {
    return <div>Loading...</div>;
  }

  const model = modelAtom.data;

  const predict = async () => {
    if (!model || !image) return;

    setPredicted(null);
    setProcessing(true);

    const img = await loadImage(image);
    const processedImg = await preprocessImage(img);

    if (!model && !processedImg) return;

    const prediction = model.predict(processedImg) as tf.Tensor<tf.Rank>;
    const predictedClassIndex = tf.argMax(prediction, -1).dataSync()[0];

    setPredicted(predictedClassIndex);
    setProcessing(false);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className="px-2 py-8 md:px-4 md:py-16 flex items-center justify-center cursor-pointer border-2 border-gray-400 hover:border-gray-800 border-dotted"
      >
        <input
          type="file"
          placeholder="Upload an image"
          accept="image/jpeg, image/jpg, image/bmp, image/png"
          className=""
          disabled={processing}
          {...getInputProps()}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>

      {image && (
        <div className="space-y-4">
          <NextImage
            src={URL.createObjectURL(image)}
            alt="image"
            width={300}
            height={300}
          />

          {predicted !== null && (
            <div>
              <h1 className="text-2xl font-bold">
                {chilis[predicted as number]}
              </h1>
            </div>
          )}

          <button
            onClick={predict}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Predict
          </button>
        </div>
      )}
    </div>
  );
}
