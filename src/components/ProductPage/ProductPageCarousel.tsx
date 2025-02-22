'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface CarouselProps {
  images: string[]
  interval?: number
}

export default function ProductPageCarousel({ images, interval = 5000 }: CarouselProps) {
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
      className="relative w-full max-w-3xl rounded-lg"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`overflow-hidden rounded-2xl h-[314px] mt-6 mx-10 transition-transform duration-500 ease-in-out`}
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
              sizes=""
              style={{ objectFit: 'contain' }}
              priority={index === 0}
              className="pb-5"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-0.5 rounded transition-all ${
              index === currentIndex ? 'bg-gray-500 w-8' : 'bg-gray-300 w-5'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}