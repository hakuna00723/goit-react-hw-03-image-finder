import React, { Component } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import '../styles.css/styles.css';

class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.onModal}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal} image={item} />}
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};
