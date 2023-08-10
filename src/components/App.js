import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import { fetchImages } from './api'; 
//import styles from './styles.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = (query) => {
    this.setState({ query, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  handleImageClick = (largeImageURL) => {
    this.setState({ selectedImage: largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: '', showModal: false });
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    if (query === '') return;

    this.setState({ isLoading: true });

    try {
      const images = await fetchImages(query, page); 
      this.setState((prevState) => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { images, isLoading, showModal, selectedImage } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && <Button onClick={this.handleLoadMore} />}
        {showModal && <Modal largeImageURL={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;

