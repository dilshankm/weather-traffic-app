import React from 'react';

const DesktopDatePicker = ({ value, onChange, renderInput }) => {
  return renderInput({
    value,
    onChange: (e) => onChange(e.target.value),
    placeholder: 'Pick a date',
    label:'Pick a date',
  });
};

export default DesktopDatePicker;
