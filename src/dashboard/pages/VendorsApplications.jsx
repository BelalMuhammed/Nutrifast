import LoaderSpinner from '@/Components/shared/Loaders/Loader';
import TableDashboard from '@/Components/TableDashboard';
import { getAllVendorsApplications } from '@/Redux/slices/vendorDashboardSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function VendorsApplications() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { applications: vendorDashboard, loading, error } = useSelector((state) => state.vendorDashboard);

    useEffect(() => {
        dispatch(getAllVendorsApplications());
    }, [dispatch, location.pathname]);

    const filteredVendors = (vendorDashboard || []).map((v) => ({
        id: v.id,
        businessName: v.businessName,
        businessType: v.businessType,
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
        phone: v.phone,
        businessAddress: v.businessAddress,
        page: v.page,
        licenseUrl: v.licenseUrl
    }));
    if (loading) return <LoaderSpinner />;
    if (error) return <p>Error: {error}</p>;

    return (
        <TableDashboard data={filteredVendors} type="vendorApplications" />
    )
}

export default VendorsApplications