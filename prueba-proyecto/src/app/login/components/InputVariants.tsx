import React from 'react'

interface InputProps {
  id: string,
  onChange: any,
  value: string,
  label: string,
  type: string
}

const InputVariants: React.FC<InputProps> = ({
  id,
  onChange,
  type,
  label,
  value
}) => {

  return (
    <div className='w-full flex flex-col'>
      <label
        className='
          font-bold
          text-white
        '
        htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={id}
        value={value}
        className='
                block 
                px-4
                pt-2
                pb-2
                rounded-md
                w-full
                text-md
                text-white
                bg-black
                border-2
                border-white
                font-medium
                focus: outline-none
                focus: ring-0'
        placeholder=' '
        autoComplete='off'
      />
    </div>
  )
}

export default InputVariants