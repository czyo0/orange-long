import React from "react";
import classNames from "classnames"; //引入 classnames 库，用于条件性地组合 CSS 类名。
import { type } from "os";
//常量用枚举定义
export enum ButtonSize{
    Large='lg',
    Small='sm'
}

export enum ButtonType{
    Primary='primary',
    Default='default',
    Danger='danger',
    Link='link'
}

//props样式
interface BaseButtonProps{
    className?:string;
    disabled?:boolean;
    size?:ButtonSize;
    btnType?:ButtonType;
    children:React.ReactNode;
    href?:string; 
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
//ts的 utility type 设置成可选的 Partial<T>

const Button:React.FC<ButtonProps>=(props)=>{
    const{btnType='default',
        className,
        disabled=false,
        size,
        //在 React 组件中，children 是一个特殊的属性，用于表示组件内部的内容。
        //它允许你在自定义组件中嵌套其他元素或文本。
        children,
        href,
        //取出剩下的所有属性
        ...restPorps
    }=props

    //使用 classnames 生成一个包含多个 CSS 类的字符串
    //btn是基本类名
    const classes=classNames('btn',className,{
        //object key变化的情况下的写法[`btn-${btnType}`]
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled':(btnType===ButtonType.Link)&&disabled
        //link类型要add disabled class，因为他本身没有disabled属性？
    })
    if(btnType===ButtonType.Link && href) {//link提供href才有效
        return(
            <a
            className={classes}
            href={href}
            {...restPorps}
            >
                {children}
            </a>
        )

    } else{
        return(
            <button
            className={classes}
            disabled={disabled}
            {...restPorps}
            >
                {children}
            </button>
        )

    }

}

//react19移除defaultProps使用ES6默认参数


export default Button