import React, { useState } from 'react'
import styled from 'styled-components'

interface HourPlaceProps {
  checkTODO: boolean
  selectDate: boolean
}

const HourPlace = styled.div<HourPlaceProps>`
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: ${({ checkTODO, selectDate }) =>
    selectDate ? '#b3b7ff' : checkTODO ? '#ebecff' : '#ffffff'};
  height: 46px;
`

const HourPlaceContent = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border-bottom: none;
    border-right: none;
  }
`
const HoursPlace = styled('div')`
  flex-grow: 1;
  border-right: 1px solid #e6e6e6;
  font-size: 0;
  &:last-child {
    border-right: none;
  }
`

interface CalendarHoursProps {
  weekArray: any
  input: any
  selectDate: string
  setSelectDate(selectDate: string): void
}
interface CalendarHoursProp {
  weekArray: any
  input: any
}

export const CalendarHours = ({
  weekArray,
  input,
  selectDate,
  setSelectDate,
}: CalendarHoursProps) => {
  const getHoursContent = ({ weekArray, input }: CalendarHoursProp) => {
    let content = []

    for (let i = 0; i < 24; i++) {
      let datePlace = weekArray.set('hour', i)

      content.push(
        <HourPlaceContent key={i}>
          <HourPlace
            onClick={clickHandlerHour}
            checkTODO={input.includes(datePlace.format('LLLL')) ? true : false}
            selectDate={selectDate === datePlace.format('LLLL') ? true : false}
          >
            {datePlace.format('LLLL')}
          </HourPlace>
        </HourPlaceContent>
      )
    }
    return content
  }

  const clickHandlerHour = (e: any) => {
    setSelectDate(e.target.innerHTML)
  }
  return <HoursPlace>{getHoursContent({ weekArray, input })}</HoursPlace>
}
