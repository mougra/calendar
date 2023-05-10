import React from 'react'
import styled from 'styled-components'

const InputDate = styled.input`
  width: calc(100% - 20px);
  caret-color: #007aff;
  caret-shape: block;
  font-size: var(--fs-l);
  line-height: 0.5;
  font-weight: var(--fw-bold);
  padding: 6px 10px;
  margin: 25px 0;
`

const Input = ({ inputQ }) => {
  return (
    <>
      <InputDate
        type='text'
        pattern='^\d{4}-((0[1-9])|(1[012]))-((0[1-9]|[12]\d)|3[01])$'
        required
        value={inputQ.value}
        onChange={(e) => inputQ.onChange(e)}
      />
    </>
  )
}

export { Input }
