import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon.tsx'
import useDebounce from '../../hooks/useDebounce.tsx'
interface DataSourceObject{
    value: string;
}
//定义一个泛型类型，用于描述数据源对象，T → 代表用户自定义的数据结构（默认 {}）。
//DataSourceObject → 代表基础数据对象（可能包含 value 字段）。
//T & DataSourceObject 表示：T 的所有属性 + DataSourceObject 的属性。
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    //筛选
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;  //支持异步 返回promise
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item:DataSourceType) => ReactElement //自定义渲染下拉框
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const{
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    }=props
    
    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions,setSuggestions] = useState<DataSourceType[]>([]) //展示下拉框的值
    const [ loading, setLoading ] = useState(false) //异步请求状态
    const debouncedValue = useDebounce(inputValue,500); //防抖
    useEffect(() => { //
        if(debouncedValue){
            const results = fetchSuggestions(debouncedValue)
            if(results instanceof Promise){ //是否为promise对象
                results.then(data => {
                    setSuggestions(data)
                })
            }else{
                setSuggestions(results)
            }
           
        }else{
            setSuggestions([])
        }
    },[inputValue])

    //处理返回结果
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()//拿到目前输入的值，trim去掉空格
        setInputValue(value)
        
    }

    //选中下拉框的一个值
    const handleSelect = (item: DataSourceType) => {
        //放入输入框
        setInputValue(item.value)
        //清空下拉菜单
        setSuggestions([])
        //触发onselect
        if(onSelect){
            onSelect(item)
        }
    }

    const renderTemplate= (item: DataSourceType) => {
        return renderOption? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            //下拉框
            <ul>
                {suggestions.map((item,index) => {
                    return(
                        //onClick内容填充到输入框，隐藏下拉框
                        <li key={index} onClick={() => handleSelect(item)}> 
                            {/* {item} 替换自定义模版*/
                               renderTemplate(item)
                            }
                             <Icon icon="spinner" spin/>
                        </li>
                    )
                })}
            </ul>
        )
    }
    return(
        <div className='auto-complete'>
            <Input
            value={value}
            onChange={handleChange}//每次onchange改变函数值
            {...restProps}
            ></Input>
            {(suggestions.length > 0) && generateDropdown()}  
            
        </div>
    )
}