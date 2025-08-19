import LoaderSpinner from '@/Components/shared/Loaders/Loader';
import TableDashboard from '@/Components/TableDashboard';
import { getAllVendorsApplications } from '@/Redux/slices/vendorDashboardSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function VendorsApplications() {
    const dispatch = useDispatch();


    const { list: vendorDashboard, loading, error } = useSelector((state) => state.vendorDashboard);


    useEffect(() => {
        dispatch(getAllVendorsApplications());
    }, [dispatch]);

    const filteredVendors = (vendorDashboard || []).map((v) => ({
        id: v.id,
        businessName: v.businessName,
        businessType: v.businessType,
        website: v.websiteSocialLinks,
        address: v.businessAddress,
        contactName: v.contactDetails?.fullName,
        email: v.contactDetails?.email,
        phone: v.contactDetails?.phone,
        categories: v.productServiceDetails?.categories?.join(", "),
        nutritionalInfo: v.productServiceDetails?.providesNutritionalInfo,
        healthCertificate: v.healthcertificatesLink ? "Available" : "Not Provided",
    }));
    if (loading) return <LoaderSpinner />;
    if (error) return <p>Error: {error}</p>;
    return (
        <TableDashboard data={filteredVendors} type="vendorApplications" />
    )
}

export default VendorsApplications