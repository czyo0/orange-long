import React, { useState } from 'react';
import Button,{ButtonSize,ButtonType} from './components/Button/button.tsx';
import Alert,{AlertType} from './components/Alert/alert.tsx';
import {  library } from '@fortawesome/fontawesome-svg-core';
import{fas} from '@fortawesome/free-solid-svg-icons';

import Menu from './components/Menu/menu.tsx';
import MenuItem from './components/Menu/menuItem.tsx';
import SubMenu from './components/Menu/subMenu.tsx';
import Tabs from './components/Tabs/tabs.tsx';
import TabItem from './components/Tabs/tabItem.tsx';
import Icon from './components/Icon/icon.tsx';
import Transition from './components/Transition/transition.tsx';

library.add(fas) //添加类型所有图标
const App:React.FC = () => {
  const [show,setShow]=useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="arrow-down" theme="danger" size="10x"/>

      <Tabs type="line" defaultIndex={0}>
      <TabItem label="Tab 1">Content for Tab 1</TabItem>
      <TabItem label="Tab 2">Content for Tab 2</TabItem>
      <TabItem label="Tab 3">Content for Tab 3</TabItem>
    </Tabs>
        

      <Menu defaultIndex='0' mode='horizontal' onSelect={(index)=>{alert(index)}}>
        <MenuItem disabled>
          cook link
        </MenuItem>
          <MenuItem >
          cook link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem >  dropdown 1</MenuItem>
            <MenuItem> dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem >
          cook link 3
          </MenuItem>
        </Menu>

        <Button size={ButtonSize.Large} onClick={() => {setShow(!show)}}>Toggle</Button>
        <Transition
         in={show}
         timeout={300}
         animation="zoom-in-top"
         unmountOnExit={true}
         appear= {true}
         wrapper
        >
          <div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          </div>
         </Transition>


        <Menu defaultIndex={'0'} mode='vertical' onSelect={(index)=>{alert(index)}} defaultOpenSubMenus={['2']}>
        <MenuItem >
          cook link
        </MenuItem>
          <MenuItem >
          cook link 2
          </MenuItem>
          <SubMenu title="dropdown">
            <MenuItem> dropdown 1</MenuItem>
            <MenuItem> dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem >
          cook link 3
          </MenuItem>
        </Menu>

        <Button autoFocus  >Hello</Button>
      <Button autoFocus  >Hello</Button>

      <Button onClick={(e)=>{e.preventDefault();alert(123)}}  >Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank">Baidu Link</Button>
        
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Baidu Link</Button>
       
        <Alert type={AlertType.Default} title="aaddda" description="bbb" ></Alert>
        
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
