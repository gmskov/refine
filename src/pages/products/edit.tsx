import React from "react";
import { IResourceComponentsProps, useList } from '@pankod/refine-core'
import {
  Edit,
  Form,
  useForm,
  Input,
  useSelect,
  Select
} from '@pankod/refine-antd'

export const ProductEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const usersList = useList({
    resource: "users",
    config: {
      hasPagination: false,
    }
  });

  const productsData = queryResult?.data?.data;

  const authorListData = usersList?.data?.data.map(el => {
    return {
      label: `${el.firstName} ${el.lastName}`,
      value: el.id,
    }
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: productsData?.category?.id,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Id"
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Material"
          name={["material"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label="Price"
          name={["price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>

        <Form.Item
          label="Author"
          name={"author"}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select options={authorListData}/>
        </Form.Item>
      </Form>
    </Edit>
  );
};
