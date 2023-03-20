import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import fetchImages from '../services/api';
import Button from './Button';

class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    isThisLastPage: false,
  };

  cutImg = imgInfo => {
    return imgInfo.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
  };

  onNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.inputData;
    const nextSearch = this.props.inputData;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch === nextSearch && prevPage === nextPage) {
      return;
    }

    if (prevSearch !== nextSearch) {
      this.setState({ page: 1, images: [] });

      if (nextPage !== 1) {
        return;
      }
    }

    this.loadImg(nextSearch, nextPage);
  }

  loadImg = async (query, page) => {
    try {
      this.setState({ status: 'pending' });
      const response = await fetchImages(query, page);
      const newImages = this.cutImg(response.hits);
      const isThisLastPage = Math.ceil(response.total / 12) <= page;
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        status: 'resolved',
        isThisLastPage,
      }));

      if (newImages.length === 0) {
        alert(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  render() {
    const { images, error, status, isThisLastPage } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'rejected') {
      return <div>{error.message}</div>;
    }

    if (status === 'resolved' || status === 'pending') {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(image => (
              <ImageGalleryItem key={image.id} image={image} />
            ))}
          </ul>
          {status === 'pending' && <Loader />}
          {status !== 'pending' && !isThisLastPage && (
            <Button onNextPage={this.onNextPage} status={status} />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  inputData: PropTypes.string,
};

export default ImageGallery;
