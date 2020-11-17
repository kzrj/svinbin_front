import React, { Component } from 'react';
import { ErrorOrMessage } from '../CommonComponents';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';


export function SowFarmIdFilter (props) {
  return (
    <TextField
      label={"номер свиноматки"}
      className={'bg-white ' + props.className}
      name='farm_id_starts'
      value={props.value}
      onChange={props.setQuery}
      InputLabelProps={{
        className: 'font-13',
      }}
    />
      )
}


export function SowTourFilter (props){
  const { formClass, labelClass, options, label } = props
  return (
    <FormControl className={'bg-white '+ formClass}>
      <InputLabel className={'font-13 ' + labelClass}>{label}</InputLabel>
      <Select
        onChange={props.setQuery}
        className={'font-13 ' + labelClass}
      >
        {options.map(option =>
            <MenuItem value={option.id}>Неделя {' '} {option.week_number} {option.year}</MenuItem>
            )}
      </Select>
    </FormControl>
  )
}

export function SowSemUsoundFilter (props) {
  const { formClass, labelClass, label } = props

  return (
    <FormControl className={'bg-white '+ formClass}>
      <InputLabel className={'font-13 ' + labelClass}>Статус</InputLabel>
      <Select
        onChange={props.setSeminatedSuporosStatus}
        className={'font-13 ' + labelClass}
        defaultValue={'status_title=Супорос 35'}
      >
        <MenuItem value='to_seminate=true'>Не Осеменена, нет УЗИ</MenuItem>
        <MenuItem value='farm_id_isnull=true'>Ремонтные</MenuItem>
        <MenuItem value='status_title=Осеменена 1'>Осеменена 1</MenuItem>
        <MenuItem value='status_title=Осеменена 2'>Осеменена 2</MenuItem>
        <MenuItem value='status_title=Супорос 28'>Супорос 28</MenuItem>
        <MenuItem value='status_title=Супорос 35'>Супорос 35</MenuItem>
      </Select>
    </FormControl>
    )
}