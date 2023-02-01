import React from "react";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  AuthPage
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/reset.css";

import { dataProvider } from "./rest-data-provider";
import routerProvider from "@pankod/refine-react-router-v6";
import { ProductList } from "pages/products/list";
import { ProductEdit } from "pages/products/edit";
import { ProductShow } from "pages/products/show";
import { ProductCreate } from "pages/products/create";
import authProvider from "./authProvider";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      routerProvider={{
        ...routerProvider,
        routes: [
          { path: "/login", element: <AuthPage /> },
          {
            path: "/register",
            element: <AuthPage type="register" />,
          },
          {
            path: "/forgot-password",
            element: <AuthPage type="forgotPassword" />,
          },
          {
            path: "/update-password",
            element: <AuthPage type="updatePassword" />,
          },
        ],
      }}
      notificationProvider={notificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      LoginPage={AuthPage}
      authProvider={authProvider}
      resources={[
        {
          name: "products",
          list: ProductList,
          show: ProductShow,
          create: ProductCreate,
          edit: ProductEdit,
          canDelete: true,
        },
      ]}
    />
  );
}

export default App;
