import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";

export default function NotificationPop({notification,setNotification}) {
	const handleClick = () => {
        // Set notifications to an empty array
        // After 4 seconds, reset notifications to an empty array again
        setTimeout(() => {
            setNotification([]);
        }, 7000);
    };
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" onClick={handleClick} className='mr-5 ml-2 relative'>
					{" "}
                    <IoMdNotifications size={25} />
					{notification?.length>0 && <p className=' rounded-full bg-red-300 w-5 h-5 absolute top-0 right-1'>{ notification?.length}</p>}
				</Button>
			</PopoverTrigger>
			{notification?.length > 0 && (

				<PopoverContent className="w-80">
					<div className="grid gap-4">
						{notification?.map((notification, index) => (
							<Link href='#order' key={index} className="space-y-2 flex gap-5 items-center  hover:bg-blue-200">
								<h4 className="font-medium ">{notification.type} order with ID </h4>
								<p className="text-xl font-bold flex items-end">
									{notification.id}
								</p>
							</Link>
						))}
					</div>
				</PopoverContent>
)}
		</Popover>
	);
}
