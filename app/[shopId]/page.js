"use client";
import React, { useState, useEffect } from "react";
import { useGetShopQuery } from "@/lib/features/shop/shop";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function Shop({ params }) {
    const shopId = params.shopId;
    const [homepage, setHomepage] = useState({});
    const { data, error, isLoading } = useGetShopQuery(shopId);
    const router = useRouter();

    useEffect(() => {
        if (data) {
            const homePageData = data.find(page => page.name === 'Home');
            setHomepage(homePageData);
        }
    }, [data]);

    useEffect(() => {
        const handleClick = (event, link) => {
            event.preventDefault();
            if (link === 'contact') {
                router.push(`/${shopId}/contact`);
                return;
            }else if (link === 'blog') {
                router.push(`/${shopId}/blog`);
                return;
            } else if (link === 'about') {
            router.push(`/${shopId}/about`);
            }
        };
        const handleExploreClick = (event) => {
            event.preventDefault();
           router.push(`/${shopId}/product-list`)
        };

        const attachEventListeners = () => {
            const blogLink = document.getElementById('blog');
            const contactLink = document.getElementById('contact');
            const aboutLink = document.getElementById('about');
            if (blogLink) {
                blogLink.addEventListener('click', (event) => handleClick(event, 'blog'));
            }
            if (contactLink) {
                contactLink.addEventListener('click', (event) => handleClick(event, 'contact'));
            }
            if (aboutLink) {
                aboutLink.addEventListener('click', (event) => handleClick(event, 'about'));
            }
        };

        const explore = document.getElementById('explore');
        if(explore){
            explore.addEventListener('click', (event) => handleExploreClick(event))
        }

        // Attach event listeners when homepage content is set
        if (homepage.html) {
            attachEventListeners();
        }

        // Cleanup event listener on component unmount
        return () => {
            const blogLink = document.getElementById('blog');
            if (blogLink) {
                blogLink.removeEventListener('click', handleClick);
            }
        };
    }, [router, shopId, homepage.html]);

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!homepage) {
        return <div>No home page found.</div>;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: homepage.html }} />
            <style>{homepage.css}</style>
            <script>{homepage.js}</script>
        </div>
    );
}
