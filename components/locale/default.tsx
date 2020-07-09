/* eslint-disable no-template-curly-in-string */
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'en',
  DatePicker,
  TimePicker,
  global: {
    placeholder: 'Please select',
  },
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied',
    expand: 'Expand',
  },
  PageHeader: {
    back: 'Back',
  },
};

export default localeValues;
