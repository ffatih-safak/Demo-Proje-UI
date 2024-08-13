import React, { useEffect, useState } from 'react';
import CustomDataGrid from '../components/DataGrid/CustomDataGrid';
import { GenericRequest } from '../network/RequestManager';
import REDIRECTION_STRINGS from '../common/Const/ConstRedirectionString';
import METHOD_TYPE from '../common/Enum/EnumMetodTypes';
import { useDispatch } from 'react-redux';
import { useSession } from "../network/useSession.jsx";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreateBuildingCommandRequest from '../models/RequestModels/CreateBuildingCommandRequest.js';

const Configuration = () => {
  const dispatch = useDispatch();
  const token = useSession();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [buildingCost, setBuildinCost] = useState('');
  const [constructionTime, setConstructionTime] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [buildingTypes, setBuildingTypes] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleChange = (event) => {
    setBuildingType(event.target.value);
  };

  const fetchConfiguration = async () => {
    let requestResponse = await GenericRequest({
      url: REDIRECTION_STRINGS.ConfigurationList,
      params: "",
      methodType: METHOD_TYPE.GET,
      dispatch: dispatch,
      token: token,
      toaster: false
    });

    if (requestResponse && requestResponse.data) {
      const excludedColumns = ['id', 'buildingTypeId'];
      const cols = Object.keys(requestResponse.data[0])
        .filter(key => !excludedColumns.includes(key))
        .map(key => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          flex: 1,
          editable: false,
        }));

      setColumns(cols);
      setRows(requestResponse.data);
    }
  };

  async function fetchBuildingTypes() {
    let requestResponse = await GenericRequest(
      {
        url: REDIRECTION_STRINGS.BuildinTypeList,
        params: "",
        methodType: METHOD_TYPE.GET,
        dispatch: dispatch,
        token: token,
        toaster: false
      }
    );
    if (requestResponse && requestResponse.data) {
      setBuildingTypes(requestResponse.data);
    }
  }
  useEffect(() => {
      fetchConfiguration();
      fetchBuildingTypes();
  }, []);

  useEffect(() => {
    if (shouldFetch) {
      fetchConfiguration();
      fetchBuildingTypes();
      setShouldFetch(false); 
    }
  }, [shouldFetch, token, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedBuilding = buildingTypes.find(type => type.type === buildingType);
    if (selectedBuilding) {
      CreateBuildingCommandRequest.BuildingTypeId = selectedBuilding.id;
    }

    CreateBuildingCommandRequest.BuildingCost = buildingCost;
    CreateBuildingCommandRequest.ConstructionTime = constructionTime;
    CreateBuildingCommandRequest.BuildingType = buildingType;

    const response = await GenericRequest(
      {
        url: REDIRECTION_STRINGS.CreateConfiguration,
        params: "",
        methodType: METHOD_TYPE.POST,
        dispatch: dispatch,
        token: token,
        body: CreateBuildingCommandRequest,
        toaster: true
      }
    );
    if (response) {
      setShouldFetch(true); 
    }

    setOpen(false);
    setBuildingType('');
    setConstructionTime('');
    setBuildinCost('');
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add
        </Button>
      </Box>

      <CustomDataGrid columns={columns} rows={rows} />

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add new configuration item</DialogTitle>
        <DialogContent>
          <Stack spacing={2} direction="row" sx={{ marginTop: 4, marginBottom: 3 }}>
            <TextField
              type="number"
              variant='outlined'
              color='secondary'
              label="Building Cost"
              onChange={e => setBuildinCost(e.target.value)}
              value={buildingCost}
              fullWidth
              required
            />
            <TextField
              type="number"
              variant='outlined'
              color='secondary'
              label="Construction Time"
              onChange={e => setConstructionTime(e.target.value)}
              value={constructionTime}
              fullWidth
              required
            />
          </Stack>

          <FormControl required fullWidth sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Building Type</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={buildingType}
              label="Building Type"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {buildingTypes.map((type) => (
                <MenuItem key={type.id} value={type.type}>
                  {type.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Configuration;
