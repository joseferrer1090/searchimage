import React, { Component } from "react";
import ImageResults from "../Image-result/ImageResults";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Axios from "axios";
import ImageGradient from "material-ui/SvgIcon";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      amount: 15,
      apiUrl: "https://pixabay.com/api/",
      apiKey: "10116533-abedda06b46e54e275609713f",
      images: []
    };
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      Axios.get(
        `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
          this.state.searchText
        }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
      )
        .then(res => this.setState({ images: res.data.hits }))
        .catch(err => console.log(err));
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          placeholder={"Search for images"}
          fullWidth={true}
        />
        <br />
        <SelectField
          value={this.state.amount}
          onChange={this.onAmountChange}
          name="amount"
          floatingLabelText="Amount"
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={20} primaryText="20" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
