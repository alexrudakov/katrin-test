import React from "react";
import './CompanyCard.scss';

class CompanyCard extends React.Component {
  state = {
    aprScore: this.props.score2,
    personal: this.props.personalLoan
  };

  mathIt = (loanAmount, months, apr) => {
    // covert interest from a precentage to a decimal and convert from an
    // anual rate to monthly rate
    const interest = parseFloat(apr / 100 / 12);
    // Math.pow compute powers
    const powers = Math.pow(1 + interest, months);
    const monthly = Math.floor((loanAmount * powers * interest) / (powers - 1));
    return monthly;
  };
  componentDidUpdate(pervProps, pervState) {
    if (
      pervProps.personalLoan !== this.props.personalLoan ||
      pervProps.score2 !== this.props.score2
    ) {
      this.setState({
        aprScore: this.props.score2,
        personal: this.props.personalLoan
      });
    }
  }
  render() {
    return this.props.data[this.props.score2].map((item, index) => (
      <>
        <div className="companyCard">
          <div className="companyCard--header">
            <h1>{item.name}</h1>
          </div>
          <div className="companyCard__container">
            <div>
              <h1>{item.name}</h1>
            </div>
            <div>
              <button className="comapnyCard__container--">Get Started</button>
            </div>
          </div>
          <div className="companyCard__tags">
            <div className="companyCard__tags--one">
              <div>
                <h2>Loan Amount</h2>
              </div>
              <div>
                <p>${this.state.personal}</p>
              </div>
            </div>
            <div className="companyCard__tags--two">
              <div>
                <h2>Term of Loan</h2>
              </div>
              <div>
                <p>{item.months} Months</p>
              </div>
            </div>
            <div className="companyCard__tags--three">
              <div>
                <h2>APR</h2>
                <h2>estimated</h2>
              </div>
              <div>
                <p>{item.apr}%</p>
              </div>
            </div>
            <div className="companyCard__tags--four">
              <div>
                
                <h2>Monthly Payment</h2>
                <h2>estimated</h2>
              </div>
              <div>
                <p>${this.mathIt(this.state.personal, item.months, item.apr)}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ));
  }
}

export default CompanyCard;
