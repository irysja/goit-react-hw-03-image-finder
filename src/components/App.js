
import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import { fetchImages } from './api';
import './styles.css';

class App extends Component {
  state = {
    images: {
      hits: [],
      total: 0,
    },
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: '',
    showButton: true, // Добавляем новое состояние для показа кнопки
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  handleSearchSubmit = (query) => {
    this.setState({ query, images: { hits: [], total: 0 }, page: 1 });
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

    /*try {
      const { hits, total } = await fetchImages(query, page);
      this.setState((prevState) => ({
        images: {
          hits: [...prevState.images.hits, ...hits],
          total,
        },*/
        try {
          const { hits, totalHits:total } = await fetchImages(query, page);
          this.setState((prevState) => ({
            images: {
              hits: [...prevState.images.hits, ...hits],
              total,
              showButton: page<Math.ceil(total/12)
            },
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
    const { images, isLoading, showModal, selectedImage, showButton } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images.hits} onClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {/* Используем условие для отображения Button */}
        {images.hits.length > 0 && !isLoading && showButton && (
          <Button
            onClick={this.handleLoadMore}
            isLastPage={images.hits.length >= images.total}
          />
        )}
        {showModal && <Modal largeImageURL={selectedImage} onClose={this.handleCloseModal} />}
      </div>
    );
  }
}

export default App;




