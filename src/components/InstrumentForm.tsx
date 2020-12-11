import React, { ChangeEvent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

interface IinstrumentFormComponent {
  value: number,
  handleSubmit: () => Promise<void>,
  handleChange: (value: number) => void
}

const InstrumentForm = ({ value, handleSubmit, handleChange }: IinstrumentFormComponent) => {
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(Number(e.currentTarget.value));
  }
  return (<Form>
    <Form.Row>
      <Col>
        <Form.Group controlId="formValue">
          <Form.Control type="text" value={value} onChange={handleInput} />
        </Form.Group>
      </Col>
      <Col>
        <Button variant="outline-secondary" type="button" onClick={handleSubmit}>
          OK
        </Button>
      </Col>
    </Form.Row>
  </Form>);
}

export default InstrumentForm;