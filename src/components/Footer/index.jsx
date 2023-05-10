import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Title = styled('button')`
  font-size: var(--fs-xl);
  font-weight: var(--fw-normal);
  margin: 0 50px;
  border: 0;
  background-color: #f6f6f6;
  color: #ff3131;

  @media (max-width: 450px) {
    font-size: var(--fs-s);
    line-height: 1;
    margin: 0 30px;
  }
`
const FooterStyle = styled('div')`
  background-color: #f6f6f6;
  padding: 30px 0;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;

  @media (max-width: 450px) {
    width: 100%;
    min-width: 320px;
  }
`
const FooterContainer = styled('div')`
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
  display: flex;
  justify-content: space-between;
`

const Footer = ({ input, setStartWeekDay, selectDate, setInput }) => {
  function deleteHandler() {
    var newInput = input.filter(function (f) {
      return f !== selectDate
    })
    setInput(newInput)
  }
  function todayHandler() {
    setStartWeekDay(moment().startOf('week'))
  }

  return (
    <>
      <FooterStyle>
        <FooterContainer>
          <Title onClick={todayHandler}>Today</Title>
          {input.includes(selectDate) && (
            <Title onClick={deleteHandler}>Delete</Title>
          )}
        </FooterContainer>
      </FooterStyle>
    </>
  )
}

export { Footer }
