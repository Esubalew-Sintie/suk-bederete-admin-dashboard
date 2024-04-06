import React, {useEffect, useState, useRef} from "react";
import Grapesjs from "grapesjs";
// import 'grapesjs/dist/css/grapes.min.css';
import dynamicConfig from "./WithGrapesjs";
import "../../../styles/app.css";
import Drawer from "@mui/material/Drawer";
import {TuneOutlined} from "@mui/icons-material";
import {style} from "./components/common";
import {KeyboardBackspaceOutlined} from "@mui/icons-material";
import {useRouter} from "next/navigation";
import {data} from "autoprefixer";
import Link from "next/link";
import {
	useGetWebBuilderQuery,
	useUpdateTemplateMutation,
	useUpdatePageContentMutation
} from "@/lib/features/webBuilder/webBuilder";

const filterAssets = (assets, group) => {
	const images = assets
		? assets.map((items) => {
				if (items.group === group) {
					return items.url;
				}
		  })
		: [];
	const imageData = images.filter((items) => {
		if (!undefined) {
			return items;
		}
	});
	return imageData;
};

const WithGrapesjs = ({data, page, templateId}) => {
	const [pageContent, setpageContent] = useState({})
	//   console.log(templateId);
	const handlePageChange = (e) => {
		const selectedPageName = e.target.value;
		const selectedPage = page.find(pa => pa.name === selectedPageName);
		setpageContent(selectedPage)
	
		if (selectedPage && editor.getHtml() !== selectedPage.html) {
		  editor.setComponents(selectedPage.html);
		  editor.setStyle(selectedPage.css);
		}
		
	
		setsettingOpen({
		  ...settingOpen,
		  name: selectedPageName,
		  pageId: selectedPage.id,
		});
	 };
	

	

	const initialHtmlState = {
		html: "",
		css: "",
		assets: [],
		custom_body: `<script>console.log('body')</script>`,
		custom_footer: `<script>console.log('footer')</script>`,
		custom_head: '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">',
	};
	const router = useRouter();

	/** props */

	/** initial mount ref */
	const isInitialMount = useRef(true);

	const [initialComponents, setInitialComponents] = useState(initialHtmlState);
	const [editor, setEditor] = useState({});
	const [builder, setBuilder] = useState({
		panelRight: false,
	});
	const [settingOpen, setsettingOpen] = useState({
		name: "",
		domain: "",
		pageId:null,
		open: false,
	});

	useEffect(() => {
		if (page) {
		   // Filter the data to include only the page with the name "home"
		   const homePage = page.find((pa) => pa.name === "Home");
		   // If a home page is found, set it as the initial pageContent
		   if (homePage) {
			 setpageContent(homePage);
		   } else {
			 // If no home page is found, you can set the first page as the initial pageContent
			 // or handle this case as needed
			 setpageContent(data[0]);
		   }
		}
		if (data) {
			const homePage = data.find((page) => page.name === "home");
			const pageToRender = homePage || data[0]; // If home page not found, render the first page
			console.log(pageToRender.content.html)
			setInitialComponents({
			  html: pageToRender?.content.html,
			  css: pageToRender?.content.css,
			  custom_head: pageToRender.custom_head || "",
			  custom_footer: pageToRender.custom_footer || "",
			});
			setsettingOpen({
			  name: pageToRender.name,
			  domain: pageToRender?.customdomain || "",
			  open: false,
			});
		  }
		}, [data, page]);

	/** Grapes js Initialization */
	const loadGrapesJs = async () => {
		const editor = await Grapesjs.init(dynamicConfig());
		const assetManager = editor.AssetManager;
		setEditor(editor);
		addCommands(editor);
		addDevices(editor);
		isStylesOpen(editor);
		imageUploader(editor);
		addStyleManager(editor);
		addPage(editor);
		onLoad(editor);
		const canvas = editor.Canvas;
		// assetManager.add(assets);
		// setTimeout(addStyleManager(editor),0); 
		const selected = editor.getSelected();
		// console.log(editor.getSelected);
		// Scroll smoothly (this behavior can be polyfilled)
		// canvas.scrollTo(selected, { alignToTop : false });
		canvas.scrollTo(selected, {behavior: "smooth"});
		// Force the scroll, even if the element is alredy visible
		canvas.scrollTo(selected, {force: true});
		// editor.StyleManager.getProperty('typography', 'Rubik');
	};

	/** handle open style container */
	const handleopen = () => {
		setBuilder({...builder, panelRight: true});
	};

	/** handle close style container */
	const handleClose = () => {
		const ele = window?.editor?.getSelected();
		window.editor?.selectToggle(ele);
		setBuilder({...builder, panelRight: false});
	};

	
	/** after loaading of grapejs  */
	const onLoad = (editor) => {
		const categories = editor.BlockManager.getCategories();
	
		// Assuming `data` is the prop that contains the updated content
		const homePage = data.find((page) => page.name === "home");
		const pageToRender = homePage || data[0]; // If home page not found, render the first page
	
		// Set initial HTML in builder using the updated data
		editor.setComponents(pageToRender?.content.html);
		console.log(pageToRender);
	
		// Setting CSS
		editor.setStyle(pageToRender?.content.css);
	
		/** Find block categories and make default open false */
		categories.forEach((category) => {
			category.set("open", false).on("change:open", (opened) => {
				opened.get("open") &&
					categories.each((category) => {
						category !== opened && category.set("open", false);
					});
			});
		});
	};

	/** Load custom data */
	// const loadCustomData = () => {
	//   const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
	//   codeViewer.set({
	//     ...{ codeName: 'htmlmixed', theme: 'hopscotch', readOnly: 0 },
	//   });
	//   editor.on('load', onLoad);
	// };

	/** add commands */
	const addCommands = (editor) => {
		const commands = editor.Commands;
		commands.getAll();
		commands.add("set-device-xs", {
			run(editor) {
				editor.setDevice("Mobile");
			},
		});
		commands.add("set-device-sm", {
			run(editor) {
				editor.setDevice("Tablet");
			},
		});
		commands.add("set-device-md", {
			run(editor) {
				editor.setDevice("Medium");
			},
		});
		commands.add("set-device-lg", {
			run(editor) {
				editor.setDevice("Large");
			},
		});
		commands.add("set-device-xl", {
			run(editor) {
				editor.setDevice("Desktop");
			},
		});
		commands.add("open-assset-manager", {
			run(editor) {
				// console.log(EventTarget);
				const myCommands = commands.get("core:open-assets");
				myCommands.run(editor, {target: "_blank"});
			},
		});
	};

	const addPage = (editor) => {};

	// add devices
	const addDevices = (editor) => {
		const deviceManager = editor.DeviceManager;
		deviceManager.add("Mobile", "385px", {
			width: "385px", //width for mobile size
			name: "Mobile", // device name
			widthMedia: "576px", // the width that will be used for the CSS media
		});
	};

	/** component and canvas action events */
	const isStylesOpen = (editor) => {
		editor.on("component:selected", handleopen);
		editor.on("component:deselected", handleClose);
		editor.on("run:preview:before", function () {});
	};

	// add dynamic styles
	const addStyleManager = (editor) => {
		const styleManager = editor.StyleManager;
		const sector = styleManager.getSector("advanced");
		/** added custom fonts */
		const fontProperty = styleManager.getProperty("appearance", "font-family");
		// let list = fontProperty.get('list');
		// list.push({ value: 'Manrope, sans-serif', name: 'Manrope' });
		// list.push({ value: 'Nunito, sans-serif', name: 'Nunito' });
		// list.push({ value: 'Segoe UI', name: 'Segoe UI' });
	};

	// image upload
	const imageUploader = (editor) => {
		editor.on("asset:upload:start", () => {
			//  console.log('start');
		});
		editor.on("asset:upload:error", (err) => {
			//  console.log('errrr', err);
		});
		editor.on("asset:add", () => {
			//  console.log('add');
		});
		editor.on("asset:upload:response", (response) => {
			const images = [];
			for (let i = 0; i < response.length; i++) {
				images.push({type: "image", src: response[i]});
			}
			editor.AssetManager.add(images);
		});
		editor.on("asset:upload:end", () => {
			// console.log('end');
		});
		editor.on("canvas:drop", function (e) {});
		editor.on("canvas:dragenter", function () {
			//console.log('dragenter');
			editor.runCommand("sw-visibility");
			editor.runCommand("core:component-outline");
			// console.log(document.getElementsByClassName('gjs-frame'));
		});
		editor.on("canvas:drop", function () {
			//console.log('drop');
			editor.stopCommand("sw-visibility");
			// document.getElementsByClassName('gjs-frame').classList.add('h-100');
		});
	};
	/** Life cycle method for loading grapesjs */
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			loadGrapesJs();
		}
		//else {
		//   loadCustomData();
		// }
	}, [editor]);

	const toggleDrawer = () => {
		setsettingOpen({
			...settingOpen,
			open: !settingOpen.open,
		});
	};

	const handleUpdatePage = (e) => {
		e.preventDefault();
		props.updatePage({
			page_id: data._id,
			body: {
				name: settingOpen.name,
				customdomain: settingOpen.domain,
			},
		});
		toggleDrawer();
	};

	const updatePage = () => {
		props.updatePage({
			page_id: data._id,
			body: {
				content: {
					html: editor.getHtml(),
					css: editor.getCss(),
					customheader: initialComponents.custom_head,
					customfooter: initialComponents.custom_footer,
				},
			},
		});
	};

	const previewPage = () => {
		window.open(data.live_url, "_blank");
	};

	const [updateTemplate, {isLoading: isUpdating}] = useUpdatePageContentMutation();
	const updatePageHandler = async () => {
		try {
		   const templateContent = {
			 html: editor.getHtml(),
			 css: editor.getCss(),
		   };
	   
		   console.log('Template content to be sent to the backend:', templateContent.html)
		   const response = await updateTemplate({
			 templateId: templateId,
			 page_id: pageContent.id, // Use the selected page's ID
			 content: templateContent,
		   });
	   
		   // Handle the successful response
		   console.log('Updated template:', response.data.html);
		} catch (error) {
		   // Handle any errors
		   console.error('Error updating template:', error);
		}
	   };
	return (
		<div>
			<Drawer anchor={"right"} open={settingOpen.open} onClose={toggleDrawer}>
				<div style={{padding: "1rem"}}>
					<form onSubmit={handleUpdatePage}>
					<div id="Page-name" className="field-wrapper input">
			<label htmlFor="page-name">Page Name</label>

			<select
				id="name"
				name="page-name"
				className="form-control"
				value={settingOpen.name}
				onChange={handlePageChange}
			>
				{data.map((page, index) => (
					<option key={index} value={page.name}>
						{page.name}
					</option>
				))}
			</select>
			</div>
						<div
							id="Domain-name"
							className="field-wrapper input"
							style={{marginBottom: "1rem", marginTop: "1rem"}}
						>
							<label htmlFor="domain-name">Domain Name</label>
							<input
								id="domain"
								name="domain-name"
								type="text"
								className="form-control"
								placeholder="Type your domain name"
								value={settingOpen.domain}
								onChange={(e) => {
									setsettingOpen({
										...settingOpen,
										domain: e.target.value,
									});
								}}
							/>
						</div>
						<button
							onClick={() => handleUpdatePage()}
							className="btn btn-primary"
						>
							Save
						</button>
					</form>
				</div>
			</Drawer>
			<div className="panel__top">
				{/* <div>
        </div> */}
				<div className="panel__switcher">
					<KeyboardBackspaceOutlined
						onClick={() => router.back()}
						className="go_back"
					/>
				</div>

				<div className="views-actions" style={{position: "static"}}></div>

				<div className="panel-action">
					<button className="btn btn-primary" onClick={() => updatePageHandler ()}>
						Save
					</button>
					{pageContent.id && (
 <Link href={`/preview/${templateId}/${pageContent.id}`} target="_blank" rel="noopener noreferrer">
    <button
      className="btn btn-primary"
      style={{marginLeft: "1rem"}}
    >
      Preview
    </button>
 </Link>
)}
					<TuneOutlined
						style={{marginLeft: "1rem", cursor: "pointer"}}
						fontSize="medium"
						onClick={toggleDrawer}
					/>
				</div>
			</div>
			<div className="editor-row ml-4">
				<div id="blocks" />
				<div className="editor-canvas">
					<div id="gjs">
						{/* {template?.html}
            <h1>Hello world</h1> */}
					</div>
				</div>
				<div
					className="panel__right"
					style={builder.panelRight ? {display: "block"} : {display: "none"}}
				>
					<div className="close-icon">
						<i
							className="crossCircle"
							style={{cursor: "pointer", color: "black"}}
							onClick={handleClose}
						></i>
					</div>
					<div id="traits-container" />
					<div className="layers-container" />
					<div className="styles-container" />
				</div>
			</div>
		</div>
	);
};

export default WithGrapesjs;