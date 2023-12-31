import type { CroppedFile, SelectedFile, UploadFile, UploadResult } from '@lxdao/uploader3';
import { Icon } from '@iconify/react';
import React, { use, useEffect } from 'react';
import { Img3 } from '@lxdao/img3';

import { Status } from './Status';

interface IPreviewFileProps {
  file: SelectedFile | UploadFile | UploadResult | CroppedFile;
  style?: React.CSSProperties;
  setAvatar?: (avatar: string) => void;
}

const PreviewFile = ({ file, style, setAvatar }: IPreviewFileProps) => {
  const [src, setSrc] = React.useState<string>();
  useEffect(() => {
    let src: string;
    if (file.status === 'uploading') {
      src = file.thumbData || file.imageData;
    } else if (file.status === 'done') {
      src = file.url;
      setAvatar!(src!);
    } else if (file.status === 'cropped') {
      src = file.thumbData;
    } else {
      src = file.previewUrl;
    }
    setSrc(src);
  }, [file, setAvatar, setSrc]);

  return (
    <>
      <Img3 style={{ maxHeight: '100%', maxWidth: '100%' }} src={src!} alt={file.name} />
      {file.status === 'uploading' && (
        <Status>
          <Icon icon={'line-md:uploading-loop'} color={'#65a2fa'} fontSize={40} />
        </Status>
      )}
      {file.status === 'error' && (
        <Status>
          <Icon icon={'iconoir:cloud-error'} color={'#ffb7b7'} fontSize={40} />
        </Status>
      )}
    </>
  );
};

export default PreviewFile;
