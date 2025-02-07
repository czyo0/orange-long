import React ,{useEffect, useState} from "react";

function useDebounce(value:any, delay = 300){
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // ✅ 当 value 变化时，延迟 `delay` 毫秒后更新 `debouncedValue`
        const handler = window.setTimeout(() => {
            setDebouncedValue(value)
        },delay)
        // ✅ 清除之前的 timeout，防止多次触发
        return () => {
            clearTimeout(handler)  //确保 只执行最新的 setTimeout，从而实现防抖效果。
        }
    },[value,delay])
    return debouncedValue // ✅ 返回最新的防抖值
}

export default useDebounce