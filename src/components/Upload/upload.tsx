import React, { useRef,ChangeEvent,useState } from "react";
import axios from "axios";
import Button, { ButtonType } from "../Button/button";
import { UploadList } from "./UploadList";

export type UploadFileStatus = 'ready' |'uploading' |'success' |'error' 

export interface UploadProps {
    defaultFileList?: UploadFile[];
    onRemove?: (file: UploadFile) => void;
    action: string,
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File)=>void,
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file) => void
}
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File; //保存文件原始信息
    response?: any; //返回信息
    error?: any;  //失败信息

}

export const Upload: React.FC<UploadProps>= (props) => {
    const{
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        defaultFileList,
        onRemove
    }=props
    const fileInput = useRef<HTMLInputElement>(null)    //拿到dom结点？
    const [ fileList,setFileList ] =useState<UploadFile[]>(defaultFileList || [])
    //辅助更新列表里的一项,updateFile更新的file，updateObj更新的值
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList( prevList => {
            return prevList.map( file => {
                if(file.uid ===updateFile.uid){
                    return { ...file, ...updateObj}
                }else{
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if(fileInput.current){
            fileInput.current.click()   //触发input click事件
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files= e.target.files
        if (!files){
            return   //没有就return
        }
        upLoadFiles(files) //有就上传
        if(fileInput.current){  //过程结束 清空值
            fileInput.current.value = ''
        }
    }

    const upLoadFiles = (files: FileList) => { //调用数组放大 
         let postFiles = Array.from(files) //转成数组用foreach
         postFiles.forEach( file => {
            if(!beforeUpload){
                post(file)
            }else{
                const result = beforeUpload(file)  //运行结果
                if(result && result instanceof Promise){
                    result.then(processedFile => {
                        post(processedFile)
                    })
                }else if(result !== false){
                    post(file)
                }
            }
         })
    }
    

    const post = (file: File) => {
        //开始更新fileList
        let _file: UploadFile = {   //_是什么？
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
            formData.append(file.name, file)
            axios.post(action, formData, {
                headers: {
                     'Content-Type': 'multipart/form-data' 
                },
                onUploadProgress: (e) => {
                    let total = e.total ?? 1; // 如果 total 为空，则默认设为 1，避免除以 0
                    let percentage = Math.round( (e.loaded * 100) / total) || 0;
                    if(percentage < 100){
                        updateFileList(_file,{percent: percentage, status: 'uploading'})
                        if(onProgress){
                            onProgress(percentage, file)
                        }
                    }

                }
            }).then(resp => {  //调用成功
                updateFileList(_file, {status:'success', response: resp.data})
                if(onSuccess){
                    updateFileList(_file,{status: 'success', response: resp.data})
                    onSuccess(resp.data, file)
                }     
                if(onChange){
                    onChange(file)
                }
            }).catch(err => {  //调用失败
               console.log(err)
               updateFileList(_file, {status:'error', error: err})
               if(onError){
                onError(err,file)
               }
               if(onChange){
                onChange(file)
            }
            })
    }
    return(
        <div
        className="upload-component">
            <Button 
            btnType={ButtonType.Primary}
            onClick={handleClick}
            >Upload File</Button>
            <input 
            className="file-input" 
            style={{display: 'none'}} 
            type="file"
            ref={fileInput}
            onChange={handleFileChange}
            ></input>
        </div>
    )
}

export default Upload;