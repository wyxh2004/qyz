"use client";
import React, { useState } from "react";
import { List, Button, message } from "antd";
import {
  DownloadOutlined,
  FolderOutlined,
  FileOutlined,
} from "@ant-design/icons";

interface MaterialItem {
  name: string;
  type: string;
  children?: string[];
}

const initialMaterials = [
  {
    name: "KP词汇",
    type: "folder",
    children: [
      "【KET】用思维导图速记KET词汇.pdf",
      "【PET】用思维导图速记PET词汇.pdf",
      "a2-key-2020-vocabulary-list.pdf",
      "b1-preliminary-2020-vocabulary-list.pdf",
      "KET-PET常用固定搭配.pdf",
    ],
  },
  {
    name: "官方词汇包",
    type: "folder",
    children: ["KET词汇表.pdf", "PET词汇表.pdf"],
  },
  {
    name: "剑桥KET+PET",
    type: "folder",
    children: [
      "2020KET校园版模拟试题含答案.pdf",
      "KET、PET不规则动词表.pdf",
      "KET、PET常用固定搭配.pdf",
      "KET、PET常用英语固定搭配词组汇总.pdf",
      "KET1校园版 2020新版.pdf",
      "KET改革版话题分类词汇.pdf",
      "KET通关600词 新版.pdf",
      "PET笔试部分解题方法.pdf",
    ],
  },
  { name: "重点知识总结.pdf", type: "file" },
  { name: "剑桥五级KET及PET高频同义词大全.pdf", type: "file" },
  { name: "KET词汇表—分类词汇（英文中文版）.pdf", type: "file" },
  { name: "KET词汇表-字母顺序（英文中文版）.pdf", type: "file" },
  { name: "剑桥KET词汇表-六年级(中英对照).pdf", type: "file" },
  { name: "剑桥KET词汇表-五年级(中英对照).pdf", type: "file" },
  { name: "剑桥KET学霸自测词汇一本通.pdf", type: "file" },
  {
    name: "剑桥英语KET考试官方真题集3.pdf",
    type: "file",
  },
  { name: "KET6-标准版可用电子版刷题书.pdf", type: "file" },
  { name: "KET词汇表—分类词汇（英文中文版）(1).pdf", type: "file" },
];

export default function MaterialsPage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  const handleDownloadFile = (fileName: string) => {
    const filePath = [...currentPath, fileName].join("/");
    const link = document.createElement("a");
    link.href = `/assets/${filePath}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    message.success(`正在下载 ${fileName}`);
  };

  const handleItemClick = (item: MaterialItem) => {
    if (item.type === "folder") {
      setCurrentPath([...currentPath, item.name]);
      setMaterials(
        item.children?.map((name) => ({ name, type: "file" as const })) || []
      );
    } else {
      window.open(`/assets/${item.name}`, "_blank");
    }
  };

  const handleBackClick = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);

      if (newPath.length === 0) {
        setMaterials(initialMaterials);
      } else {
        let currentFolder: MaterialItem[] = initialMaterials;
        for (const folderName of newPath) {
          const found = currentFolder.find(
            (item: MaterialItem) => item.name === folderName
          );
          if (!found) {
            console.error(`Folder not found: ${folderName}`);
            break;
          }
          currentFolder = (found.children || []).map((child: string) => ({
            name: child,
            type: "folder", // 或者其他合适的类型
            children: [],
          }));
        }
        setMaterials(
          currentFolder.map((item: MaterialItem) => ({
            name: item.name,
            type: "file",
          }))
        );
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "32px auto",
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
          学习资料包
        </h1>
      </div>
      {currentPath.length > 0 && (
        <Button onClick={handleBackClick} style={{ marginBottom: "16px" }}>
          返回上一级
        </Button>
      )}
      <List
        bordered
        dataSource={materials}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                key={item.name}
                onClick={() => handleDownloadFile(item.name)}
                icon={<DownloadOutlined />}
                style={{ marginLeft: "8px" }}
              >
                下载
              </Button>,
            ]}
          >
            {item.type === "folder" ? (
              <FolderOutlined
                style={{ marginRight: "18px", color: "#ffd700" }}
              />
            ) : (
              <FileOutlined style={{ marginRight: "18px", color: "#1890ff" }} />
            )}
            <span
              onClick={() => handleItemClick(item)}
              style={{
                cursor: "pointer",
                color: "#1890ff",
                marginRight: "auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.name}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
}
