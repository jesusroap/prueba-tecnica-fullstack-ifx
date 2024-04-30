import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from '../../components/iconify';
import ModalUser from './modal-user';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  rowData,
  handleClick,
  newUser
}: any) {
  // const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState({ firstname: '', lastname: '', id: 0 })
  const [context, setContext] = useState("")
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (data: any) => {
    setOpenModal(true)
    const dataU = {
      firstname: data.name.firstname,
      lastname: data.name.lastname,
      email: data.email,
      phone: data.phone,
      city: data.address.city,
      id: data.id
    }
    setDataUser(dataU)
    setContext("update")
  };
  const handleCloseModal = () => {
    setOpenModal(false)
    setAnchorEl(null)
  };

  const deleteUser = (data: any, context: string) => {
    fetch("https://fakestoreapi.com/users/" + data.id, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((data: any) => {
        newUser(data, context)
        setAnchorEl(null)
        console.log("ELiminación Exitosa", data)
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        {rowData.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id}>{cell.getValue()}</TableCell>
        ))}

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        {/* <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleOpenModal(rowData.original)}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => deleteUser(rowData.original, 'delete')} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <ModalUser dataUser={dataUser} context={context} openModal={openModal} handleCloseModal={handleCloseModal} newUser={newUser} />
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  rowData: PropTypes.any,
  selected: PropTypes.any,
  newUser: PropTypes.any
};
