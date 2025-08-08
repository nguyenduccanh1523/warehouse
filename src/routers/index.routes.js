import React from "react";
import Default from "../layouts/default";
import { DefaultRouter } from "./default-roter.routes";
import { AdminRouters } from "./admin.routes";
import AdminLayout from "../layouts/admin";


export const IndexRouters = [
    {
        path: "/",
        element: <Default />,
        children: [
            ...DefaultRouter,
        ],
    },
    {
        path: "/",
        element: <AdminLayout />,
        children: [
            ...AdminRouters
        ]
    }

    
];
