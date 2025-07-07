import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import {
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const AdminCard = ({
  title,
  subtitle,
  avatar,
  action,
  children,
  footer,
  elevation = 1,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={elevation}
      sx={{
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx
      }}
    >
      {(title || subtitle || avatar || action) && (
        <CardHeader
          avatar={avatar}
          action={
            action || (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              {title}
            </Typography>
          }
          subheader={
            subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mt: 0.5
                }}
              >
                {subtitle}
              </Typography>
            )
          }
          sx={{
            px: 3,
            py: 2,
            '& .MuiCardHeader-content': {
              overflow: 'hidden'
            }
          }}
        />
      )}

      <CardContent
        sx={{
          p: 3,
          flex: 1,
          '&:last-child': {
            pb: 3
          }
        }}
      >
        {children}
      </CardContent>

      {footer && (
        <CardActions
          sx={{
            px: 3,
            py: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          {footer}
        </CardActions>
      )}
    </Card>
  );
};

export default AdminCard; 