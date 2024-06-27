"use client";
import React, { useState, useEffect } from "react";
import { useGetShopQuery } from "@/lib/features/shop/shop";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export default function AboutPage({ params }) {
  const shopId = params.shopId;
  const [aboutpage, setAboutpage] = useState({});
  const { data, error, isLoading } = useGetShopQuery(shopId);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const homePageData = data.find((page) => page.name === "About");
      setAboutpage(homePageData);
    }
  }, [data]);

  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();
      router.push(`/${shopId}/blog`);
    };

    const blogLink = document.getElementById("blog");
    if (blogLink) {
      blogLink.addEventListener("click", handleClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
    };
  }, [router, shopId]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!aboutpage) {
    return <div>No home page found.</div>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: aboutpage.html }} />
      <style>{aboutpage.css}</style>
      <script>{aboutpage.js}</script>
    </div>
  );
}