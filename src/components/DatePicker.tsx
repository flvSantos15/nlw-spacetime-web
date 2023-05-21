'use client'

import DatePicker from 'react-datepicker'

interface DatePickerComponentProps {
  dateValue: Date
  onSetDate: (value: Date) => void
}

export function DatePickerComponent({
  dateValue,
  onSetDate
}: DatePickerComponentProps) {
  return (
    <div>
      <DatePicker
        dateFormat="EEE, MMMM dd, yyyy"
        dateFormatCalendar="MMMM yyyy"
        selected={dateValue}
        locale={'pt-BR'}
        onChange={(update: Date) => onSetDate(update)}
        showPopperArrow={false}
        calendarStartDay={0}
      />
    </div>
  )
}
