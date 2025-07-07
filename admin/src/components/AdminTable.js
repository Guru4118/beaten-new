import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Tooltip,
  IconButton,
  Typography,
  Chip,
  Avatar,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  FilterList as FilterIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon
} from '@mui/icons-material';

const AdminTable = ({
  title,
  columns,
  data,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  sortBy,
  sortDirection,
  loading = false,
  actions = [],
  filters = [],
  onFilterChange,
  onExport,
  onPrint,
  onEmail,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  elevation = 0,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={elevation}
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        ...sx
      }}
    >
      {/* Table Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {/* Search */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 2,
            py: 0.5
          }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.875rem',
                width: '200px'
              }}
            />
          </Box>

          {/* Actions */}
          {onExport && (
            <Tooltip title="Export">
              <IconButton onClick={onExport} size="small">
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          )}
          {onPrint && (
            <Tooltip title="Print">
              <IconButton onClick={onPrint} size="small">
                <PrintIcon />
              </IconButton>
            </Tooltip>
          )}
          {onEmail && (
            <Tooltip title="Send Email">
              <IconButton onClick={onEmail} size="small">
                <EmailIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Loading State */}
      {loading && (
        <LinearProgress sx={{ height: 2 }} />
      )}

      {/* Table */}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ 
                    minWidth: column.minWidth,
                    backgroundColor: theme.palette.background.paper
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortBy === column.id}
                      direction={sortBy === column.id ? sortDirection : 'asc'}
                      onClick={() => onSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {actions.length > 0 && (
                <TableCell 
                  align="right"
                  style={{ 
                    minWidth: 100,
                    backgroundColor: theme.palette.background.paper
                  }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                hover
                key={row.id || index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  
                  return (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.render ? (
                        column.render(value, row)
                      ) : column.type === 'avatar' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={value} alt={row.name} />
                          <Typography variant="body2">{row.name}</Typography>
                        </Box>
                      ) : column.type === 'chip' ? (
                        <Chip
                          label={value}
                          color={column.getChipColor?.(value) || 'default'}
                          size="small"
                          icon={column.getChipIcon?.(value)}
                          sx={{ 
                            fontWeight: 500,
                            '& .MuiChip-icon': {
                              color: 'inherit'
                            }
                          }}
                        />
                      ) : column.type === 'currency' ? (
                        <Typography variant="body2" fontWeight={500}>
                          ${value.toFixed(2)}
                        </Typography>
                      ) : (
                        <Typography variant="body2">
                          {value}
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
                {actions.length > 0 && (
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      {actions.map((action, index) => (
                        <Tooltip key={index} title={action.tooltip}>
                          <IconButton
                            size="small"
                            onClick={() => action.onClick(row)}
                            color={action.color}
                            disabled={action.disabled?.(row)}
                          >
                            {action.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      />
    </Paper>
  );
};

export default AdminTable; 