import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserForm from "./user-form";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalUser({ dataUser, context, openModal, handleCloseModal, newUser }: any) {
    
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Stack sx={{ mb: 4 }}>
                    <Typography variant="h4">User</Typography>
                </Stack>
                
                <UserForm dataUser={dataUser} context={context} newUser={ newUser } handleCloseModal={ handleCloseModal } />
            </Box>
        </Modal>
    )
}