import * as React from "react";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import blue from "material-ui/colors/blue";
import Select from "material-ui/Select";
import { FormControl } from "material-ui/Form";
import { MenuItem } from "material-ui/Menu";
import axios from "axios";
import PhotoGrid from "./PhotoGrid";

const apiURL = "https://pixabay.com/api/?key=8770118-77887e7500661fe2b653adc87";

interface SearchProps {
  classes: any;
}

const styles = (theme: any) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    margin: theme.spacing.unit
  },
  select: {
    width: "25vw",
    margin: theme.spacing.unit
  },
  formControl: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  input: {
    color: "purple"
  },
  selectLabel: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class Search extends React.Component<SearchProps, {}> {
  state = {
    amount: 15,
    search: "",
    photos: []
  };

  onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, async () => {
      if (this.state.search.length) {
        const searches = this.state.search.split(" ").join("+");
        const { data } = await axios.get(
          `${apiURL}&q=${searches}&image_type=photo`
        );
        this.setState({ photos: data.hits.slice(0, this.state.amount) });
      } else this.setState({ photos: [] });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container}>
          <TextField
            className={classes.textField}
            name="search"
            id="search"
            fullWidth
            onChange={this.onInputChange.bind(this)}
            label="Search for images"
            InputLabelProps={{ color: "purple" }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.selectLabel} htmlFor="amount">
              Amount
            </InputLabel>
            <Select
              onChange={this.onInputChange.bind(this)}
              className={classes.select}
              value={this.state.amount}
              input={<Input name="amount" id="amount" />}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </form>
        <PhotoGrid photos={this.state.photos} />
      </div>
    );
  }
}

export default withStyles(styles)(Search);
