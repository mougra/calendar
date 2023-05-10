import React, { useState } from 'react'
import styled from 'styled-components'
import { ModalContainer } from '../ModalContainer'

const Title = styled('h1')`
  font-size: var(--fs-md);
  line-height: 1.5;
  font-weight: var(--fw-normal);

  @media (max-width: 450px) {
    font-size: var(--fs-xl);
    line-height: 1;
  }
`
const HeaderStyle = styled('div')`
  margin: 0 auto;
  max-width: 720px;
  padding: 0 7%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 450px) {
    padding: 0 3%;
  }
`

const PlusButton = styled('div')`
  display: inline-block;
  width: 50px;
  height: 50px;
  background: linear-gradient(#ff3131, #ff3131),
    linear-gradient(#ff3131, #ff3131);
  background-position: center;
  background-size: 50% 3px, 3px 50%;
  background-repeat: no-repeat;
  cursor: pointer;
`

const Header = ({ input, setInput }) => {
  const [modalActive, setModalActive] = useState(false)
  return (
    <>
      <ModalContainer
        input={input}
        setInput={setInput}
        active={modalActive}
        setActive={setModalActive}
      />
      <HeaderStyle>
        <Title>Interview Calendar</Title>
        <PlusButton onClick={() => setModalActive(true)} />
      </HeaderStyle>
    </>
  )
}

export { Header }
