import React ,{useContext} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu.tsx";


export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children:React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps>=(props)=>{
    const{
        index,
        disabled,
        className,
        style,
        children,
    }=props;
    const context = useContext(MenuContext)
    const classes=classNames('menu-item',classNames,{
        'is-disabled':disabled,
        'is-active':context.index===index

    })
    const handleClick = () => {
        if(context.onSelect && !disabled && (typeof index === 'string')){
            context.onSelect(index)
        }
    }
    return(
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>

    )
}
export default MenuItem