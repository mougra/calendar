import React from 'react'
import styled from 'styled-components'
import { useInput } from '../../hook/input'
import { Input } from '../Input/index'
import moment from 'moment'
export const localStore = require('store')

const ModalContent = styled.div`
  padding: 30px 30px 0;
  border-radius: 30px 30px 0 0;
  background-color: #e6e6e7;
  text-align: center;
  border-bottom: 1px solid #000000;
  width: 480px;
  z-index: 3;

  @media (max-width: 600px) {
    padding: 10px 10px 0;
    width: 290px;
  }
`

const BtnContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 540px;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 310px;
  }
`
const BtnCancel = styled.button`
  display: flex;
  flex-wrap: nowrap;
  width: 200px;
  flex-grow: 1;
  padding: 25px;
  justify-content: center;
  border-radius: 0 0 0 30px;
  border: none;
  border-right: 1px solid #000000;
  background-color: #e6e6e7;
  color: #007aff;
  font-size: var(--fs-ml);
  font-weight: var(--fw-normal);
`
const BtnOK = styled.button`
  display: flex;
  flex-wrap: nowrap;
  width: 200px;
  flex-grow: 1;
  padding: 25px 0;
  justify-content: center;
  text-align: center;
  border-radius: 0 0 30px 0;
  border: none;
  background-color: #e6e6e7;
  color: #007aff;
  font-size: var(--fs-ml);
  font-weight: var(--fw-normal);
`

interface ModalProps {
  active: boolean
}

const Modal = styled.div<ModalProps>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: 0.5s;
  opacity: ${({ active }) => (active ? '1' : '0')};
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};
`

interface TextProps {
  primary: boolean
}

const Text = styled.p<TextProps>`
  color: #000000;
  font-size: ${({ primary }) => (primary ? 'var(--fs-md)' : 'var(--fs-ml)')};
  line-height: 0.3;
  font-weight: ${({ primary }) =>
    primary ? 'var(--fw-bold)' : 'var(--fw-normal)'};

  @media (max-width: 600px) {
    font-size: var(--fs-l);
  }
`

interface ModalContainerProps {
  active: boolean
  setActive(active: boolean): void
  input: any
  setInput(input: any): void
}

const ModalContainer = ({
  active,
  setActive,
  input,
  setInput,
}: ModalContainerProps) => {
  function NewEntryHandler(e: any) {
    e.stopPropagation()

    const regexpDate =
      /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/gim
    if (regexpDate.test(inputQ.value) && inputQ.value.length === 19) {
      // setLogError('')
      setActive(false)

      let inputDate = moment(inputQ.value)
        .set('minute', 0)
        .set('seconds', 0)
        .format('LLLL')

      if (input.includes(inputDate)) return
      else {
        const clone = structuredClone(input)
        clone.push(inputDate)
        setInput(clone)
        localStore.set('TODO_DATE', clone)
      }
    } else alert('неверный формат даты')
  }

  const inputQ = useInput('')

  return (
    <Modal active={active} onClick={() => setActive(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Text primary>https://calendar.com</Text>
        <Text primary={false}>Enter event time:</Text>
        <Text primary={false}>YYYY-MM-DD HH:mm:ss</Text>
        <Input inputQ={inputQ} />
      </ModalContent>
      <BtnContainer>
        <BtnCancel onClick={() => setActive(false)}>Cancel</BtnCancel>
        <BtnOK onClick={NewEntryHandler}>OK</BtnOK>
      </BtnContainer>
    </Modal>
  )
}

export { ModalContainer }
