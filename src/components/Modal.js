
/*import React, { useEffect, useCallback } from 'react';

const Modal = ({ largeImageURL, onClose }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleKeyPress = (e) => handleKeyDown(e);

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyDown]);

  return (
    <div className="Overlay" onClick={onClose}>
      <div className="Modal">
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;*/

import React, { Component } from 'react';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, onClose } = this.props;

    return (
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;



