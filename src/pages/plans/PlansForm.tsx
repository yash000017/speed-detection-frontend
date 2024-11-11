import "./plans.scss";
import { Box, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommonInput from "../../components/input/InputField";
import BreadCrumbs from "../../components/breadcrumbs/BreadCrumbs";
import axiosInstance from "../../services/axiosInstance";
import CommonButton from "../../components/button/Button";
import { notify } from "../../utils/toast";

const breadCrumbsArr = [
  {
    title: "Plan Form",
    link: null,
  },
  {
    title: "Home",
    link: "/home",
  },
  {
    title: "Plans",
    link: "/plans",
  },
  {
    title: "Plan Form",
    link: "/plans/plan-form",
  },
];

// Validation schema for form fields using Yup
const validationSchema = Yup.object().shape({
  planName: Yup.string().max(15, "Plan description cannot exceed 15 characters").required("Plan name is required"),
  planRate: Yup.number()
    .typeError("Plan rate must be a number")
    .max(5, "Plan rate cannot exceed 5 characters")
    .required("Plan rate is required"),
  ballCount: Yup.number()
    .typeError("Ball count must be a number")
    .max(4, "Ball count cannot exceed 4 characters")
    .required("Ball count is required"),
  planDescription: Yup.string().max(50, "Plan description cannot exceed 50 characters").required("Plan description is required"),
});

const PlansForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get the ID from the route parameters
  const [loading, setLoading] = useState(false);

  const initialValues = {
    planName: "",
    planRate: "",
    ballCount: "",
    planDescription: "",
  };

  const [formValues, setFormValues] = useState<typeof initialValues>(initialValues);

  // Fetch plan details if an ID is present in the route
  useEffect(() => {
    if (id) {
      const fetchPlanDetails = async () => {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/plans/${id}`);
          const { planName, planRate, ballCount, planDescription } = response?.data?.data;
          setFormValues({
            planName: planName || "",
            planRate: planRate || "",
            ballCount: ballCount || "",
            planDescription: planDescription || "",
          });
        } catch (error) {
          console.error("Error fetching plan details:", error);
          alert("Failed to fetch plan details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchPlanDetails();
    }
  }, [id]);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      let response;
      if (id) {
        // Update existing plan if ID is present
        response = await axiosInstance.put(`/plans/${id}`, values);
      } else {
        // Create a new plan if no ID is present
        response = await axiosInstance.post("/plans", values);
      }

      // Navigate back to the plans list after successful submission
      if (response.data.status === "true") {
        notify(id ? "Plan updated successfully!" : "Plan created successfully!", 'success');
        navigate("/plans");
      } else {
        notify(id ? "An error occurred while updating the plan." : "An error occurred while creating the plan.", 'error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      notify("An error occurred while saving the plan.", 'error'); // Show generic error toast
    }
  };

  return (
    <>
      <Formik
        initialValues={formValues}
        enableReinitialize // Reinitialize form values when `formValues` changes
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ handleSubmit, errors, touched, handleChange, handleBlur, values }) => (
          <Form>
            <Box className="plan-form-container">
              <Box className="plan-form-header">
                <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
                <CommonButton type="submit" onClick={handleSubmit} disabled={loading}>
                  {id ? "Update" : "Save"}
                </CommonButton>
              </Box>

              <Box className="plan-form-outer-wrapper">
                <Box>
                  <Typography variant="h6" style={{ marginBottom: "20px", color: "black" }}>
                    {id ? "Edit Plan" : "Add New Plan"}
                  </Typography>
                </Box>

                <Box className="plan-form-wrapper">
                  <Field
                    name="planName"
                    as={CommonInput}
                    label="Plan Name"
                    placeholder="Enter plan name"
                    width="32%"
                    required
                    value={values.planName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.planName && Boolean(errors.planName)}
                    helperText={touched.planName && errors.planName}
                  />
                  <Field
                    name="planRate"
                    as={CommonInput}
                    label="Plan Rate"
                    placeholder="Enter plan rate"
                    width="32%"
                    type="number"
                    required
                    value={values.planRate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.planRate && Boolean(errors.planRate)}
                    helperText={touched.planRate && errors.planRate}
                  />
                  <Field
                    name="ballCount"
                    as={CommonInput}
                    label="Ball Count"
                    placeholder="Enter ball count"
                    width="32%"
                    type="number"
                    required
                    value={values.ballCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.ballCount && Boolean(errors.ballCount)}
                    helperText={touched.ballCount && errors.ballCount}
                  />
                  <Field
                    name="planDescription"
                    as={CommonInput}
                    label="Plan Description"
                    placeholder="Enter plan description"
                    width="32%"
                    required
                    value={values.planDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.planDescription && Boolean(errors.planDescription)}
                    helperText={touched.planDescription && errors.planDescription}
                  />
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PlansForm;
