import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    page: 1,
    inputData: '',
  };

  handleSubmit = inputData => {
    this.setState({ inputData: inputData, page: 1 });
  };

  onNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { inputData, page } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          inputData={inputData}
          page={page}
          onNextPage={this.onNextPage}
        />
      </div>
    );
  }
}
