import React, { useState } from 'react';
import { IportfolioItem } from '../types/index';
import { useDispatch } from 'react-redux';
import InstrumentForm from './InstrumentForm';
import { updateInstrumentValue } from '../store/portfolio/actions/updateValue';
import {removeInstrument } from 'src/store/portfolio/actions/removeInstrument';

interface IinstrumentComponent {
  instrument: IportfolioItem,
}
const Instrument = ({ instrument }: IinstrumentComponent) => {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(instrument.value);  
    const dispatch = useDispatch();
    
    const handleSubmit = async () => {
      setEdit(false);
      if (value === instrument.value) {
        return ;
      }
      dispatch(updateInstrumentValue(instrument.symbol, value));
    }
    const handleToggle = () => {
      setEdit(true);
    }
    const handleRemove = async () => {
        dispatch(removeInstrument(instrument.symbol));
    }

    return (
      <li className="list-group-item">
        <div className="row">
        <div className="col-7"><b>{instrument.priceData.shortName}</b></div>
        {edit ?
          <div className="col-3">
            <InstrumentForm value={value} handleSubmit={handleSubmit} handleChange={setValue} />
          </div> :
          <>
            <div className="col-1"><b>{instrument.value}</b></div>
            <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={handleToggle}>Изменить</button></div>
          </>}
        <div className="col-2"><button type="button" className="btn btn-sm btn-light" onClick={handleRemove}>Удалить</button></div>
        </div>
      </li>
    )
};

export default Instrument; 
