import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    //筛选
    fetchSuggestions: (str: string) => string[]
    onSelect?: (item: string) => void
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const{
        fetchSuggestions,
        onSelect,
        value,
        ...restProps
    }=props
    
    const [inputValue, setInputValue] = useState(value);
    const [suggestions,setSuggestions] = useState<string[]>([]) //string的数组 展示下拉框的值

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()//拿到目前输入的值，trim去掉空格
        setInputValue(value)
        if(value){
            const results = fetchSuggestions(value)
            setSuggestions(results)
        }else{
            setSuggestions([])
        }
    }

    return(
        <div className='auto-complete'>
            <Input
            value={value}
            onChange={handleChange}//每次onchange改变函数值
            {...restProps}
            ></Input>
        </div>
    )
}