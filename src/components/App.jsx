import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    inputData: '',
  };

  handleSubmit = inputData => {
    this.setState({ inputData: inputData });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery inputData={this.state.inputData} />
      </div>
    );
  }
}
