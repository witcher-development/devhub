import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  LinearProgress,
  Divider,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import { User, NewUser } from '../types/User';
import { getUser, editUser, createUser } from '../client';

import style from './UserEditOrCreate.module.scss';

const dateUtils = new DateFnsUtils();
const dateFormat = 'yyyy-MM-dd';

const UserEditOrCreate: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const initUserState: NewUser = {
    first_name: '',
    last_name: '',
    birth_date: dateUtils.format(new Date(), dateFormat),
    gender: '',
    is_active: false,
    biography: '',
    job: '',
  };
  const [user, setUser] = useState<User | NewUser>(initUserState);

  const initErrorsState = {
    first_name: false,
    last_name: false,
    birth_date: false,
    gender: false,
    biography: false,
    job: false,
  };
  const [errors, setErrors] = useState(initErrorsState);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const userResponse: User = await getUser(+id);
        setUser(userResponse);
      } catch (e) {
        alert('In get user info. ' + e);
        history.push('/');
      }
    };

    fetchUser();
  }, []);

  const calculateProgress = () => {
    const valuableFields = Object.keys(user).filter(
      (key) => key !== 'is_active' && key !== 'id',
    );
    const fieldsLength = valuableFields.length;

    let fulfilledFields = 0;
    Object.keys(user).forEach((key) => {
      if (valuableFields.indexOf(key) !== -1) {
        // @ts-ignore
        if (user[key] && !errors[key]) {
          fulfilledFields++;
        }
      }
    });

    return (100 / fieldsLength) * fulfilledFields;
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [user, errors]);

  const onChange = (field: string, value: string) => {
    if (value.length > 256) {
      setErrors({ ...errors, [field]: true });
    } else {
      setErrors({ ...errors, [field]: false });
    }

    setUser({ ...user, [field]: value });
  };
  const onChangeBiography = (text: string) => {
    if (text.length > 1024) {
      setErrors({ ...errors, biography: true });
    } else {
      setErrors({ ...errors, biography: false });
    }

    setUser({ ...user, biography: text });
  };
  const onChangeDate = (date: any) => {
    if (!dateUtils.isValid(date)) {
      setErrors({ ...errors, birth_date: true });
      return;
    }

    setErrors({ ...errors, birth_date: false });
    setUser({ ...user, birth_date: dateUtils.format(date, dateFormat) });
  };
  const onChangeIsActive = () =>
    setUser({ ...user, is_active: !user.is_active });

  const onSubmit = async () => {
    try {
      if ('id' in user) {
        await editUser(user);
      } else {
        await createUser(user);
      }
      history.push('/');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      {id && !user ? (
        <LinearProgress />
      ) : (
        <div className={style.edit}>
          <div className={style.edit__row}>
            <TextField
              onChange={(e) => onChange('first_name', e.target.value)}
              type="text"
              fullWidth
              label="First name *"
              value={user.first_name}
              error={errors.first_name}
            />
            <TextField
              onChange={(e) => onChange('last_name', e.target.value)}
              type="text"
              fullWidth
              label="Last name *"
              value={user.last_name}
              error={errors.last_name}
            />
          </div>
          <div className={style.edit__row}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                onChange={onChangeDate}
                value={user.birth_date}
                label="Birth date *"
                format={dateFormat}
                error={errors.birth_date}
              />
            </MuiPickersUtilsProvider>
            <FormControl>
              <InputLabel id="gender-label">Gender *</InputLabel>
              <Select
                labelId="gender-label"
                value={user.gender}
                onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                  onChange('gender', e.target.value as string)
                }
                error={errors.gender}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <div className={style['edit__row_full-width']}>
            <TextField
              onChange={(e) => onChange('job', e.target.value)}
              type="text"
              fullWidth
              label="Profession *"
              value={user.job}
              error={errors.job}
            />
          </div>
          <div className={style['edit__row_full-width']}>
            <TextField
              label="Biography *"
              multiline
              value={user.biography}
              onChange={(e) => onChangeBiography(e.target.value)}
              variant="outlined"
              error={errors.biography}
            />
          </div>
          <LinearProgress variant="determinate" value={progress} />
          <div className={style.edit__row}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.is_active}
                  onChange={onChangeIsActive}
                />
              }
              label="Active"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={progress !== 100}
            >
              {id ? 'Save' : 'Create'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditOrCreate;
