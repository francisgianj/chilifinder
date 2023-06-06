import Image from "next/image";
import { BsX } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import { Dialog } from "@headlessui/react";
import ChiliDescription from "@app-components/chili-description";

interface ResultProps {
  label?: string;
  idx?: string;
  isProcessing?: boolean;
  timeInference?: number;
  probability?: number;
  imageFile: File;
}

const selectedResultIdAtom = atom<string | undefined>(undefined);

export default function Results({ results }: { results: ResultProps[] }) {
  const [selectedResultId, setSelectedResultId] = useAtom(selectedResultIdAtom);

  return (
    <div className="flex flex-wrap gap-2">
      {results.map((result, index) => (
        <Result
          key={index}
          idx={index.toString()}
          label={result.label}
          probability={result.probability}
          timeInference={result.timeInference}
          imageFile={result.imageFile}
        />
      ))}

      <AnimatePresence>
        {selectedResultId && (
          <Dialog
            as={motion.div}
            className="fixed inset-0 bg-black bg-opacity-25"
            open={!!selectedResultId}
            onClose={() => setSelectedResultId(undefined)}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="overflow-y-scroll w-full max-w-3xl max-h-[32rem] h-full rounded-lg bg-white p-4 px-6 align-middle shadow-xl transition-all">
                <motion.div
                  layoutId={selectedResultId}
                  className="space-y-4 max-h-max overflow-hidden"
                >
                  <motion.div className="space-y-4">
                    <motion.div className="flex justify-between items-start border-b border-gray-300">
                      <motion.div>
                        <Dialog.Title as="h3" className="text-lg font-medium">
                          {results[Number(selectedResultId)].label}
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-gray-500">
                          {results[
                            Number(selectedResultId)
                          ]?.probability?.toFixed(2)}{" "}
                          % probability
                        </Dialog.Description>
                      </motion.div>

                      <motion.button
                        onClick={() => setSelectedResultId(undefined)}
                      >
                        <BsX className="text-red-500 text-xl hover:text-red-600" />
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  <motion.div className="flex flex-col max-h-min overflow-hidden justify-center items-center md:flex-row md:justify-normal md:items-start gap-4">
                    <motion.div className="relative w-56 h-56 bg-white rounded-lg drop-shadow-lg">
                      <Image
                        src={URL.createObjectURL(
                          results[Number(selectedResultId)].imageFile
                        )}
                        alt="image"
                        fill
                        sizes="100%"
                      />
                    </motion.div>

                    <motion.div className="flex-1">
                      <ChiliDescription
                        chili={results[Number(selectedResultId)].label}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function Result({
  label,
  idx,
  isProcessing,
  timeInference,
  probability,
  imageFile,
}: ResultProps) {
  const [selectedResultId, setSelectedResultId] = useAtom(selectedResultIdAtom);
  return (
    <motion.div
      layoutId={idx}
      onClick={() => setSelectedResultId(idx)}
      className="cursor-pointer rounded-lg overflow-hidden bg-white drop-shadow-lg border border-gray-300/20"
    >
      <motion.div className="relative w-56 h-56 bg-white">
        <Image
          src={URL.createObjectURL(imageFile)}
          alt="image"
          fill
          sizes="100%"
        />
      </motion.div>

      <motion.div className="p-2 space-y-1">
        <motion.p className="text-lg">
          {isProcessing ? "Predicting..." : label}
        </motion.p>

        {isProcessing ? (
          <>
            <motion.div className="animate-pulse bg-gray-500 h-4 w-3/4 rounded-sm" />
            <motion.div className="animate-pulse bg-gray-500 h-4 w-1/2 rounded-sm" />
          </>
        ) : (
          <>
            <motion.p className="text-sm text-gray-500">
              {probability?.toFixed(2)}% probability
            </motion.p>
            <motion.p className="text-sm text-gray-500">
              {((timeInference || 0) / 1000).toFixed(2)} secs
            </motion.p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
