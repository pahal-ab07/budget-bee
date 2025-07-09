"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef();  // ✅ Fixed variable name

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;  // ✅ Prevents accessing null

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          BeeBudget
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-Driven Finance Tracking for a Wealthier Future <br />
          Stay in Control of Your Money with BudgetBee – Track, Plan, and Grow with AI-Powered Insights!
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Start Your Journey Now
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" variant="outline" className="px-8">
              Start Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="">
            <Image 
              src="/Tracking.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="max-w-[1200px] w-full h-[600px] object-cover rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
