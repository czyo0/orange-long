import React ,{useContext} from "react";
import classNames from "classnames";

//专注于定义单个选项卡的内容和标签
export interface TabItemProps{

    label?: string | React.ReactElement; //选项卡文字
    children?:React.ReactNode;
    disabled?: boolean;
}

const TabItem: React.FC<TabItemProps> = ({children}) => {
    
    return(
        <li className="tab-panel">
            {children}
        </li>
    )

}
export default TabItem