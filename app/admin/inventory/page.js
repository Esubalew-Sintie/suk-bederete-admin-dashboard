"use client"
import React from "react";
import {Admin} from '@/app/layouts/Admin'
import AdminWithOutStat from "@/app/layouts/adminWithOutStat";
import EnhancedTable from "@/app/components/Tables/product";
import { productHeadCells } from "@/util/headCells";

export default function InventoryPage() {
  
  const rows = [
    {
        
       productName: "Product A",
       productDescription: "Description for Product A",
       productVariant:["Variant 1", "Variant 2"],
       productCatagory:"Category A",
        price:"$100",
        inventoryStatus:"In Stock",
       images: ["/image1.jpg", "/image2.jpg"],
       tagsKeywords:  ["tag1", "tag2"],
    },
{
  
productName: "Product B",
productDescription:"Description for Product B",
productVariant: ["Variant 3", "Variant 4"],
productCatagory:"Category B",
price:"$200",
inventoryStatus:"Out of Stock",
images:["/image3.jpg", "/image4.jpg"],
tagsKeywords:["tag3", "tag4"],
}
// Add more rows as needed
];
  return (
    <Admin subtitle1="Total Product" subtitle2="total Store " subtitle3="out of Stock" subtitle4="All catagories">
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardBarChart /> */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
        </div>
      </div>
      <div className="flex flex-wrap mt-32">
				<EnhancedTable
					rows={rows}
					title={"Inventory Item"}
					headCells={productHeadCells}
					onButtonClick={(event, row) => console.log("Button clicked", row)} // Placeholder for button click handler
				/>
			</div>
    </Admin>
  );
}