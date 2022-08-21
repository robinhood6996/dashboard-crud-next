import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios'

export const UpdateForm = (props) => {
    const [values, setValues] = useState({});
    const [data, setData] = useState([]);
    const [name, setName] = useState(null);
    const [room, setRoom] = useState(null);
    const [className, setClassName] = useState(null);
    const [serials, setSerials] = useState('');
    console.log('props', props);

    useEffect(() => {
        setName(props?.data?.name)
        setRoom(props?.data?.room)
        setClassName(props?.data?.className)
    }, [props?.data])

    const handleSubmitForm = () => {

        if (name === null || room === null || className === null || name === undefined) {
            alert('Please provide all data');
            console.log('data', values)
        } else {
            let body = {
                id: props?.data?.id,
                name,
                room,
                className,
                serials
            }
            axios.patch('https://www.djevents.se/API/api/Light/Update', body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'text/plain'
                }
            }).then(res => {
                alert('Item updated successfully!')
            }).then(() => {
                setName('')
                setRoom(null)
                setClassName(null)
            })
        }

    }


    useEffect(() => {
        getAllData()
    }, [])

    const getAllData = () => {
        let room = [];
        let className = [];
        axios.get('https://www.djevents.se/API/api/Light/GetAll')
            .then(res => {
                setData(res.data);
                res?.data?.map(item => {
                    if (item?.room) {
                        room = [...room, item?.room]
                    }
                    if (item?.className) {
                        className = [...className, item?.className]
                    }
                })
            });

    }

    return (

        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Update"
                />
                <Divider />
                <CardContent>

                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the name"
                                label="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <FormControl sx={{ m: 1, minWidth: '50%' }}
                                size="large">
                                <label id="demo-select-small">Room</label>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Room"
                                    name="room"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                >
                                    {/* <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem> */}
                                    {
                                        data?.map(item => {
                                            return <MenuItem selected={item?.room === room}
                                                value={item?.room}
                                                key={item?.id}>
                                                {item?.room}
                                            </MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <FormControl sx={{ m: 1, minWidth: '50%' }}
                                size="large">
                                <label id="demo-select-small">ClassName</label>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    label="Class Name"
                                    name="className"
                                    value={className}
                                    onChange={(e) => setClassName(e.target.value)}
                                >
                                    {/* <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem> */}
                                    {
                                        data?.map(item => {
                                            if (item?.className !== undefined && item?.className !== null && item?.className !== '') {
                                                return <MenuItem value={item?.className}
                                                    key={item?.id}
                                                    selected={item?.className === className}
                                                >

                                                    {item?.className}
                                                </MenuItem>
                                            } else {
                                                return <></>
                                            }
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>


                    </Grid>

                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleSubmitForm()}
                    >
                        Update
                    </Button>
                </Box>
            </Card>
        </form>
    );
};
