import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = (index) => {
    setFullscreenIndex(index);
    setShowFullscreen(true);
  };

  const nextFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev + 1) % images.length);
  };

  const prevFullscreenImage = () => {
    setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
        <PhotoIcon className="w-16 h-16 text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]?.url}
            alt={images[currentIndex]?.caption || title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => openFullscreen(currentIndex)}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Caption */}
          {images[currentIndex]?.caption && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm max-w-xs">
              {images[currentIndex].caption}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="p-4">
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? 'border-gold'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setShowFullscreen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevFullscreenImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                  <ChevronLeftIcon className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextFullscreenImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-colors z-10"
                >
                  <ChevronRightIcon className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">
              {fullscreenIndex + 1} / {images.length}
            </div>

            {/* Main Image */}
            <motion.img
              key={fullscreenIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={images[fullscreenIndex]?.url}
              alt={images[fullscreenIndex]?.caption || title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            {images[fullscreenIndex]?.caption && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
                <div className="bg-black/50 px-4 py-2 rounded-lg">
                  {images[fullscreenIndex].caption}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;