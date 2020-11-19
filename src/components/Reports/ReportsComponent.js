import React, { Component, useState  } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import { renderFromHelper, renderTextField, renderSelectField, renderChildrenSelectField,
     renderDateTimeField } from '../PigletsTabs/PigletsForms';
import  { lodashToggle, uniq } from '../utils';

function compareNumbers(a, b) {
    return b.week_number - a.week_number;
    }

function serializeTours (tours){
    let data = []
    let years = []
    tours.map(tour => {
        years.push(tour.year)
    }
    )
    years = uniq(years)
    
    years.map(year => {
        let yTours = []
        tours.map(tour => {
            if (year === tour.year) yTours = lodashToggle(yTours, tour) 
        })
        yTours.sort(compareNumbers)
        data = lodashToggle(data, {year: year, tours: yTours})
    })


    return data
}

class ExactFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true,
            tours: []
        }
        this.setTours = this.setTours.bind(this);
        this.reset = this.reset.bind(this);
    }

    setTours (e) {
        let { tours } = this.state
        tours = lodashToggle(tours, e.target.name) 
        this.setState({
            ...this.state, tours: tours
        })
        let ids = ''
        tours.map(tour => ids = ids + tour.toString() + ',')
        this.props.toursFormSetID(ids)
    }

    reset () {
        this.setState({
            ...this.state, tours: []
        })
        this.props.toursFormSetID('')
    }

    render() {
        const { expand } = this.state
        const { tours } = this.props
        let dataTours = serializeTours(tours)

        return (
        <div className={expand ? 'border' : ''}>
            <button type='button' className='btn btn-m shadow-s bg-mainDark-dark text-wrap'
                 onClick={() => this.setState({...this.state, expand: !expand})}>
                Недели
            </button>
            {expand &&
              <div>
                {dataTours.map(year =>
                    <div>
                        <p className='my-0 font-700'>{year.year}</p>
                        {year.tours.map(tour =>
                            <div className='mr-2 d-inline'>
                                <label className=''>{tour.week_number}</label>
                                <input type='checkbox' name={tour.id} onClick={this.setTours}
                                    checked={this.state.tours.includes((tour.id).toString())}
                                />
                            </div>
                            )}
                    </div>
                    )}
                <button type='button' className='btn btn-m mt-2 shadow-s bg-mainDark-dark text-wrap'
                    onClick={this.reset}>
                    сбросить
                </button>
              </div>
            }
        </div>
        )
    }
}


export function TourFilterForm (props) {
    const { parentSubmit, pristine, reset, submitting, handleSubmit, initialValues, tours, toursFormSetID }
         = props

    return (
        <form onSubmit={handleSubmit(parentSubmit)} className=''
            initialValues={initialValues}
        > 

            <ExactFilter tours={tours} toursFormSetID={toursFormSetID}/>

            <button 
                className='btn btn-m mt-2 font-900 shadow-s bg-mainDark-dark text-wrap'
                type="submit"
                disabled={pristine || submitting}>
                Показать туры
            </button>

        </form>
    )
}

const validateTourFilterForm = values => {
    const errors = {}
    const requiredFields = []

    requiredFields.forEach(field => {
        if (!values[field]) {
        errors[field] = 'Обязательное поле'
        }
    })
    return errors
}

TourFilterForm = reduxForm({
    form: 'tourFilterForm',
    validate: validateTourFilterForm,
})(TourFilterForm)
