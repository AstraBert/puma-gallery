import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { getImages } from "@/utils/actions"
import RefreshButton from "@/components/custom/RefreshButton"

// Type definition based on your Supabase schema
interface ImageData {
  id: number
  created_at: string
  filePath: string
  url: string
  caption: string
}

export default async function MainPage() {
  const data = await getImages() as ImageData[]

  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen p-4"
        style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg shadow-orange-200/30">
          <p className="text-xl text-orange-800 font-semibold text-center">No images found</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4"
      style={{ 
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        fontFamily: "'Comic Neue', cursive, sans-serif"
      }}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 tracking-wider"
            style={{ 
              fontFamily: "'Fredoka One', cursive, sans-serif",
              color: '#fc7e4c',
              letterSpacing: '2px'
            }}
          >
            PUMITO GALLERY
          </h1>
          <p className="text-lg text-orange-700/80 font-medium">
            Discover adorable moments captured in time ✨
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-orange-200/30">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {data.map((image) => (
                <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="group overflow-hidden border-0 transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-orange-400 bg-orange-50">
                        <Image
                          src={image.url}
                          alt={image.caption || `Image ${image.id}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={false}
                        />
                        
                        {/* Playful hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-400/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                        
                        {/* Caption card */}
                        <div className="absolute bottom-2 left-2 right-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div 
                            className="rounded-2xl p-3 shadow-lg"
                            style={{ background: '#fff5e4' }}
                          >
                            <p 
                              className="text-sm font-bold leading-tight mb-1"
                              style={{ 
                                fontFamily: "'Fredoka One', cursive, sans-serif",
                                color: '#4f3852'
                              }}
                            >
                              {image.caption}
                            </p>
                            <p className="text-xs text-orange-700/70">
                              {new Date(image.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious 
              className="hidden md:flex -left-12 lg:-left-16 border-0 shadow-lg transition-all duration-200 hover:scale-110 active:scale-125 active:-translate-y-1"
              style={{ 
                background: 'linear-gradient(90deg, #ffb09e, #f9c07d)',
                color: '#673066'
              }}
            />
            <CarouselNext 
              className="hidden md:flex -right-12 lg:-right-16 border-0 shadow-lg transition-all duration-200 hover:scale-110 active:scale-125 active:-translate-y-1"
              style={{ 
                background: 'linear-gradient(90deg, #ffb09e, #f9c07d)',
                color: '#673066'
              }}
            />
          </Carousel>

          {/* Image counter with playful styling */}
          <div className="text-center mt-6">
            <div 
              className="inline-block px-4 py-2 rounded-full shadow-md"
              style={{ 
                background: 'linear-gradient(90deg, #ffb09e, #f9c07d)',
                color: '#673066'
              }}
            >
              <p 
                className="text-sm font-bold"
                style={{ fontFamily: "'Fredoka One', cursive, sans-serif" }}
              >
                {data.length} adorable {data.length === 1 ? 'moment' : 'moments'} 💕
              </p>
            </div>
          </div>
        </div>
        <div className="max-h-screen flex items-center justify-center p-4">
        <RefreshButton />
        </div>
      </div>
    </div>
  )
}