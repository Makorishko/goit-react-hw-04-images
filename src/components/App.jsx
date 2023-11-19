import { Searchbar } from './searchbar/searchbar';
import { useEffect, useState } from 'react';
import { ImageGallery } from './imagegallery/imagegallery';
import { Loader } from './loader';
import { Button } from './button/button';
import { Modal } from './modal/modal';
import Notiflix from 'notiflix';
import React from 'react';

import { fetchImages } from './image-api';

export const App = () => {
  const pageEndRef = React.useRef(null);

  const [imageItems, setImageItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [largeImageUrl, setLargeImage] = useState(null);

  const searchImage = value => {
    setImageItems([]);
    setValue(value);
    setPage(1);
  };

  const loadMoreImages = e => {
    setPage(prevState => prevState + 1);
  };

  const openModal = newUrl => {
    setLargeImage(newUrl);
  };

  const closeModal = () => {
    setLargeImage(null);
  };

  const scrollToBottom = () => {
    pageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function loadImages() {
      try {
        setIsLoading(true);
        const images = await fetchImages(value, page);
        setImageItems(prevState => [...prevState, ...images]);
        setTimeout(() => scrollToBottom());
      } catch (error) {
        Notiflix.Notify.failure(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (value) {
      loadImages();
    }
  }, [value, page]);

  return (
    <>
      <Searchbar onSubmit={searchImage} />

      {isLoading && <Loader />}

      {!!imageItems.length && (
        <ImageGallery onOpenModal={openModal} list={imageItems} />
      )}

      {imageItems.length % 12 === 0 && !!imageItems.length && (
        <Button onClick={loadMoreImages} />
      )}

      {largeImageUrl && (
        <Modal onClick={closeModal} largeImageUrl={largeImageUrl} />
      )}

      <div ref={pageEndRef} />
    </>
  );
};
