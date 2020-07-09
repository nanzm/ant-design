import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '.';

const renderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const prefix = getPrefixCls('empty');
      console.log(prefix)
      switch (componentName) {
        case 'Table':
        case 'List':
        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        case 'Mentions':
        default:
          return <div />;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
