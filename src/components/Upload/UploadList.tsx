import React, { FC } from "react";
import axios from "axios";
import Button, { ButtonType } from "../Button/button";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import { Primary } from "@storybook/blocks";

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void;

}

export const UploadList: FC<UploadListProps> = (props) => {
    const{
        fileList,
        onRemove
    }=props

    return(
        <ul className="upload-list">
            {fileList.map(item => {
                return(
                    <li className="upload-list-item" key={item.uid}>
                        <span className={`file-name file-name${item.status}`}>
                            <Icon icon="file-alt" theme="secondary"></Icon>
                            {item.name}
                        </span>
                        <span className="file-status">
                            {item.status==='uploading' && <Icon icon="spinner" spin theme="primary"></Icon>}
                            {item.status==='success' && <Icon icon="check-circle"  theme="success"></Icon>}
                            {item.status==='error' && <Icon icon="times-circle"  theme="danger"></Icon>}
                        </span>
                        <span className="file-actions">
                            <Icon icon="times" onClick={() => {onRemove(item)}}></Icon>
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}