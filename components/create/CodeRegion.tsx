import { Box, Tooltip } from '@mui/material';
import React, { use, useEffect, useState } from 'react';

import FormInput from './FormInput';
import Donate3Btn from '../Donate3Btn';
import CodeCard, { ICodeCardProps } from './CodeCard';

interface ICodeRegionProps {
  code: string;
  link: string;
}

const CodeRegion = ({ code, link }: ICodeRegionProps) => {
  const [codeCards, setCodeCards] = useState<ICodeCardProps[]>();

  useEffect(() => {
    if (code && link) {
      const cards = [
        {
          title: 'Integrate into your code?',
          content: code,
          btnText: 'Copy code',
          btnImg: '/images/copy.svg',
        },
        {
          title: 'Need a link to accept donations?',
          content: link,
          btnText: 'Copy Link',
          btnImg: '/images/link.svg',
        },
      ];
      setCodeCards(cards!);
    }
  }, [code, link]);

  return code && link ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '41px 32px 32px 32px',
        borderRadius: '4px',
        background: '#FFF',
      }}
    >
      {codeCards!?.length > 0 ? codeCards!.map(({ title, content, btnText, btnImg }) => <CodeCard title={title} content={content} btnText={btnText} btnImg={btnImg} key={btnImg} />) : <></>}
    </div>
  ) : (
    <></>
  );
};
export default CodeRegion;
