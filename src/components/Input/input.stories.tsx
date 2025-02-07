import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Input } from './input.tsx'

// ✅ 1. 修正 `Meta` 类型，确保 `Input` 组件类型正确
const meta: Meta<typeof Input> = {
  title: '第九章：Input',
  id: 'Input',
  component: Input,
  tags: ["autodocs"], // 使其支持自动文档化
}

export default meta;
type Story = StoryObj<typeof Input>;

// ✅ 2. 移除错误的 `Story<typeof Input>`，直接使用 `Story`
export const ADefault: Story = {
  args: {
    placeholder: '漂亮的 Input'
  },
};
ADefault.storyName = '默认的 Input';

export const BDisabled: Story = {
  args: {
    placeholder: 'disabled input',
    disabled: true
  },
};
BDisabled.storyName = '被禁用的 Input';

export const CIcon: Story = {
  args: {
    placeholder: 'input with icon',
    icon: 'search'
  },
};
CIcon.storyName = '带图标的 Input';

// ✅ 3. `DSizeInput` 直接返回 JSX（适用于一次性展示多个组件）
export const DSizeInput = () => (
  <>
    <Input defaultValue="large size" size="lg" />
    <Input placeholder="small size" size="sm" />
  </>
);
DSizeInput.storyName = '大小不同的 Input';

// ✅ 4. `EPandInput` 也直接返回 JSX
export const EPandInput = () => (
  <>
    <Input defaultValue="prepend text" prepend="https://" />
    <Input defaultValue="google" append=".com" />
  </>
);
EPandInput.storyName = '带前后缀的 Input';
