import React, { forwardRef, useState, ChangeEvent, useCallback } from "react";
import { PlusIcon, X } from "lucide-react";
import { Input } from "./text-input";
import { Button } from "../button";

interface FileInputProps {
  onChange: (file: File | null) => void;
  onBlur: () => void;
  name: string;
  placeholder?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange, onBlur, name, placeholder = "Upload" }, ref) => {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setFileName(file.name);
        onChange(file);
      }
    };

    const clearFile = useCallback(() => {
      setFileName("");
      onChange(null);
    }, []);

    const handleButtonClick = () => {
      if (ref && "current" in ref && ref.current) {
        ref.current.click();
      }
    };

    return (
      <div className="w-full">
        {!!fileName.length ? (
          <button
            onClick={clearFile}
            className="bg-[red]/10 flex items-center gap-3 rounded-full p-2 px-4"
          >
            {fileName} <X size={16} />
          </button>
        ) : (
          <Button
            type="button"
            variant="file"
            size="file"
            className="rounded-l-none shrink-0 cursor-pointer rounded-full dark:bg-dark-ash-500 bg-gray-100 dark:border-primary dark:text-white border-gray-300"
            onClick={handleButtonClick}
            asChild
          >
            <label
              htmlFor="file-upload"
              className=" flex items-center gap-2 font-normal"
            >
              <PlusIcon />
              {placeholder}
            </label>
          </Button>
        )}

        <input
          ref={ref}
          type="file"
          name="file-upload"
          id="file-upload"
          className="hidden"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;
