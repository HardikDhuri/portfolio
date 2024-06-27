"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import profileImage from "@/public/media/Profile Photo.jpg"; // Replace with the actual path to your image
import github from "@/public/media/github.svg"; // Replace with the actual path to your image
import linkedIn from "@/public/media/linkedin.svg"; // Replace with the actual path to your image
import stackOverflow from "@/public/media/stackoverflow.svg"; // Replace with the actual path to your image
import pdf from "@/public/media/pdf.svg";

const typingVariants = {
  hidden: { width: 0 },
  visible: (i: number) => ({
    width: [0, "auto"],
    transition: {
      type: "spring",
      stiffness: 50,
      delay: i * 0.1,
    },
  }),
};

export default function Page() {
  const [text, setText] = useState("");

  useEffect(() => {
    const fullText =
      "Hi, I am Hardik Dhuri a Software Engineer based in Pune, India";
    let currentText = "";
    let i = 0;

    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setText(currentText);
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <>
      <div className="flex">
        <div className="flex-1 flex justify-center items-center">
          <Image src={profileImage} alt="Profile Image" className="w-1/2" />
        </div>
        <div className="flex-1 p-10">
          <motion.h2
            className="text-4xl font-extrabold"
            variants={typingVariants}
            initial="hidden"
            animate="visible"
          >
            {text} 🇮🇳
          </motion.h2>
          <p className="text-lg mt-4">
            Basic intro as Expertise in building Event Driven applications using
            .Net Core.
          </p>
          <div className="flex justify-between">
            <div className="mt-4">
              <button className="flex items-center bg-slate-700 font-bold text-white px-4 py-2 rounded">
                Download Resume
                <Image className="w-8" src={pdf} alt="Hardik Dhuri Resume" />
              </button>
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://github.com/HardikDhuri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image className="w-12" src={github} alt="Github Link" />
              </a>
              <a
                href="https://www.linkedin.com/in/hardikdhuri/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image className="w-12" src={linkedIn} alt="LinkedIn Link" />
              </a>
              <a
                href="https://stackoverflow.com/users/11489084/hardik-dhuri"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="w-12"
                  src={stackOverflow}
                  alt="Stack Overflow Link"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
