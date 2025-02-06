import React, { useState }  from "react";
import classNames from "classnames";
import  {TabItemProps} from  './tabItem'

export interface  TabsProps{
    children?:React.ReactNode;
    defaultIndex: number; //当前激活的index
    onSelect?: (selectedIndex: number) => void;
    className?: string;
    style?: React.CSSProperties;
    type?: 'line'|'card';
}

const Tabs: React.FC<TabsProps> = ({defaultIndex=0,className,style,onSelect,children,type}) => {
    const navClass = classNames ('tabs-nav',className,{
        'nav-line': type==='line',
        'nav-card': type==='card',
    })
    const [activeIndex,setActiveIndex]=useState(defaultIndex);
    const handleClick=(e:React.MouseEvent, index:number, disabled:boolean | undefined) => {
        if(!disabled){
            setActiveIndex(index)
            if(onSelect){
                onSelect(index)
            }
        }
    }
    //遍历children渲染导航项,Children.map(children, fn, thisArg?),
    //fn可以对每个子元素进行处理，然后返回处理后的子元素。
    const renderNavLinks = () => {
        return React.Children.map(children, (child,index)=>{
            //FunctionComponentElement 是 TypeScript 中用来描述 React 函数组件的 JSX 元素类型 的一种内置类型
            //在 React 中，当你用 React.Children.map 遍历 children 时，TypeScript 会将每个子节点视为通用的 ReactNode 类型。
            //为了更精准地访问子组件的 props，需要将其断言为特定的组件类型。
            //这告诉 TypeScript：child 是一个由 FunctionComponent（函数式组件）生成的 React 元素。这个组件的 props 类型为 TabItemProps。
            //将 child 断言为 FunctionComponentElement<TabItemProps>，可以让 TypeScript 知道这个组件的 props 是符合 TabItemProps 的，方便后续访问
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            //从 childElement 的 props 中提取 label 和 disabled，用于渲染导航和判断交互状态。
            const { label, disabled } = childElement.props; //props 是 React 组件的重要概念，表示组件从父组件接收的数据。
            const classes = classNames('tabs-nav-item', {
                'is-active': activeIndex === index,
                'disabled': disabled,
              })
              return(
                //key={nav-item-${index}}：key 使用了模板字符串，生成类似 nav-item-0, nav-item-1, nav-item-2 这样的唯一标识
                //当 React 渲染列表时（例如通过 map 遍历数组生成多个元素），它需要一种方式来区分每个元素，
                //以便在列表发生变化（如增删或重新排序元素）时，只更新需要变化的部分，而不必重新渲染整个列表。
                <li className={classes}  
                key={`nav-item-${index}`} 
                onClick={(e) => {handleClick(e, index, disabled)}}>
                    {label}
                </li>
              )
        })
    }
    //渲染当前激活的选项卡内容
    const renderContent = () => {
        return React.Children.map(children,(child,index) => {
            if(index ===activeIndex){
                return child;
            }

        })
    }
    return(
        //className来自父组件传递的props
        <div className={`tabs ${className}`}> 
        <ul className={navClass}>
            {renderNavLinks()}
        </ul>
        <div className="tabs-content">
            {renderContent()}
        </div>
        </div>

    )
}

export default Tabs