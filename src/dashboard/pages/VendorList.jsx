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
        id: v.id,
        businessName: v.name,
        // businessType: v.businessType,
        // website: v.websiteSocialLinks,
        address: v.address,
        // contactName: v.contactDetails?.fullName,
        email: v.email,
        phone: v.phone,
        // categories: v.productServiceDetails?.categories?.join(", "),
        // nutritionalInfo: v.productServiceDetails?.providesNutritionalInfo,
        // healthCertificate: v.healthcertificatesLink ? "Available" : "Not Provided",
    }));
    if (loading) return <LoaderSpinner />;
    if (error) return <p>Error: {error}</p>;
    return (
        <TableDashboard data={filteredVendors} type="vendors" />
    )
}

export default VendorList