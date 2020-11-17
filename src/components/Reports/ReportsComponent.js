import React, { Component, useState  } from 'react';
import { Field, reduxForm } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';


// export function DateTimeInput (props) {
//   return 
//   <TextField
//     fullWidth={true}
//     label={label}
//     type="date"
//     error={touched && invalid}
//     helperText={touched && error}
//     {...input}
//     {...custom}
//     InputLabelProps={{
//       className: labelClass,
//       shrink: true 
//     }}
//   />
// }
