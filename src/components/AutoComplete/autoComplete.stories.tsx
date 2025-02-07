import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { AutoComplete } from './autoComplete.tsx'

const meta: Meta<typeof AutoComplete> = {
    title: 'AutoComplete',
    id: 'AutoComplete',
    component: AutoComplete,
    tags: ["autodocs"], // 使其支持自动文档化
  }
  
  export default meta;
  type Story = StoryObj<typeof AutoComplete>;