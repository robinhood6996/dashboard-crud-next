import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { DashboardLayout } from 'src/components/dashboard-layout';
import { UpdateForm } from 'src/components/Forms/UpdateForm';

const UpdateHue = () => {
    const router = useRouter();
    const data = router.query;
    console.log('update', data);

    useEffect(() => {

    }, [data])

    return (
        <>
            <DashboardLayout>
                <Container sx={{ mt: 5 }}>
                    <UpdateForm data={data} />
                </Container>
            </DashboardLayout>
        </>
    );
};

export default UpdateHue;