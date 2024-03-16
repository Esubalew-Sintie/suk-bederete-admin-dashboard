import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {LiaSitemapSolid} from "react-icons/lia";
import {AddItemForm} from "./AddItemForm";

export function DialogDemo() {
	return (
		<Dialog className="overflow-y-auto">
			<DialogTrigger asChild>
				<Button variant="outline" className="flex gap-10">
					{" "}
					<LiaSitemapSolid size={24} /> Item
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[700px]   overflow-y-auto overflow-x-auto">
				<DialogHeader>
					<DialogTitle>Add Item</DialogTitle>
					{/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
				</DialogHeader>
				<AddItemForm />

				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
