import { useState } from "react";
import html2canvas from "html2canvas";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import "../../../../styles/app.css";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setPageName } from "@/lib/features/uiBuilder/status";

export function AlertDialogDemo({
  button,
  publishSaveClick,
  publishCancelClick,
}) {
  // Move useState to the top level of the component
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status.status);
  const pageName = useSelector((state) => state.status.pageName);
  console.log(pageName, status);
  const captureAndUploadScreenshot = async () => {
    const container = document.querySelector("#features");

    // Check if the container is not null
    if (!container) {
      console.error("Container not found");
      return;
    }
    try {
      const canvas = await html2canvas(container);
      const imgData = canvas.toDataURL("image/png");
      const binaryData = atob(imgData.split(",")[1]);
      const dataArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        dataArray[i] = binaryData.charCodeAt(i);
      }
      const blob = new Blob([dataArray], { type: "image/png" });
      const file = new File([blob], "screenshot.png", { type: "image/png" });
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("http://localhost:8000/shop/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Screenshot uploaded successfully");
      } else {
        setMessage("Failed to upload screenshot");
      }
    } catch (error) {
      console.error("Error capturing or uploading screenshot:", error);
      setMessage("Error capturing or uploading screenshot");
    }
  };

  const handleCLick = () => {
    // captureAndUploadScreenshot();
    localStorage.setItem("status", "publish");
    dispatch(setStatus("publish"));

    publishSaveClick();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="py-1  px-3 btn-primary rounded-lg"
          style={{
            backgroundColor: "#367bde",
            marginLeft: "1rem",
          }}
        >
          {button}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogOverlay className="fixed inset-0 bg-black z-[1000] opacity-30 " />

      <AlertDialogContent className="z-[1010]">
        <AlertDialogHeader>
          <AlertDialogTitle>Save?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to save changes you made?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={publishCancelClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            style={{
              backgroundColor: "#367bee",
            }}
            onClick={handleCLick}
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
