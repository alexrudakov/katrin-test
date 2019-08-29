import React from 'react';
import CompanyCard from '../Body/CompanyCard';


class CompanyInfo extends React.Component {
  state= {
    amount: this.props.loan,
    apr: this.props.scoreData

  }
  componentDidUpdate(pervProps, pervState){
    if(pervProps.scoreData !== this.props.scoreData && pervProps.loan !== this.props.loan){
      this.setState({
        amount: this.props.loan,
        apr: this.props.scoreData
      })
    }else if(pervProps.scoreData !== this.props.scoreData){
      this.setState({
        apr: this.props.scoreData
      })
    } else if(pervProps.loan !== this.props.loan){
      this.setState({
        amount:this.props.loan
      })
    }
  }
  render(){
    console.log('score', this.props.scoreData)
    console.log('loan', this.props.loan)
    return this.props.data.filter(item => item[this.props.scoreData]).map((i,index)=> (
      <>
      <CompanyCard personalLoan={this.state.amount} data={i} score2={this.props.scoreData} />
      </>
    ))
  }
}

export default CompanyInfo;