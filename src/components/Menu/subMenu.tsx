import React,{useState,useContext, useCallback, FunctionComponentElement} from "react";
import classNames from "classnames";
import {MenuContext}from "./menu.tsx";
import { MenuItemProps } from "./menuItem.tsx";
import { CSSTransition } from 'react-transition-group';
import  Icon from "../Icon/icon.tsx";
import Transition from '../Transition/transition.tsx';

export interface SubMenuProps{
    index?: string;
    title: string;
    className?: string;
    children:React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({index,title,children,className}) => {
    
    const context = useContext(MenuContext)
    const openedSubMenus=context.defaultOpenSubMenus as Array<string>
    const isOpened=(index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false

    const [menuOpen,setOpen] = useState(isOpened)

    //第一步添加classes，需要context,context中有index值
    const classes = classNames('menu-item submenu-item',className,{
        'is-active':context.index===index,
        'is-opened':menuOpen,
        'is-vertical':context.mode==='vertical'

    })

    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen)
    }

    let timer:any
    //鼠标在和鼠标离开的函数，toggle表示是否在 
    const handleMouse = (e:React.MouseEvent, toggle:boolean) => {
        //为了效果更平滑，创建setTimerout，所以上面有timer
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        },300)
    }

    //创建三元表达式。区分悬停和点击
    const clickEvents = context.mode==='vertical' ? {
        onClick:handleClick
    } : {}
    const hoverEvents = context.mode!='vertical' ? {
        onMouseEnter: (e:React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e:React.MouseEvent) => {handleMouse(e, false)}
    }: {}

    //渲染下拉菜单内容
    const renderChildren = () => {
        //写死的classname更换一下
        const subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child,i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName==='MenuItem'){
                return React.cloneElement(childElement,{
                    index:`${index}-${i}`  //比如index=2-1
                })
            }else{
                console.error("Warning:Menu has a child which is not a MenuItem component")
            }

        })
        return(
/*             <CSSTransition
            in={menuOpen}
            timeout={300}
            classNames="zoom-in-top"
            appear
            unmountOnExit
            > */
        <Transition
        in={menuOpen}
        timeout={300}
        animation="zoom-in-top"
        unmountOnExit={true}
        appear={true}
      >
                <ul className={subMenuClasses}>
                {childrenComponent}
                </ul>
            </Transition>
           /*  </CSSTransition> */
            
        )

    }
    return(
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" onClick={handleClick} {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"></Icon>
            </div>
            {renderChildren()}
        </li>
    )

}

SubMenu.displayName='SubMenu'
export default SubMenu