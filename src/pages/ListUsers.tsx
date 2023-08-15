import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cell, Column, Row, defaultTheme, Provider, TableView, TableBody, TableHeader, Content } from "@adobe/react-spectrum";

interface UserData {
  name: string;
  email: string;
  picture: string;
}

interface UserTableProps {
  data: UserData[] | null;
}

function ListUsers() {
  const navigate = useNavigate();
  // State to store the fetched data
  const [data, setData] = useState<UserData[] | null>(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const TableView_: React.FC<UserTableProps> = ({ data }) => {
    if (!data || data.length === 0) {
      return <div>Hello</div>;
    }
    // else return <pre>{JSON.stringify(data)}</pre>;
    // const data1 = [{ name: 1, email: 3, picture: 7 }];
    return (
      <TableView width="75%" aria-label="Example table with static contents">
        <TableHeader>
          <Column>Name</Column>
          <Column>Email</Column>
          <Column align="end">Profile</Column>
        </TableHeader>
        <TableBody>
          {data.map((item: any) => (
            <Row key={item.email}>
              <Cell>{item.name}</Cell>
              <Cell>{item.email}</Cell>
              <Cell>
                <img src={item.picture} alt={item.name} style={{ width: "40px", height: "40px" }} />
              </Cell>
            </Row>
          ))}
        </TableBody>
      </TableView>
    );
  };

  const fetchUsers = async () => {
    const response: any = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/api/v1/protected/get/users`, { withCredentials: true }).catch(err => {
      console.log("not authnticated user....");
    });

    if (response && response.data) {
      setLoading(false);
      const data: UserData[] = await response.data;

      setData(data);
      console.log(response.data);
      return response.data;
    } else {
      setLoading(false);
      setError(response);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    return (
      <Provider theme={defaultTheme}>
        <TableView_ data={data}></TableView_>
      </Provider>
    );
  }
}

export default ListUsers;
