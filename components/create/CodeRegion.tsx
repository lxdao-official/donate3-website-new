import { Box, Tooltip } from '@mui/material';
import React, { use, useEffect, useState } from 'react';

import FormInput from './FormInput';
import Donate3Btn from '../Donate3Btn';
import CodeCard, { CODE_TYPE, ICodeCardProps } from './CodeCard';

interface ICodeRegionProps {
  code: string;
  link: string;
  enslink?: string;
}

const CodeRegion = ({ code, link, enslink = undefined }: ICodeRegionProps) => {
  const [codeCards, setCodeCards] = useState<ICodeCardProps[]>();

  useEffect(() => {
    if (code && link) {
      const cards = [
        {
          title: 'Integrate into your code?',
          content: code,
          btnText: 'Copy code',
          btnImg: '/images/copy.svg',
          type: CODE_TYPE[0] as keyof typeof CODE_TYPE,
        },
        {
          title: 'Need a link to accept donations?',
          content: link,
          btnText: 'Copy Link',
          btnImg: '/images/link.svg',
          type: CODE_TYPE[1] as keyof typeof CODE_TYPE,
        },
      ];
      setCodeCards(cards!);
    }

    if (enslink) {
      let ens = {
        title: 'Need a ens link to accept donations?',
        content: enslink,
        btnText: 'Copy Link',
        btnImg: '/images/link.svg',
        type: CODE_TYPE[1] as keyof typeof CODE_TYPE,
      };
      setCodeCards((prev) => {
        if (prev) {
          return [...prev, ens];
        } else {
          return [ens];
        }
      });
    }
  }, [code, link, enslink]);

  return code && link ? (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '23px 21px 32px 21px',
        borderRadius: '4px',
        background: '#FFF',
      }}
    >
      {codeCards!?.length > 0 ? (
        codeCards!?.length == 3 ? (
          <>
            <CodeCard title={codeCards![0].title} content={codeCards![0].content} btnText={codeCards![0].btnText} btnImg={codeCards![0].btnImg} type={codeCards![0].type}></CodeCard>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: '24px' }}>
              <CodeCard title={codeCards![1].title} content={codeCards![1].content} btnText={codeCards![1].btnText} btnImg={codeCards![1].btnImg} type={codeCards![1].type} half={true}></CodeCard>
              <CodeCard title={codeCards![2].title} content={codeCards![2].content} btnText={codeCards![2].btnText} btnImg={codeCards![2].btnImg} type={codeCards![2].type} half={true}></CodeCard>
            </div>
          </>
        ) : (
          codeCards!.map(({ title, content, btnText, btnImg, type }) => <CodeCard title={title} content={content} btnText={btnText} btnImg={btnImg} key={btnImg} type={type} />)
        )
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};
export default CodeRegion;
