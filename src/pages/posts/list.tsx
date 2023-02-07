import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useMany,
} from "@pankod/refine-core";
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  ShowButton,
  DeleteButton,
  MarkdownField,
  DateField,
  ImageField,
  TagField,
} from "@pankod/refine-antd";
import { Link } from '@pankod/refine-react-router-v6'

export const PostList: React.FC<IResourceComponentsProps> = () => {
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

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "users",
    ids: tableProps?.dataSource?.map((item) => item?.user?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: tagsData, isLoading: tagsIsLoading } = useMany({
    resource: "tags",
    ids: [].concat(
      ...(tableProps?.dataSource?.map((item) => item?.tags) ?? []),
    ),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column
          dataIndex="content"
          title="Content"
          render={(value: any) => (
            <MarkdownField value={value.slice(0, 80) + "..."} />
          )}
        />
        <Table.Column dataIndex="hit" title="Hit" />
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
        />
        <Table.Column
          dataIndex={["user", "id"]}
          title="Author"
          render={(value) => {
              const user = userData?.data?.find(
                (item) => item.id === value,
              )
              return userIsLoading ? (
                <>Loading...</>
              ) : (
                <Link onClick={(e) => e.stopPropagation()} to={`/users/show/${user?.id}`}>{`${user?.firstName} ${user?.lastName}`}</Link>
              )
            }
          }
        />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column dataIndex="status_color" title="Status Color" />
        <Table.Column
          dataIndex={["createdAt"]}
          title="Created At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["publishedAt"]}
          title="Published At"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="image"
          title="Image"
          render={(value: any[]) => (
            <>
              {value?.map((item, index) => (
                <ImageField
                  style={{ maxWidth: "100px" }}
                  value={item?.url}
                  key={index}
                />
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex="tags"
          title="Tags"
          render={(value: any[]) =>
            tagsIsLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <TagField
                    key={index}
                    value={
                      tagsData?.data?.find(
                        (resourceItems) =>
                          resourceItems.id === item,
                      )?.title
                    }
                  />
                ))}
              </>
            )
          }
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
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
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
