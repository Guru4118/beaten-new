import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

// Static data for existing codes
const existingCodes = [
  {
    id: '1',
    code: 'SUMMER2024',
    type: 'coupon',
    discount: 20,
    minPurchase: 100,
    validFrom: '2024-06-01',
    validUntil: '2024-08-31',
    usageLimit: 1000,
    usedCount: 450,
    status: 'active'
  },
  {
    id: '2',
    code: 'WELCOME10',
    type: 'coupon',
    discount: 10,
    minPurchase: 50,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 5000,
    usedCount: 2345,
    status: 'active'
  },
  {
    id: '3',
    code: 'SCRATCH001',
    type: 'scratch',
    discount: 15,
    validFrom: '2024-05-01',
    validUntil: '2024-05-31',
    usageLimit: 100,
    usedCount: 75,
    status: 'active'
  }
];

function Promotions() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [codeType, setCodeType] = useState('coupon');
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    discount: '',
    minPurchase: '',
    validFrom: '',
    validUntil: '',
    usageLimit: '',
    quantity: '1'
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      discount: '',
      minPurchase: '',
      validFrom: '',
      validUntil: '',
      usageLimit: '',
      quantity: '1'
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateCode = () => {
    const codes = [];
    const quantity = parseInt(formData.quantity);
    
    for (let i = 0; i < quantity; i++) {
      const code = codeType === 'coupon' 
        ? generateCouponCode()
        : generateScratchCode();
      
      codes.push({
        id: Date.now() + i,
        code,
        type: codeType,
        discount: parseInt(formData.discount),
        minPurchase: parseInt(formData.minPurchase),
        validFrom: formData.validFrom,
        validUntil: formData.validUntil,
        usageLimit: parseInt(formData.usageLimit),
        usedCount: 0,
        status: 'active'
      });
    }
    
    setGeneratedCodes(codes);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const generateScratchCode = () => {
    const chars = '0123456789';
    let code = '';
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  const handleDownloadCodes = () => {
    const csvContent = generatedCodes.map(code => 
      `${code.code},${code.type},${code.discount}%,${code.minPurchase},${code.validFrom},${code.validUntil},${code.usageLimit}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${codeType}_codes_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
        return 'error';
      case 'used':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Promotions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Generate Codes
        </Button>
      </Box>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Codes generated successfully!
        </Alert>
      )}

      {generatedCodes.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Generated Codes
            </Typography>
            <Button
              startIcon={<DownloadIcon />}
              onClick={handleDownloadCodes}
            >
              Download CSV
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Min Purchase</TableCell>
                  <TableCell>Valid Until</TableCell>
                  <TableCell>Usage Limit</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {generatedCodes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell>{code.code}</TableCell>
                    <TableCell>
                      <Chip
                        label={code.type}
                        color={code.type === 'coupon' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{code.discount}%</TableCell>
                    <TableCell>${code.minPurchase}</TableCell>
                    <TableCell>{code.validUntil}</TableCell>
                    <TableCell>{code.usageLimit}</TableCell>
                    <TableCell>
                      <Tooltip title="Copy Code">
                        <IconButton size="small" onClick={() => handleCopyCode(code.code)}>
                          <CopyIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Min Purchase</TableCell>
                <TableCell>Valid From</TableCell>
                <TableCell>Valid Until</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {existingCodes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((code) => (
                  <TableRow key={code.id}>
                    <TableCell>{code.code}</TableCell>
                    <TableCell>
                      <Chip
                        label={code.type}
                        color={code.type === 'coupon' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{code.discount}%</TableCell>
                    <TableCell>${code.minPurchase}</TableCell>
                    <TableCell>{code.validFrom}</TableCell>
                    <TableCell>{code.validUntil}</TableCell>
                    <TableCell>{code.usedCount}/{code.usageLimit}</TableCell>
                    <TableCell>
                      <Chip
                        label={code.status}
                        color={getStatusColor(code.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={existingCodes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Generate {codeType === 'coupon' ? 'Coupon' : 'Scratch'} Codes</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Code Type</InputLabel>
                <Select
                  value={codeType}
                  label="Code Type"
                  onChange={(e) => setCodeType(e.target.value)}
                >
                  <MenuItem value="coupon">Coupon Code</MenuItem>
                  <MenuItem value="scratch">Scratch Code</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount Percentage"
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleFormChange}
                InputProps={{ inputProps: { min: 1, max: 100 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Purchase Amount"
                type="number"
                name="minPurchase"
                value={formData.minPurchase}
                onChange={handleFormChange}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valid From"
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Valid Until"
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Usage Limit"
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleFormChange}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Number of Codes"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleFormChange}
                InputProps={{ inputProps: { min: 1, max: 100 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={generateCode}>
            Generate Codes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Promotions; 