import LoaderSpinner from '@/Components/shared/Loaders/Loader';
import TableDashboard from '@/Components/TableDashboard';
import { getAllVendors } from '@/Redux/slices/vendorDashboardSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function VendorList() {
    const dispatch = useDispatch();

    // نجيب الـ state من الـ slice
    const { list: vendorDashboard, loading, error } = useSelector((state) => state.vendorDashboard);

    // نعمل dispatch للـ fetchProducts أول ما الكومبوننت يركب
    useEffect(() => {
        dispatch(getAllVendors());
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
        <TableDashboard data={filteredVendors} type="vendors" />
    )
}

export default VendorList