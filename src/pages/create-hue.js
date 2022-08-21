import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { HueForm } from 'src/components/Forms/Form';

const Account = () => (
    <>
        <Head>
            <title>
                Create Hue
            </title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Hue Collection
                </Typography>
                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        item
                        lg={12}
                        md={12}
                        xs={12}
                    >
                        <HueForm />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);

Account.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Account;
