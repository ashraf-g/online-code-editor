import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import moment from "moment";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { api } from "../api";

const SavedCode = () => {
  const [code, setCode] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const viewCode = async () => {
    try {
      setLoading(true);
      const id = user?.id;
      if (!id) {
        throw new Error("User ID not found in localStorage");
      }

      const response = await fetch(`${api}/viewcode/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch code");
      }

      const data = await response.json();
      setCode(data);
    } catch (error) {
      console.error("Error fetching code:", error);
      toast.error("Failed to fetch code");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    viewCode();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${api}/deletecode/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        // If deletion is successful, remove the code from state
        setCode(code.filter((item) => item._id !== id));
        toast.success("Code deleted successfully");
      } else {
        throw new Error(responseData.message || "Failed to delete code");
      }
    } catch (error) {
      console.error("Failed to delete the code:", error.message);
      toast.error("Error occurred while deleting code");
    }
  };

  const columns = [
    {
      name: "Date",
      selector: (row) => moment(row.date).format("YYYY-MM-DD"),
    },
    {
      name: "Language",
      selector: (row) => row.language,
    },
    {
      name: "Code",
      selector: (row) => row.code,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {/* <FaPencilAlt
            // style={{ marginRight: "0.5rem" }}
            onClick={() => {
              // Handle edit action
            }}
          /> */}
          <FaTrash
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="container">
        <h3>My Code</h3>
        {loading ? (
          <Spinner />
        ) : (
          <div className="table table-success table-striped">
            <DataTable columns={columns} data={code} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavedCode;
