import LoaderSpinner from '@/Components/shared/Loaders/Loader';
import TableDashboard from '@/Components/TableDashboard';
import { getAllVendors } from '@/Redux/slices/vendorDashboardSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function VendorList() {
    const dispatch = useDispatch();


    const { list: vendorDashboard, loading, error } = useSelector((state) => state.vendorDashboard);


    useEffect(() => {
        dispatch(getAllVendors());
    }, [dispatch]);

    const filteredVendors = (vendorDashboard || []).map((v) => ({
        // id: v.id,
        // businessName: v.name,

        // address: v.address,

        // email: v.email,
        // phone: v.phone,
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
        <TableDashboard data={filteredVendors} type="vendors" />
    )
}

export default VendorList