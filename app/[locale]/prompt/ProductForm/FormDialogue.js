import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddProduct() {
  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button className=" bg-[#367bee] my-3"> Add Product</Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black z-[1000] opacity-30 " />
      <DialogContent className="z-[1200] max-w-[60%] h-[95vh]   overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Provide product for each type of product you have.
          </DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
}
