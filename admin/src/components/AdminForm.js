import React from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  useTheme
} from '@mui/material';

const AdminForm = ({
  fields = [],
  values = {},
  errors = {},
  onChange,
  spacing = 2,
  sx = {}
}) => {
  const theme = useTheme();

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    onChange(field.name, value);
  };

  const renderField = (field) => {
    const commonProps = {
      fullWidth: true,
      label: field.label,
      value: values[field.name] || '',
      onChange: handleChange(field),
      error: Boolean(errors[field.name]),
      helperText: errors[field.name],
      disabled: field.disabled,
      required: field.required,
      placeholder: field.placeholder,
      size: field.size || 'medium',
      sx: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 1
        },
        ...field.sx
      }
    };

    switch (field.type) {
      case 'select':
        return (
          <FormControl
            key={field.name}
            fullWidth
            error={Boolean(errors[field.name])}
            required={field.required}
            disabled={field.disabled}
            sx={field.sx}
          >
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={values[field.name] || ''}
              onChange={handleChange(field)}
              label={field.label}
              size={field.size || 'medium'}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors[field.name] && (
              <FormHelperText>{errors[field.name]}</FormHelperText>
            )}
          </FormControl>
        );

      case 'multiline':
        return (
          <TextField
            key={field.name}
            multiline
            rows={field.rows || 4}
            {...commonProps}
          />
        );

      case 'number':
        return (
          <TextField
            key={field.name}
            type="number"
            inputProps={{
              min: field.min,
              max: field.max,
              step: field.step
            }}
            {...commonProps}
          />
        );

      case 'password':
        return (
          <TextField
            key={field.name}
            type="password"
            {...commonProps}
          />
        );

      case 'text':
      default:
        return (
          <TextField
            key={field.name}
            type="text"
            {...commonProps}
          />
        );
    }
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <Grid container spacing={spacing}>
        {fields.map((field) => (
          <Grid
            key={field.name}
            item
            xs={12}
            sm={field.gridSize?.sm || 12}
            md={field.gridSize?.md || 6}
            lg={field.gridSize?.lg || 4}
          >
            {field.section && (
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                  color: 'text.secondary',
                  fontWeight: 500
                }}
              >
                {field.section}
              </Typography>
            )}
            {renderField(field)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminForm; 