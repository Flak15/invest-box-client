import React, { ChangeEvent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { IportfolioItem } from '../types/index';
import { useDispatch } from 'react-redux';
import changeInstrumentValueAction from 'src/store/portfolio/actions/updateValue';

interface IinstrumentFormComponent {
  instrument: IportfolioItem,
  handleSubmit: () => Promise<void>
}

const InstrumentForm = ({ instrument, handleSubmit }: IinstrumentFormComponent) => {
  const dispatch = useDispatch();  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInstrumentValueAction(instrument._id, Number(e.target.value)));
  }
  return (<Form onSubmit={handleSubmit}>
    <Form.Row>
      <Col>
        <Form.Group controlId="formValue">
          <Form.Control type="text" value={instrument.value} onChange={handleInput}/>
        </Form.Group>
      </Col>
      <Col>
        <Button variant="outline-secondary" type="submit">
          OK
        </Button>
      </Col>
    </Form.Row>
  </Form>);
}

export default InstrumentForm;