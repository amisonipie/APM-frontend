import { usersIcon } from "assets/icons/svgIcons";

export default [
  {
    id: "user",
    title: "Users",
    icon: usersIcon,
    // type: "collapse",
    type: "item",
    navLink: "/users",
    pageTitle: "Users List",
    permissions: ["super_admin", "site_admin", "organization_admin"],
    // children: [
    //   {
    //     id: "userList",
    //     title: "List",
    //     icon: listIcon,
    //     navLink: "/users",
    //     pageTitle: "Users List",
    //     type: "item",
    //     permissions: ["site_admin"],
    //   },
    // ],
  },
];
