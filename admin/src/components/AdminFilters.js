import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Collapse,
  Button,
  useTheme
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

const AdminFilters = ({
  filters = [],
  values = {},
  onChange,
  onClear,
  title = 'Filters',
  expanded = false,
  onExpand,
  elevation = 0,
  sx = {}
}) => {
  const theme = useTheme();

  const handleChange = (id, value) => {
    onChange?.(id, value);
  };

  const handleClear = () => {
    onClear?.();
  };

  const renderFilter = (filter) => {
    switch (filter.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={filter.label}
            value={values[filter.id] || ''}
            onChange={(e) => handleChange(filter.id, e.target.value)}
            placeholder={filter.placeholder}
            InputProps={{
              startAdornment: filter.startIcon,
              endAdornment: filter.endIcon
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth>
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={values[filter.id] || ''}
              label={filter.label}
              onChange={(e) => handleChange(filter.id, e.target.value)}
              sx={{ 
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider'
                }
              }}
            >
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            fullWidth
            label={filter.label}
            type="date"
            value={values[filter.id] || ''}
            onChange={(e) => handleChange(filter.id, e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            label={filter.label}
            type="number"
            value={values[filter.id] || ''}
            onChange={(e) => handleChange(filter.id, e.target.value)}
            InputProps={{
              startAdornment: filter.startIcon,
              inputProps: { 
                min: filter.min,
                max: filter.max,
                step: filter.step
              }
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={elevation}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        ...sx
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon color="action" />
          <Typography variant="subtitle1" fontWeight={500}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onClear && (
            <Tooltip title="Clear Filters">
              <IconButton 
                size="small" 
                onClick={handleClear}
                disabled={Object.keys(values).length === 0}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={expanded ? 'Collapse' : 'Expand'}>
            <IconButton size="small" onClick={onExpand}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Filters */}
      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {filters.map((filter) => (
              <Grid item xs={12} sm={6} md={4} key={filter.id}>
                {renderFilter(filter)}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AdminFilters; 