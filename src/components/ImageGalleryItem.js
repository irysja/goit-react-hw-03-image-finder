
import React from 'react';

const ImageGalleryItem = ({ src, alt, onClick, largeImage }) => (
  <li className="ImageGalleryItem">
    <img
      src={src}
      alt={alt}
      className="ImageGalleryItem-image"
      onClick={() => onClick(largeImage)}
    />
  </li>
);

export default ImageGalleryItem;





