import React from "react";
import Default from "../layouts/default";
import { DefaultRouter } from "./default-roter.routes";


export const IndexRouters = [
    {
        path: "/",
        element: <Default />,
        children: [
            ...DefaultRouter,
        ],
    },


];
