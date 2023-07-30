import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import SunEditorCore from 'suneditor/src/lib/core';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const DescEditor = () => {
  const handleChange = (content: string) => {
    console.log(content, '🍑🍑🍑🍑'); //Get Content Inside Editor
  };

  const editor = useRef<SunEditorCore>();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  return (
    <>
      <SunEditor getSunEditorInstance={getSunEditorInstance} onChange={handleChange} placeholder='Enter information to let people know about you'/>
    </>
  );
};
export default DescEditor;
