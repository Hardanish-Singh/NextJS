"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type RichTextEditorProps = {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
};

const RichTextEditor = ({ placeholder, onChange, value }: RichTextEditorProps) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
    return (
        <ReactQuill
            theme="snow"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            /*readOnly*/
        />
    );
};

export default RichTextEditor;
