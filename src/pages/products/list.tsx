import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
  useNavigation
} from '@pankod/refine-core'
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  MarkdownField,
} from "@pankod/refine-antd";
import { DeleteButton, FilterDropdown, Select, useSelect } from "@pankod/refine-antd";
import { Link } from '@pankod/refine-react-router-v6'

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: userData, isLoading: userIsLoading }  = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.author?.id) ?? [],
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  const { show, edit } = useNavigation();

  return (
    <List>
      <Table {...tableProps} rowKey="id"
             onRow={({id}) => {
               return {
                 onClick: () => {
                   show("products", id ?? '')
                 }
               };
             }}
      >
        <Table.Column dataIndex="id" title="Id" sorter />
        <Table.Column dataIndex="name" title="Name" sorter={{ multiple: 1 }} />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column
          dataIndex="description"
          title="Description"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          dataIndex={["author"]}
          title="Author"
          render={(value) => {
              const user = userData?.data?.find(
                (item) => item.id === value,
              )

              return userIsLoading ? (
                <>Loading...</>
              ) : (
                user?.id ?
                <Link onClick={(e) => e.stopPropagation()} to={`/users/show/${user?.id}`}>{`${user?.firstName} ${user?.lastName}`}</Link>
                  : <></>
              )
            }
          }
        />


        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find(
                (item) => item.id === value,
              )?.title
            )
          }
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
                onClick={event => {
                  edit("products", record.id ?? '')
                  event.stopPropagation()
                }}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
