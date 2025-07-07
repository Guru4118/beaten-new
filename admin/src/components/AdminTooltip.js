import React from 'react';
import {
  Tooltip,
  useTheme
} from '@mui/material';

const AdminTooltip = ({
  title,
  children,
  placement = 'top',
  arrow = true,
  enterDelay = 200,
  leaveDelay = 0,
  sx = {},
  ...props
}) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow={arrow}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: theme.shadows[2],
            fontSize: '0.875rem',
            borderRadius: 1,
            p: 1,
            ...sx
          }
        },
        arrow: {
          sx: {
            color: 'background.paper'
          }
        }
      }}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default AdminTooltip; 