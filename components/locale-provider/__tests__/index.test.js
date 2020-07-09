/* eslint-disable react/no-multi-comp */
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';
import mountTest from '../../../tests/shared/mountTest';
import {
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Popconfirm,
  Table,
  Modal,
  Select,
  Transfer,
} from '../..';
import LocaleProvider from '..';

import enGB from '../en_GB';
import enUS from '../en_US';
import esES from '../es_ES';
import zhCN from '../zh_CN';

const locales = [
  enGB,
  enUS,
  esES,
  zhCN,
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const App = () => (
  <div>
    <Pagination defaultCurrent={1} total={50} showSizeChanger />
    <Select showSearch style={{ width: 200 }}>
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
    </Select>
    <DatePicker open />
    <TimePicker open defaultOpenValue={moment()} />
    <RangePicker open style={{ width: 200 }} />
    <Popconfirm title="Question?" visible>
      <a>Click to confirm</a>
    </Popconfirm>
    <Transfer dataSource={[]} showSearch targetKeys={[]} render={item => item.title} />
    <Calendar fullscreen={false} value={moment()} />
    <Table dataSource={[]} columns={columns} />
    <Modal title="Locale Modal" visible getContainer={false}>
      <p>Locale Modal</p>
    </Modal>
  </div>
);

describe('Locale Provider', () => {
  mountTest(() => (
    <LocaleProvider>
      <div />
    </LocaleProvider>
  ));

  beforeAll(() => {
    MockDate.set(moment('2017-09-18T03:30:07.795').valueOf());
  });

  afterAll(() => {
    MockDate.reset();
  });

  locales.forEach(locale => {
    it(`should display the text as ${locale.locale}`, () => {
      const wrapper = mount(
        <LocaleProvider locale={locale}>
          <App />
        </LocaleProvider>,
      );
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('should change locale of Modal.xxx', () => {
    class ModalDemo extends React.Component {
      componentDidMount() {
        jest.useFakeTimers();
        Modal.confirm({
          title: 'Hello World!',
        });
        jest.runAllTimers();
        jest.useRealTimers();
      }

      render() {
        return null;
      }
    }
    locales.forEach(locale => {
      mount(
        <LocaleProvider locale={locale}>
          <ModalDemo />
        </LocaleProvider>,
      );
      const currentConfirmNode = document.querySelectorAll('.ant-modal-confirm')[
        document.querySelectorAll('.ant-modal-confirm').length - 1
      ];
      let cancelButtonText = currentConfirmNode.querySelectorAll(
        '.ant-btn:not(.ant-btn-primary) span',
      )[0].innerHTML;
      let okButtonText = currentConfirmNode.querySelectorAll('.ant-btn-primary span')[0].innerHTML;
      if (locale.locale.indexOf('zh-') === 0) {
        cancelButtonText = cancelButtonText.replace(' ', '');
        okButtonText = okButtonText.replace(' ', '');
      }
      expect(cancelButtonText).toBe(locale.Modal.cancelText);
      expect(okButtonText).toBe(locale.Modal.okText);
    });
  });

  it('set moment locale when locale changes', () => {
    class Test extends React.Component {
      state = {
        locale: zhCN,
      };

      render() {
        const { locale } = this.state;
        return (
          <LocaleProvider locale={locale}>
            <div>
              <DatePicker defaultValue={moment()} open />
            </div>
          </LocaleProvider>
        );
      }
    }
    const wrapper = mount(<Test />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setState({ locale: zhCN });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.setState({ locale: null });
    expect(wrapper.render()).toMatchSnapshot();
  });
});
