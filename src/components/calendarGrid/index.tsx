import React, { useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { CalendarHours } from '../CalendarHours/index'
import { Footer } from '../Footer'

const Day = styled.div`
  flex-grow: 1;

  @media (max-width: 450px) {
    font-size: var(--fs-s);
    line-height: 2;
  }
`

const Days = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`

interface TextProps {
  today: boolean
}

const WeekDay = styled.div<TextProps>`
  font-size: var(--fs-ml);
  background-color: ${({ today }) => (today ? '#ff3131' : '#f6f6f6')};
  color: ${({ today }) => (today ? 'white' : 'black')};
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin: 0 auto;

  @media (max-width: 450px) {
    height: 40px;
    width: 40px;
    font-size: var(--fs-l);
    line-height: 2;
  }
`

const DaysWrapper = styled.div`
  height: 128px;
  background-color: #f6f6f6;
  padding: 10px 0;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
  @media (max-width: 450px) {
    width: 100%;
    min-width: 320px;
    padding: 0 0;
  }
`
const WeekHours = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #ffffff;

  height: calc(100vh - 365px);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  /* &::-webkit-scrollbar {
    display: none;
  } */

  &::-webkit-scrollbar-thumb {
    background: #000000;
    border-radius: 10px;
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background: #e6e6e6;
  }

  @media (max-width: 450px) {
    height: calc(100vh - 332px);
  }
`

const WeekDays = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
  font-size: var(--fs-s);
  line-height: 1.7;
  font-weight: var(--fw-normal);
`

const DateContainer = styled.div`
  text-align: center;
  background-color: #f6f6f6;
  font-size: var(--fs-xl);
  line-height: 1.7;
  font-weight: var(--fw-bold);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const RightArrow = styled.div`
  width: 0;
  height: 0;
  border: solid #ff3131;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 6px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  cursor: pointer;
`
const LeftArrow = styled.div`
  width: 0;
  height: 0;
  border: solid #ff3131;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 6px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  cursor: pointer;
`

const DayHour = styled('div')`
  height: 51px;
  text-align: center;
  color: #e6e6e6;

  @media (max-width: 450px) {
    font-size: var(--fs-s);
    line-height: 1;
  }
`
const DayHours = styled('div')`
  width: 12.5%;
  padding-right: 2%;
  line-height: 0;
  font-size: var(--fs-l);
  font-weight: var(--fw-bold);
  transform: translateY(51px);
  height: calc(100% - 51px);
  @media (max-width: 450px) {
    transform: translateY(42px);
  }
`
const WeekDaysPlug = styled('div')`
  width: 12.5%;
`
const DateContainerPlug = styled('div')`
  display: flex;
  margin: 0 auto;
  max-width: 100%;
  max-width: 680px;
  padding: 0 20px;
`

interface CalendarGridProps {
  startWeekDay: any
  setStartWeekDay(active: any): void
  nowTime: any
  input: string
  setInput(input: string): void
}

const CalendarGrid = ({
  nowTime,
  startWeekDay,
  setStartWeekDay,
  input,
  setInput,
}: CalendarGridProps) => {
  const [selectDate, setSelectDate] = useState('')

  let day: any = startWeekDay.clone().subtract(1, 'day')
  let weekArrays = [...Array(7)].map(() => day.add(1, 'day').clone())

  const getHoursDay = () => {
    let content = []
    let hour = moment().set('hour', 0).set('minute', 0)
    for (let i = 1; i < 24; i++) {
      hour.add(1, 'hours')
      const item = hour.format('HH:mm')
      content.push(<DayHour key={item}>{item}</DayHour>)
    }
    return content
  }

  return (
    <Days>
      <DaysWrapper>
        <WeekDays>
          <WeekDaysPlug />
          {weekArrays.map((weekArray) => (
            <Day key={weekArray.format('DDMMYYYY')}>
              <div>
                {
                  moment(weekArray.format('DD.MM.YYYY'), 'DD.MM.YYYY').format(
                    'ddd'
                  )[0]
                }
              </div>
              <WeekDay
                today={
                  nowTime.format('DD.MM.YYYY') ===
                  weekArray.format('DD.MM.YYYY')
                    ? true
                    : false
                }
              >
                {weekArray.format('D')}
              </WeekDay>
            </Day>
          ))}
        </WeekDays>
        <DateContainerPlug>
          <WeekDaysPlug />
          <DateContainer>
            <LeftArrow
              onClick={() => setStartWeekDay(weekArrays[0].subtract('days', 7))}
            />
            {weekArrays[0].format('MMMM YYYY')}
            <RightArrow
              onClick={() => setStartWeekDay(weekArrays[0].add('days', 7))}
            />
          </DateContainer>
        </DateContainerPlug>
      </DaysWrapper>
      <WeekHours>
        <DayHours>{getHoursDay()}</DayHours>
        {weekArrays.map((weekArray) => (
          <CalendarHours
            key={weekArray.format('DDMMYYYY')}
            weekArray={weekArray}
            input={input}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        ))}
      </WeekHours>
      <Footer
        input={input}
        setStartWeekDay={setStartWeekDay}
        selectDate={selectDate}
        setInput={setInput}
      />
    </Days>
  )
}

export { CalendarGrid }
