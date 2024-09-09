"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type RichTextEditorProps = {
    placeholder: string;
    onChange: (value: string) => void;
    value?: string;
};

const RichTextEditor = React.forwardRef(
    ({ placeholder, onChange, value }: RichTextEditorProps, ref: React.Ref<HTMLElement>) => {
        const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
        return (
            <ReactQuill
                theme="snow"
                // theme="bubble"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                /*readOnly*/
            />
        );
    }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
