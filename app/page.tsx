"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button, Typography, message, Menu } from "antd";
import type { MenuProps } from "antd";

const { Option } = Select;
const { Paragraph } = Typography;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "p1",
    label: (
      <a href="./assets/p1.jpg" target="_blank" rel="noopener noreferrer">
        2024世少赛
      </a>
    ),
  },
  {
    key: "p2",
    label: (
      <a href="./assets/p2.jpg" target="_blank" rel="noopener noreferrer">
        2024WMO
      </a>
    ),
  },
];

const blockContent1 = `填写之后1-2个工作日会有老师电话联系您！`;

const blockContent2 = `登记之后可获得剑桥考级模拟真题卷+音频～`;

export default function StudentForm() {
  const [form] = Form.useForm();

  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const onFinish = () => {
    message.success("表单提交成功！");
    window.location.href = "/pages/materials";
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        height: "100vh",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "pink",
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{
          color: "white",
          fontSize: "15px",
          borderRadius: "10px",
        }}
        items={items}
      />
      <h1
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "white",
        }}
      >
        【考试报名】预约登记
      </h1>
      <Paragraph>
        <blockquote>{blockContent1}</blockquote>
        <blockquote>{blockContent2}</blockquote>
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: "请输入姓名" }]}
          style={{ width: "40%" }}
        >
          <Input placeholder="联系您的称呼" />
        </Form.Item>
        <Form.Item
          name="contact"
          label="联系方式"
          style={{ width: "40%" }}
          rules={[{ required: true, message: "请输入你的联系方式" }]}
        >
          <Input placeholder="您的联系方式" />
        </Form.Item>
        <Form.Item
          name="grade"
          label="孩子所在年级"
          style={{ width: "50%" }}
          rules={[{ required: true, message: "请选择年级" }]}
        >
          <Select placeholder="选择年级">
            <Option value="一年级">一年级</Option>
            <Option value="二年级">二年级</Option>
            <Option value="三年级">三年级</Option>
            <Option value="四年级">四年级</Option>
            <Option value="五年级">五年级</Option>
            <Option value="六年级">六年级</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="subject"
          label="备考科目（可多选）"
          style={{ width: "80%" }}
          rules={[{ required: true, message: "请选择备考科目" }]}
        >
          <Select placeholder="选择科目" mode="multiple">
            <Option value="剑桥一级">剑桥一级（Starters）</Option>
            <Option value="剑桥二级">剑桥二级（Movers）</Option>
            <Option value="剑桥三级">剑桥三级（Flyers）</Option>
            <Option value="剑桥KET">剑桥KET</Option>
            <Option value="剑桥PET">剑桥PET</Option>
            <Option value="剑桥FCE">剑桥FCE</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="location"
          label="所在地区"
          style={{ width: "80%" }}
          rules={[{ required: true, message: "请输入所在地区" }]}
        >
          <Select placeholder="选择所在地区">
            <Option value="鼓楼区">鼓楼区</Option>
            <Option value="秦淮区">秦淮区</Option>
            <Option value="浦口区">浦口区</Option>
            <Option value="建邺区">建邺区</Option>
            <Option value="栖霞区">栖霞区</Option>
            <Option value="六合区">六合区</Option>
            <Option value="雨花区">雨花区</Option>
            <Option value="玄武区">玄武区</Option>
            <Option value="江宁区">江宁区</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "180px", marginTop: "20px" }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
