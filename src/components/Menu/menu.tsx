import React,{useState,createContext} from "react";
import classNames from "classnames";
import MenuItem ,{MenuItemProps}from "./menuItem.tsx";

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex:string)=>void;

export interface MenuProps{
    defaultIndex?: string;  //高亮
    className?: string;
    mode: MenuMode;   //纵向横向
    style?: React.CSSProperties;
    onSelect?: (selectedIndex:string)=>void; //选择第几项
    children:React.ReactNode;
    defaultOpenSubMenus?: string[]; //纵向默认展开的
}

//createContext 是 React 中用于创建上下文的一个 API。
//上下文提供了一种方式，可以在组件树中传递数据，而不必通过每一层组件手动传递 props。
//这样非常适合于共享全局数据，比如用户身份、主题设置或者其他需要在多个组件中共享的状态。
interface IMenuContext{
     index: string;
     onSelect?: (selectedIndex:string)=>void;
     mode?: MenuMode; //submenu想做鼠标横向悬停，纵向点击展示子菜单的区别，context需要mode值
     defaultOpenSubMenus?: string[]; //纵向默认展开的,传给submenu用的
}
export const MenuContext = createContext<IMenuContext>({index:'0'})

const Menu : React.FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus=[],
    }=props;
    const [currentActive,setActive]=useState(defaultIndex);
    const classes = classNames('menu',className,{
        'menu-vertical':mode=='vertical', 
        'menu-horizontal':mode!=='vertical'
    })
    const handleClick = (index:string) => {
        console.log('aaa');
        //1.调用onselect 2.active变化
        setActive(index);
        if(onSelect){
            onSelect(index);
        }
    }
    const passedContext : IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode:mode,
        defaultOpenSubMenus,
    }
    //添加方法循环渲染组件
    const renderChildren=() => {
        return React.Children.map(children,(child,index) => {
            //类型断言，转换成fc实例
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const{displayName}=childElement.type
            if(displayName==='MenuItem' || displayName==='SubMenu'){
                return React.cloneElement(childElement,{index:index.toString()});
            }else{
                console.error("Warning:Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classes} style={style}>
        <MenuContext.Provider value={passedContext}>
        {renderChildren()}
        </MenuContext.Provider>
            
        </ul>
    )
}

//children数据结构不透明
//1.添加displayName，react内置属性帮助判断类型
MenuItem.displayName='MenuItem';
export default Menu