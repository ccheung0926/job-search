import React, { Component } from "react";
import data from "./demo-data/testdata-austintx";
import RouteCommute from "./RouteCommute";
import SkyLight from 'react-skylight';

class JobView extends Component {
  state = {
    jobPostView: false
  };

  handleClick = event => {
    this.setState({
      jobPostView: !this.state.jobPostView
    });
  };

  handleChange = event => {
    this.setState({
      currentValue: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // pass home address to update map route
  };

  render() {
    console.log(this.state.currentValue);
    const companyFont = {
      padding: "10px 20px",
      fontWeight: !this.state.jobPostView ? "bold" : "normal",
      borderBottom: !this.state.jobPostView ? "1px solid cadetblue" : "none"
    };
    const jobFont = {
      padding: "10px",
      fontWeight: this.state.jobPostView ? "bold" : "normal",
      borderBottom: this.state.jobPostView ? "1px solid cadetblue" : "none"
    };
    const modal = {
      height: "550px",
      marginTop: "-300px",
      marginLeft: "-35%"
    };

    return (
      <div
        style={{
          padding: "0 20px",
          width: "50%",
          height: "100vh",
          overflow: "scroll"
        }}
      >
        <h2>{data.hits[this.props.jobIdx]._source.company_profile.name}</h2>
        <span style={companyFont} onClick={this.handleClick}>
          About the Company
        </span>
        <span style={jobFont} onClick={this.handleClick}>
          Job Posting
        </span>
        {this.state.jobPostView ? (
          <div style={{ padding: "20px" }}>
            <a
              target="_blank"
              href={data.hits[this.props.jobIdx]._source.source}
            >
              {" "}
              View posting on company site{" "}
            </a>
            <div
              dangerouslySetInnerHTML={{
                __html: data.hits[this.props.jobIdx]._source.description
              }}
            />
            <button onClick={() => this.refs.simpleDialog.show()}>Apply for Job Post</button>
            <SkyLight dialogStyles={modal} hideOnOverlayClicked ref="simpleDialog">
              <iframe 
                style={{ width: "100%", height: "95%", overflow: "scroll" }} 
                frameBorder="0"
                src={"http://localhost:3000/index.html?username=Y2luZHkwMDc&curNode=job-center"} 
              />
            </SkyLight>
          </div>
        ) : (
          <div style={{ padding: "20px" }}>
            <div
              style={{
                color: "cadetblue",
                padding: "3px",
                fontSize: "1em",
                fontWeight: "bold"
              }}
            >
              Route your Commute
            </div>
            <RouteCommute
              currentValue={this.state.currentValue}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
            <div
              style={{
                color: "cadetblue",
                padding: "3px",
                fontSize: "1em",
                fontWeight: "bold"
              }}
            >
              See Near By
              <div style={{display: "flex", flexWrap: "wrap", color: "inherit", fontWeight: "normal"}}>
              <span style={{width: "50%"}}>Gym</span>
              <span style={{width: "50%"}}>Groceries Store</span>
              <span style={{width: "50%"}}>Hospital</span>
              <span style={{width: "50%"}}>Restaurant</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default JobView;