import React, { ChangeEvent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { IportfolioItem } from '../types/index';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import changeInstrumentValueAction from 'src/store/actions/changeInstrumentValue';

interface IinstrumentFormComponent {
  instrument: IportfolioItem,
  changeInstrumentValue: typeof changeInstrumentValueAction,
  handleSubmit: () => Promise<void>
}

const InstrumentForm = ({ changeInstrumentValue, instrument, handleSubmit }: IinstrumentFormComponent) => {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    changeInstrumentValue(instrument._id, Number(e.target.value));
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeInstrumentValue: bindActionCreators(changeInstrumentValueAction, dispatch),
  }
}
export default connect(null, mapDispatchToProps)(InstrumentForm)