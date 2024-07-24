import React, {useState} from 'react';
import { DatePicker } from 'antd';

function Filter({sendDatesFilter}) {
    const { RangePicker } = DatePicker;

    function onChange(date, dateString) {
        sendDatesFilter(dateString);
    }

    return (
        <RangePicker allowClear={true} format={"YYYY-MM-DD"} onChange={onChange} />
    );
}

export default Filter;