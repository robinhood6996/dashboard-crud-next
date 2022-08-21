import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Link from 'next/link';


export const LatestData = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllData()
  }, [])

  const getAllData = () => {
    axios.get('https://www.djevents.se/API/api/Light/GetAll')
      .then(res => {
        setData(res.data);
      })
  }


  const handleDeleteData = (item) => {
    const confirm = window.confirm(`Are you sure to delete which contain Name : ${item?.name} & room : ${item?.room}`);
    if (confirm) {
      axios.delete(`https://www.djevents.se/API/api/Light/Delete?id=${item?.id}`)
        .then(res => {
          if (res?.status === 200) {
            alert('Item Deleted Successfully!');
            getAllData();
          }
        })
    } else {
      alert('Your data is safe!')
    }

  }



  return (<Card {...props}>
    <CardHeader title="Latest Data" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Id
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Room
              </TableCell>
              <TableCell sortDirection="desc">
                ClassName
              </TableCell>
              <TableCell sortDirection="desc">
                Serials
              </TableCell>
              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                hover
                key={item.id}
              >
                <TableCell>
                  {item.id}
                </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.room}
                </TableCell>
                <TableCell>
                  {item.className}
                </TableCell>
                <TableCell>
                  {item.serials}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={'warning'}
                    sx={{ mr: 2, cursor: 'pointer' }}
                  >
                    <Link href={{
                      pathname: "/updatedata",
                      query: item, // the data
                    }} >
                      Edit
                    </Link>
                  </SeverityPill>
                  <SeverityPill
                    color={'error'}
                    sx={{ mr: 2, cursor: 'pointer' }}
                    onClick={() => handleDeleteData(item)}
                  >
                    Delete
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      {/* <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button> */}
    </Box>
  </Card>)
};
