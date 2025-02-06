import React,{useState}from "react";
import classNames from "classnames";

//主题颜色
export enum AlertType{
    Success='suscess',
    Default='default',
    Danger='danger',
    Warning='warning'
}

//props样式
interface BaseAlertProps{
    className?:string;
    type?:AlertType;
    description?: string;
    title?:string; 
    ifClose?:boolean;

}



const Alert:React.FC<BaseAlertProps>=(props)=>{

    const [ hide, setHide ] = useState(false)
    const{
        className,
        type,
        description,
        title,
        ifClose=true,   //决定是否显示关闭图标
        //取出剩下的所有属性
        ...restPorps
    }=props


    const classes=classNames('alert',{
        [`alert-${type}`]:type,
    
    })

const handleOnClose=(e: React.MouseEvent)=>{
    console.log("close")
    setHide(true);


}
    return(
        !hide&&<div className={classes}>
            <span className="alert-title">{title}</span>
            {ifClose && <p className="alert-close" onClick={handleOnClose}>关闭</p>}
            {description && <p className="alert-children">{description}</p>}
            



        </div>

    )


}


export default Alert