import React, { lazy } from "react";
const SearchTool = lazy(() => import("./../components/SearchTool"));

function Users(props: any) {
  return <SearchTool></SearchTool>;
}

export default Users;
