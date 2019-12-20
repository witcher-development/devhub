import React, {SyntheticEvent} from 'react';
import TextField from '@material-ui/core/TextField';


const UserEditOrCreate: React.FC = () => {
  const test = (e: any) => console.log(e);

  return (
    <div>
      <TextField onChange={test} variant="outlined" label="Outlined" />
    </div>
  );
};

export default UserEditOrCreate;
