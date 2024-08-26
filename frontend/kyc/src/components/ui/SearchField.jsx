import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchField = ({ searchTerm, handleSearchChange }) => {
  const handleClearSearch = () => {
    handleSearchChange({ target: { value: '' } });
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      value={searchTerm}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position="end">
            <IconButton onClick={handleClearSearch} edge="end" size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          borderRadius: "8px",
          
        }
      }}
    />
  );
};

export default SearchField;