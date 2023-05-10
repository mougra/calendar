import React, { useState } from 'react'
import GlobalStyles from './global'
import moment from 'moment'
import { CalendarGrid } from '../calendarGrid'
import { Header } from '../header'
import styled from 'styled-components'
export const localStore = require('store')

const Wrapper = styled('div')`
  margin: 0;
`

function App() {
  moment.updateLocale('en', { week: { dow: 1 } })
  let nowTime = moment()
  const [startWeekDay, setStartWeekDay] = useState(moment().startOf('week'))
  const [input, setInput] = useState(localStore.get('TODO_DATE') ?? [])

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Header input={input} setInput={setInput} />
        <CalendarGrid
          key={startWeekDay.format('DDMMYYYY')}
          nowTime={nowTime}
          startWeekDay={startWeekDay}
          setStartWeekDay={setStartWeekDay}
          input={input}
          setInput={setInput}
        />
      </Wrapper>
    </>
  )
}

export default App
