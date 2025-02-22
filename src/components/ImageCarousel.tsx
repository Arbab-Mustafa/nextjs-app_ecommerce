'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface CarouselProps {
  images: string[]
  interval?: number
}

export default function Component({ images, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [initialX, setInitialX] = useState(0)
  const [xOffset, setXOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX - initialX)
    setInitialX(e.touches[0].clientX - xOffset)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    e.preventDefault()
    setCurrentX(e.touches[0].clientX - initialX)
    setXOffset(e.touches[0].clientX - startX)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setInitialX(currentX)
    if (xOffset < -100) {
      goToNext()
    } else if (xOffset > 100) {
      goToPrevious()
    }
    setXOffset(0)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto rounded-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`overflow-hidden rounded-2xl shadow-lg h-[200px] transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateX(${xOffset}px)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out rounded-lg ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={index === 0}
              className="rounded-2xl"
            />
          </div>
        ))}
      </div>
      {/* <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button> */}
      {/* <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-75 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button> */}
      <div className="mt-2 flex justify-center space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-0.5 rounded transition-all ${
              index === currentIndex ? 'bg-orange-500 w-8' : 'bg-gray-300 w-5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}