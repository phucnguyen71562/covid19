import { Close } from '@mui/icons-material';
import { DialogTitle, IconButton } from '@mui/material';

export interface CustomDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function CustomDialogTitle(props: CustomDialogTitleProps) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default CustomDialogTitle;
