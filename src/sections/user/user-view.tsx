import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar/scrollbar';

import TableNoData from './table-no-data';
import UserTableRow from './user-table-row';
import UserTableHead from './user-table-head';
import TableEmptyRows from './table-empty-rows';
import UserTableToolbar from './user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from './utils';
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, Row, useReactTable } from '@tanstack/react-table';
import ModalUser from './modal-user';

// ----------------------------------------------------------------------

type User = {
  id: number
  name: Name
  email: string
  phone: string
  address: Address
  context: string
}

type Name = {
  firstname: string
  lastname: string
}

type Address = {
  city: string
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name.firstname', {
    header: 'Name',
  }),
  columnHelper.accessor(row => row.name.lastname, {
    header: 'Lastname',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
  }),
  columnHelper.accessor('address.city', {
    header: 'City',
  })
]

export default function UserPage() {
  const initialUser: User = {
    id: 0,
    "email": "",
    "name": {
      "firstname": "",
      "lastname": ""
    },
    "address": {
      "city": "",
    },
    "phone": "",
    "context": ""
  }
  const [data, setData] = useState([initialUser]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name.firstname');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterName, setFilterName] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const dataUser = { firstname: '', lastname: '', id: 0, email: '', phone: '', city: '' }
  const context = "create"

  useEffect(() => {
    fetch("https://fakestoreapi.com/users?limit=10")
      .then((response) => response.json())
      .then((data: any) => {
        // console.log(data)
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filterName
    },
    onGlobalFilterChange: setFilterName
  })

  const columnsName = table.getHeaderGroups().flatMap((headerGroup: any) =>
    headerGroup.headers.map((header: any) => {
      return {
        id: header.id,
        label: header.column.columnDef.header
      }
    })
  );
  columnsName.push({ id: '' })

  const handleSort = (event:any, id: any) => {
    console.log(event)
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds: any = data.map((n: User) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event:any, name: never) => {
    console.log(event)
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event:any, newPage: any) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true)
  };
  const handleCloseModal = () => {
    setOpenModal(false)
  };

  const newUser = (newData: User, context: string) => {
    if (context == "update") {
      const newUsers = data.map(user => {
        if (user.id === newData.id) {
          return newData ;
        } else {
          return user;
        }
      });
      setData(newUsers)
    } else if (context == "create") {
      setData(prev => [...prev, newData])
    } else {
      const newUsers = data.filter(item => item.id != newData.id)
      setData(newUsers)
    }
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleOpenModal()}>
          New User
        </Button>
      </Stack>

      <ModalUser dataUser={dataUser} context={context} openModal={openModal} handleCloseModal={handleCloseModal} newUser={ newUser } />

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={columnsName}
              />
              <TableBody>
                {
                  table.getRowModel().rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Row<User>) => (
                    <UserTableRow
                      key={row.id}
                      rowData={row}
                      newUser={ newUser }
                      selected={selected.indexOf(row.original.id as never) !== -1}
                      handleClick={(e) => handleClick(e, row.original.id as never)}
                    />
                  ))
                }

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
