import React, { useRef, useState } from "react";
import { LibraryIcon } from "../assets/icons/library";
import { LeftArrowIcon } from "../assets/icons/left-arrow";
import { RightArrowIcon } from "../assets/icons/right-arrow";
import { CrossIcon } from "../assets/icons/cross";
import { CategoryButton } from "./CategoryButton";
import { Playlists } from "./Playlists";

export const Library = ({ width }) => {
	const contentWrapper = useRef(null);
	const [libraryScrollPosition, setLibraryScrollPosition] =
		useState(0);
	const [scrollPosition, setScrollPosition] = useState("left");

	const [libraryCategory, setLibraryCategory] = useState("All");

	const handleScroll = (event) => {
		setLibraryScrollPosition(event.currentTarget.scrollTop);
	};

	return (
		<div className="rounded-md text-[#b3b3b3] bg-[#121212] h-full overflow-hidden flex flex-col">
			<h2
				className={`flex items-center gap-6 p-5 pl-6 font-bold ${
					(width <= 70) & (libraryScrollPosition !== 0) &&
					"shadow-bottom"
				}`}
			>
				<LibraryIcon size={22} />
				{width > 70 && <p>Library</p>}
			</h2>
			{width > 70 && (
				<div
					className={`relative flex items-center px-4 h-14 py-2 ${
						libraryScrollPosition !== 0 && "shadow-bottom"
					}`}
				>
					<button
						className={`bg-[#242424] flex items-center justify-center h-8 w-8 rounded-full absolute left-4 shadow-left ${
							scrollPosition === "left" ? "hidden" : ""
						} ${libraryCategory !== "All" ? "hidden" : ""}`}
						onClick={() => {
							setScrollPosition("left");
							contentWrapper.current.scrollLeft -= 1000;
						}}
					>
						<LeftArrowIcon size={18} />
					</button>
					<button
						className={`bg-[#242424] flex items-center justify-center h-8 w-8 rounded-full absolute right-4 shadow-right ${
							scrollPosition === "right" ? "hidden" : ""
						} ${libraryCategory !== "All" ? "hidden" : ""}`}
						onClick={() => {
							setScrollPosition("right");
							contentWrapper.current.scrollLeft += 1000;
						}}
					>
						<RightArrowIcon size={18} />
					</button>
					<div
						className="gap-2 h-8 overflow-x-scroll hide-scrollbar scroll-smooth grid grid-flow-col"
						ref={contentWrapper}
					>
						{libraryCategory !== "All" ? (
							<button
								onClick={() => setLibraryCategory("All")}
								className="bg-black h-8 w-8 flex items-center justify-center rounded-full"
							>
								<CrossIcon />
							</button>
						) : null}
						{libraryCategory === "Playlists" ||
						libraryCategory === "All" ? (
							<CategoryButton
								libraryCategory={libraryCategory}
								setLibraryCategory={setLibraryCategory}
								name="Playlists"
							/>
						) : null}
						{libraryCategory === "Artists" ||
						libraryCategory === "All" ? (
							<CategoryButton
								libraryCategory={libraryCategory}
								setLibraryCategory={setLibraryCategory}
								name="Artists"
							/>
						) : null}
						{libraryCategory === "Tracks" ||
						libraryCategory === "All" ? (
							<CategoryButton
								libraryCategory={libraryCategory}
								setLibraryCategory={setLibraryCategory}
								name="Tracks"
							/>
						) : null}
						{libraryCategory === "Albums" ||
						libraryCategory === "All" ? (
							<CategoryButton
								libraryCategory={libraryCategory}
								setLibraryCategory={setLibraryCategory}
								name="Albums"
							/>
						) : null}
						{libraryCategory === "Podcasts" ||
						libraryCategory === "All" ? (
							<CategoryButton
								libraryCategory={libraryCategory}
								setLibraryCategory={setLibraryCategory}
								name="Podcasts"
							/>
						) : null}
					</div>
				</div>
			)}
			<ul
				onScroll={handleScroll}
				className={`p-1 h-full overflow-y-scroll ${width <= 70 && "hide-scrollbar"}`}
			>
				<Playlists width={width} />
			</ul>
		</div>
	);
};

{/* <ul className="grid grid-flow-row p-2 h-0">
{libraryCategory === "Playlists" ||
libraryCategory === "All" ? (
	<Playlists />
) : null}
{libraryCategory === "Tracks" ||
libraryCategory === "All" ? (
	<TopTracks />
) : null}
{libraryCategory === "Artists" ||
libraryCategory === "All" ? (
	<TopArtists />
) : null}
</ul> */}