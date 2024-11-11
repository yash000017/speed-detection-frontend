import "./plans.scss";
import { Box } from "@mui/material";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import CommonButton from "../../components/button/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import CustomTable from "../../components/table/Table";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/dialog/Dialog";
import { notify } from "../../utils/toast";
import { PlanData } from "../../types/types";

export interface EditPlan extends PlanData {
    [key: string]: any;
}  

const Plans: React.FC = () => {
    const navigate = useNavigate(); 
    const [data, setData] = useState<PlanData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [selectedPlan, setSelectedPlan] = useState<EditPlan | null>(null);
      const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({}); // State for filters

    const breadCrumbsArr = [
      { title: "Plan Management", link: null },
      { title: "Home", link: "/home" },
      { title: "Plans", link: "/plans" },
      { title: "Plan Form", link: "/plans/plan-form" },
    ];
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const sortField = sortConfig?.key || 'createdAt';
        const sortOrder = sortConfig?.direction || 'asc';
  
        const response = await axiosInstance.get(`/plans`, {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            sortField,
            sortOrder,
            filters: JSON.stringify(filters), // Pass filters as JSON string
          },
        });
  
        if (response.data && response.data.status === "true") {
          const { data: users, pagination } = response.data;
          setData(users);
          setTotalItems(pagination?.totalItems || 0);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };    

    const handleDeleteConfirmation = (row: EditPlan): Promise<void> => {
        return new Promise((resolve) => {
            setSelectedPlan(row);
            setConfirmDialogOpen(true);
            resolve();
        });
    };
    

    const handleDelete = async () => {
        if (!selectedPlan) return;
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/plans/${selectedPlan.planId}`);
            if (response.data && response.data.status === "true") {
                notify("Plan deleted successfully!", 'success');
                setData((prevData) => prevData.filter((item) => item.planId !== selectedPlan.planId));
                fetchData();
            } else {
                notify("Plan deleted successfully!", 'error');
                console.error('Unexpected response format:', response.data);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete the item. Please try again later.');
        } finally {
            setLoading(false);
            setConfirmDialogOpen(false);
            setSelectedPlan(null);
        }
    };

    const handleEdit = async (row: EditPlan) => {
        setLoading(true);
        try {
          const id = row.planId;
          navigate(`/plan-form/${id}`);
        } catch (error) {
            console.error('Error navigating :', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
      fetchData();
    }, [page, rowsPerPage, sortConfig, filters]);
  
    const columns = [
      { id: 'planName' as keyof PlanData, label: 'Plan Name', sortable: true, filterable: true },
      { id: 'planRate' as keyof PlanData, label: 'Rate', sortable: true, filterable: true },
      { id: 'ballCount' as keyof PlanData, label: 'Ball Count', sortable: true, filterable: true },
      { id: 'planDescription' as keyof PlanData, label: 'Description', sortable: false, filterable: true },
    ];
    
    return (
        <Box className="user-container">
            <Box className="user-header">
                <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
                <CommonButton onClick={() => navigate("/plans/plan-form")} type="submit">Add Plan</CommonButton>
            </Box>
            <Box className="user-table">
                <h2>Plans Management</h2>
                <CustomTable
                    data={data}
                    columns={columns}
                    loading={loading}
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalItems={totalItems}
                    handleDelete={handleDeleteConfirmation} // Pass the confirmation handler
                    handleEdit={handleEdit}
                    sortConfig={sortConfig} 
                    setSortConfig={setSortConfig}
                    filters={filters} 
                    setFilters={setFilters}
                />
            </Box>

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
              open={confirmDialogOpen}
              onClose={() => setConfirmDialogOpen(false)}
              onConfirm={handleDelete}
              message="Are you sure you want to delete this plan?"
            />
        </Box>
    );
};

export default Plans;
