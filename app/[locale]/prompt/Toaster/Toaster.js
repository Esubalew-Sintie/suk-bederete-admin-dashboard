import toast, { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: "",
        style: {
          background: "#2563CF",
          color: "#fff",
        },

        // Default options for specific types
        loading: {
          duration: "",
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
        success: {
          duration: "",
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
