import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button.tsx";
import React from 'react';

const meta = {
    title: "Components/Button", // 组件在 Storybook 中的路径
    component: Button, // 绑定的组件
    tags: ["autodocs"], // 使其支持自动文档化

    argTypes: {
      btnType: {
        control: { type: "radio" }, // 让 Storybook UI 以单选按钮的形式展示
        options: Object.values(ButtonType), // 允许选择不同的 ButtonType
      },
      size: {
        control: { type: "radio" },
        options: Object.values(ButtonSize),
      },
      disabled: { control: "boolean" }, // 是否禁用
      href: { control: "text" }, // 超链接
    },
  } satisfies Meta<typeof Button>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;


//   export const Primary: Story = {
//     args: {
//       btnType: ButtonType.Primary,
//       children: "Primary Button",
//     },
//   };
//   export const Default: Story = {
//     args: {
//       btnType: ButtonType.Default,
//       children: "Default Button",
//     },
//   };
//   export const Danger: Story = {
//     args: {
//       btnType: ButtonType.Danger,
//       children: "Danger Button",
//     },
//   };

//   export const Link: Story = {
//     args: {
//       btnType: ButtonType.Link,
//       href: "https://example.com",
//       children: "Link Button",
//     },
//   };
//   export const Large: Story = {
//     args: {
//       size: ButtonSize.Large,
//       children: "Large Button",
//     },
//   };
//   export const Small: Story = {
//     args: {
//       size: ButtonSize.Small,
//       children: "Small Button",
//     },
//   };
//   export const Disabled: Story = {
//     args: {
//       disabled: true,
//       children: "Disabled Button",
//     },
//   };

export const ADefault: Story = {
    args: {
      children: "Default Button",
    },
  };
  ADefault.storyName = "默认按钮样式"
    // 🔵 不同类型的按钮
    export const CButtonWithType = () => (
        <>
          <Button btnType={ButtonType.Primary}> primary button </Button>
          <Button btnType={ButtonType.Danger}> danger button </Button>
          <Button btnType={ButtonType.Link} href="https://google.com">
            link button
          </Button>
        </>
      );
      CButtonWithType.storyName = "不同类型的按钮";
  
  // 🟢 不同尺寸的按钮
export const BButtonWithSize = () => (
    <>
      <Button size={ButtonSize.Large}> large button </Button>
      <Button size={ButtonSize.Small}> small button </Button>
    </>
  );
  BButtonWithSize.storyName = "不同尺寸的按钮";
  
