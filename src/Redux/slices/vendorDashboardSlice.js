import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../Network/interceptors";

//  Get all vendors
export const getAllVendors = createAsyncThunk(
  "vendors/vendorRegistrations",
  async () => {
    const response = await axiosInstance.get(`/vendors`);
    return response.data;
  }
);

//  Get vendor by ID
export const getVendorById = createAsyncThunk(
  "vendors/getVendorById",
  async (vendorId) => {
    const response = await axiosInstance.get(`/vendors/${vendorId}`);
    return response.data;
  }
);

//  Remove vendor by ID
export const removeVendorById = createAsyncThunk(
  "vendors/removeVendorById",
  async (vendorId) => {
    await axiosInstance.delete(`/vendors/${vendorId}`);
    return vendorId;
  }
);

//  Get all vendor applications
export const getAllVendorsApplications = createAsyncThunk(
  "vendors/getAllVendorsApplications",
  async () => {
    const response = await axiosInstance.get(`/vendorRegistrations`);
    return response.data;
  }
);

//  Remove vendor application by ID
export const removeVendorApplicationById = createAsyncThunk(
  "vendors/removeVendorApplicationById",
  async (applicationId) => {
    await axiosInstance.delete(`/vendorApplications/${applicationId}`);
    return applicationId;
  }
);

//  Accept vendor (remove from applications + add to vendors)
export const acceptVendor = createAsyncThunk(
  "vendors/acceptVendor",
  async (vendor, { dispatch }) => {
    // 1. Add vendor to vendors
    const res = await axiosInstance.post(`/vendors`, vendor);

    // 2. Remove vendor from applications
    if (vendor.id) {
      await axiosInstance.delete(`/vendorApplications/${vendor.id}`);
    }

    // Refresh both lists
    dispatch(getAllVendors());
    dispatch(getAllVendorsApplications());

    return res.data;
  }
);

const vendorDashboardSlice = createSlice({
  name: "vendors",
  initialState: {
    list: [], // ✅ accepted vendors
    applications: [], // ✅ pending applications
    currentVendor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get all vendors
      .addCase(getAllVendors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Get vendor by ID
      .addCase(getVendorById.fulfilled, (state, action) => {
        state.currentVendor = action.payload;
      })

      // ✅ Remove vendor by ID
      .addCase(removeVendorById.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (vendor) => vendor.id !== action.payload
        );
      })

      // ✅ Get all vendor applications
      .addCase(getAllVendorsApplications.fulfilled, (state, action) => {
        state.applications = action.payload;
      })

      // ✅ Remove vendor application
      .addCase(removeVendorApplicationById.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          (app) => app.id !== action.payload
        );
      })

      // ✅ Accept vendor
      .addCase(acceptVendor.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.applications = state.applications.filter(
          (app) => app.id !== action.payload.id
        );
      });
  },
});

export default vendorDashboardSlice.reducer;
