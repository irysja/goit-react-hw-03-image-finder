
import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt=""
        largeImage={largeImageURL}
        onClick={() => onClick(largeImageURL)}
      />
    ))}
  </ul>
);

export default ImageGallery;





