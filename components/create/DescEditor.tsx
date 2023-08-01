import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from 'suneditor/src/lib/core';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

interface IDescEditorProps {
  onChange: (content: string) => void;
}

const DescEditor = ({ onChange }: IDescEditorProps) => {
  const editor = useRef<SunEditorCore>();

  //Get Content Inside Editor
  const handleChange = (content: string) => {
    onChange(content);
  };

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  return (
    <>
      <SunEditor getSunEditorInstance={getSunEditorInstance} onChange={handleChange} placeholder="Enter information to let people know about you" />
    </>
  );
};
export default DescEditor;
