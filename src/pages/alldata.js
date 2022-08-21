import { Container } from '@mui/material';
import React from 'react';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { LatestData } from 'src/components/dashboard/latestdata';

const AllData = () => {
    return (
        <DashboardLayout>
            <Container sx={{ mt: 2 }}>
                <LatestData />
            </Container>
        </DashboardLayout>
    );
};

export default AllData;