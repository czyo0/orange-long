

const a = ['1','abc','']

interface AutoCompleteProps {
   //data: string[],减化掉
    //筛选
    fetchSuggestions: (keyword: string, data: string[]) => string[] | Promise<string[]>
    onSelect: (item: string) => void
}

const handleChange = (keyword: string) => {
    return a.filter(item => item.includes(keyword))
    //异步例子
    return fetch('url?keyword=${keyword}')
}
const handleSelect = (item: string) => {
    console.log(item)
}
//<AutoComplete fetchSuggestions={handleChange}onSelect={handleSelect}/>
//custom option

//keyboard support

//debounce

//click out side 点击其他区域收起下拉菜单