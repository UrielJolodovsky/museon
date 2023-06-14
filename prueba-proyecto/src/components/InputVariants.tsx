import React from 'react'

interface InputProps{
    id : string,
    onChange : any,
    value : string,
    label : string, 
    type: string 
}

const InputVariants: React.FC <InputProps>= ({
    id,
    onChange,
    type,
    label,
    value
}) => {

    return (
        <div className='relative'>
            <input 
                onChange={onChange}
                type="text"
                id={id}
                className='
                block 
                px-6
                pt-6
                pb-1
                rounded-md
                w-full
                text-md
                text white
                font-bold
                apparence-none
                focus: outline-none
                focus: ring-0
                peer'
                placeholder=' '
                />
            <label
                className='
                absolute
                text-md
                text-zinc-400
                duration-150
                transform
                -translate-y-3
                scale-75
                top-4
                z-10
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3
                cursor-pointer

                ' 
                htmlFor={id}>
                    {label}
            </label>
        </div>
    )
}

export default InputVariants