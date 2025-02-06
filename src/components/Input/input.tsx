import React, { InputHTMLAttributes, ReactElement } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'>{
    disabled?: boolean;
    size?: InputSize; //HTMLElement中有size：number，冲突,添加了omit<>忽略了size
    icon?: IconProp;
    prepend?: string | ReactElement;//前缀
    append?: string | ReactElement;//后缀
    children?: React.ReactNode;
    className?: string;
    
}

export const Input: React.FC<InputProps> = (props) =>{
    //取出各种属性
    const{disabled,size,icon,prepend,append,children,className,style,...restProps}=props;

    //根据属性计算classname
    const classes = classNames('input',className,{
        'is-disabled':disabled===true,
       //'input-lg':size==="lg",
       // 'input-sm':size==="sm",
        [`input-${size}`]:size,
        'input-group': prepend || append,         // true -> 添加 'input-group'
        'input-group-append': !!append,           // true -> 添加 'input-group-append'
        'input-group-prepend': !!prepend          // true -> 添加 'input-group-prepend'

    })

    //受控组件检测：
    const fixControlledValue = (value:any) =>{
        if(typeof value === 'undefined' || value===null){
            return ''; //// 避免输入框的 value 为 undefined 或 null，强制替换为空字符串
        }
        return value
    }
    //受控和非受控支持：可以作为受控组件使用（通过 value 和 onChange），也可以作为非受控组件（通过 defaultValue）。
     //如果 value 存在，表明组件是受控组件。如果 value 不存在，表明组件是非受控组件。
    if('value' in props){
        delete restProps.defaultValue;//如果 props 中存在 value，则删除 defaultValue，避免冲突 
        //React 表单组件中，value 和 defaultValue 是互斥的：value 控制输入框内容（受控模式）。defaultValue 用于初始化内容（非受控模式）。
        restProps.value = fixControlledValue(props.value); //调用 fixControlledValue 确保 value 的值始终合法（undefined 或 null 会被替换为空字符串）。
    }
    return(
        
        //根据属性判断是否要添加特定结点
        <div className={classes} style={style}>
            {prepend && <div className="input-group-prepend">{prepend}</div>}
            {icon && <div className="input-icon"><Icon icon={icon} title={`title-${icon}`}></Icon></div>}
            <input
             className="input-inner"
             disabled={disabled}
             {...restProps}
            ></input>
            {append && <div className="input-group-append">{append}</div>}
        </div>
    )
    //ref 是 React 提供的一种机制，用于直接访问 DOM 元素或组件实例。它是 React.forwardRef 和 useRef 的核心组成部分，允许开发者对 DOM 或子组件进行直接操作。
    
}

export default Input