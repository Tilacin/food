"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

interface FileUploaderProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}
export default function FileUploader({imageUrl, setImageUrl}: FileUploaderProps) {
  


  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;


    if (!fileInput.files) {
      console.warn("файл не был выбран");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("список файлов пуст");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });


      if (!res.ok) {
        console.error("что-то пошло не так, проверь свою консоль");
        return;
      }

      const data: { fileUrl: string } = await res.json();
      console.log(data.fileUrl);
      
      setImageUrl(data.fileUrl);
      
    } catch (error) {
      console.error("что-то пошло не так, проверь свою консоль");
    }

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";
  };
  
  return (
    <label
    className="flex relative overflow-hidden"  style={{ paddingTop: "calc(100% * (446 / 720))" }}
    >
      <Image
      className="absolute top-1/3 left-0 w-full h-full block object-cover transform -translate-y-1/2"
        src={imageUrl}
        alt="uploaded image"
        width={420}
        height={346}
        priority={true}
      />
      <input
        
        type="file"
        onChange={onImageFileChange}
      />
    </label>
  );
}