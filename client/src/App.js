import React from "react";
import "./App.scss";
import axios from "axios";
import CompanyInfo from "./component/Body/CompanyInfo";
import { Button, Form, Col } from "react-bootstrap";

class App extends React.Component {
  state = {
    option: "option2",
    balanceToRefinance: 15000,
    amountToLoan: 15000,
    Apr: 19.99,
    personalLoan: 5000,
    value1: 5000,
    creditScore: "fair",
    remainingBalance: 2500,
    monthlyPaydown: 76.06,
    existingApr: 15,
    howManyTerms: 0,
    data: [
      {aprExcellent: [{}],
      aprGood: [{}],
      aprFair: [{}],
      aprNeedsWork:[{}],
      name: ''}
    ]
  };
  // handles change for input fields
  handleChange = event => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value
    }));
  };

  // handles submit form
  handleSubmit = event => {
    event.preventDefault();
    if(this.state.option === "option1"){
      this.setState({
        leftOver: this.state.balanceToRefinance,
        aprTwo: this.state.Apr,
        personalAmount: this.state.personalLoan,
        score: this.state.creditScore,
      })
    }else if(this.state.option === "option2"){
      this.setState({
          personalAmount: this.state.personalLoan,
          score: this.state.creditScore,
      })
    }else if(this.state.option === "option3"){
      this.setState({
          leftOver: this.state.remainingBalance,
          monthlyAmount: this.state.monthlyPaydown,
          aprTwo: this.state.existingApr,
          score: this.state.creditScore,
          personalAmount: this.state.personalLoan
      })
    }
  };

  mathItDisabled = (remainingBalance, monthlyPaydown, existingApr) => {
    // covert interest from a precentage to a decimal and convert from an
    // anual rate to monthly rate
    const interest = parseFloat(existingApr / 100 / 12);
    console.log(interest)
    // Math.pow compute powers
    const powers = Math.pow(1 + interest, monthlyPaydown);
    console.log(powers)
    const monthly = Math.floor((remainingBalance * powers * interest) / (powers - 1));
    console.log(monthly);
    this.setState({
      howManyTerms: monthly
    })
  }
  handleChangeSelect = event => {
    this.setState({
      creditScore: event.target.value
    })
  }
  // handles input for radio buttons
  handleChangeRadio = event => {
    this.setState({
      option: event.target.value
    });
  };

  handleInitalState = () => {
    if(this.state.option === "option1"){
      this.setState({
        leftOver: this.state.balanceToRefinance,
        aprTwo: this.state.Apr,
        personalAmount: this.state.personalLoan,
        score: this.state.creditScore,
      
      })
    }else if(this.state.option === "option2"){
      this.setState({
          personalAmount: this.state.personalLoan,
          score: this.state.creditScore,
      })
    }else if(this.state.option === "option3"){
      this.setState({
          leftOver: this.state.remainingBalance,
          monthlyAmount: this.state.monthlyPaydown,
          aprTwo: this.state.existingApr,
          score: this.state.creditScore,
      })
    }
  }
  getData = () => {
    if (this.state) {
      axios.get(`http://localhost:8080/personal-loans`).then(response => {
        this.setState({
          data: response.data
        })
        
      });
    }
  };
  componentDidMount() {
    this.getData();
    this.handleInitalState();
    this.mathItDisabled(this.state.remainingBalance, this.state.monthlyPaydown, this.state.existingApr);
  }
  componentDidUpdate(pervProps, pervState) {
    if (pervState.balanceToRefinance !== this.state.balanceToRefinance) {
      this.setState({
        amountToLoan: this.state.balanceToRefinance
      })
      console.log(this.state.creditScore);
    } else if(pervState.howManyTerms !== this.state.howManyTerms){
      this.setState({
        howManyTerms: this.state.howManyTerms
      })
    }
  }

  render() {
    console.log(this.state);
    let form1;
    let form2;
    let form3;

    if (this.state.option === "option1") {
      form1 = (
        <>
          <Form.Group controlId="balance">
            <Form.Label className="container__form__label">What are the details of your debt?</Form.Label>
            <Form.Label>Balance to Refinance </Form.Label>
            <Form.Control
              type="number"
              onChange={this.handleChange}
              name="balanceToRefinance"
              className="contianer__form__input"
              value={this.state.balanceToRefinance}
              placeholder={this.state.balanceToRefinance}
            />
          </Form.Group>
          <Form.Group controlId="apr">
            <Form.Label>APR</Form.Label>
            <Form.Control
              type="number"
              name="Apr"
              value={this.state.Apr}
              onChange={this.handleChange}
              placeholder={this.state.Apr}
            />
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label className="container__form__label">How much do you want to borrow?</Form.Label>
            <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              type="number"
              name="personalLoan"
              onChange={this.handleChange}
              value={this.state.personalLoan}
              placeholder={this.state.personalLoan}
            />
          </Form.Group>
        </>
      );
    } else if (this.state.option === "option2") {
      form2 = (
        <>
          <Form.Group controlId="amount">
          <Form.Label className="container__form__label">How much do you want to borrow?</Form.Label>
            <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              type="number"
              name="personalLoan"
              onChange={this.handleChange}
              value={this.state.personalLoan}
              placeholder={this.state.personalLoan}
            />
          </Form.Group>
        </>
      );
    } else if (this.state.option === "option3") {
      form3 = (
        <>
          <Form.Group controlId="remainingBalance">
          <Form.Label className="container__form__label">What are the details of your debt?</Form.Label>
            <Form.Label>Remaining Balance </Form.Label>
            <Form.Control
              type="number"
              onChange={this.handleChange}
              name="remainingBalance"
              value={this.state.remainingBalance}
              placeholder={this.state.remainingBalance}
            />
          </Form.Group>

          <Form.Group controlId="monthly">
            <Form.Label>Monthly Paydown</Form.Label>
            <Form.Control
              type="number"
              name="monthlyPaydown"
              onChange={this.handleChange}
              value={this.state.monthlyPaydown}
              placeholder={this.state.monthlyPaydown}
            />
          </Form.Group>

          <Form.Group controlId="existingApr">
            <Form.Label>APR</Form.Label>
            <Form.Control
              type="number"
              name="existingApr"
              value={this.state.existingApr}
              onChange={this.handleChange}
              placeholder={this.state.existingApr}
            />
          </Form.Group>

          <Form.Group controlId="remainingTerm">
            <Form.Label >Calculated Remaining Term</Form.Label>
            <Form.Control
              type="number"
              name="remainingTerm"
              disabled
              value={this.mathItDisabled}
              onChange={this.handleChange}
              placeholder={this.state.howManyTerms}
            />
          </Form.Group>

          <Form.Group controlId="amount">
          <Form.Label className="container__form__label">How much do you want to borrow?</Form.Label>
            <Form.Label>Loan Amount</Form.Label>
            <Form.Control
              type="number"
              name="personalLoan"
              onChange={this.handleChange}
              value={this.state.personalLoan}
              placeholder={this.state.personalLoan}
            />
          </Form.Group>
        </>
      );
    } else {
      return (form1 = null), (form2 = null), (form3 = null);
    }

    let info;
    if(this.state.data && this.state.score){
      info = <CompanyInfo className="card" loan={this.state.personalAmount} data={this.state.data} scoreData={this.state.score}/>
    }else { info = null}
    return (
      <div className="container">
        <div className="container__form">
          <Form onSubmit={this.handleSubmit}>
            <fieldset>
              <Form.Group as={Col}>
                <Form.Label className='container__form__label' as="legend" column sm={2}>
                  What do you want to do?
                </Form.Label>
                <Col sm={10} className="container__form--select">
                  <Form.Check
                    type="radio"
                    label="Pay off credit card debt"
                    value="option1"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    className='selectOption'
                    onChange={this.handleChangeRadio}
                    onClick={this.handleChangeRadio}
                  />
                  <Form.Check
                    type="radio"
                    label="Compare new personal loans"
                    value="option2"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    className='selectOption'
                    defaultChecked
                    onChange={this.handleChangeRadio}
                    onClick={this.handleChangeRadio}
                  />
                  <Form.Check
                    type="radio"
                    label="Refinance an existing loan"
                    value="option3"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    className='selectOption'
                    onChange={this.handleChangeRadio}
                    onClick={this.handleChangeRadio}
                  />
                </Col>
              </Form.Group>
            </fieldset>
            {form1}
            {form2}
            {form3}
            <Form.Group controlId="dropbox">
              <Form.Label className='container__form__label'>What's your credit score?</Form.Label>
              <Form.Control defaultValue="fair" onChange={this.handleChangeSelect} as="select">
                <option value="excellent">Excellent (750-850)</option>
                <option value="good">Good (700-749)</option>
                <option value="fair">Fair (640-699)</option>
                <option value="needs">Needs Work (639 or less)</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">Search</Button>
          </Form>
        </div>
        <div className="container__info">{info}</div>
      </div>
    );
  }
}

export default App;
