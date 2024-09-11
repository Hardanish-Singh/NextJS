"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type RichTextReadEditorProps = {
    value: string;
};

const RichTextReadEditor = ({ value }: RichTextReadEditorProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
    return <ReactQuill theme="snow" value={value} readOnly className="rich-text-read-editor" />;
};

export default RichTextReadEditor;
