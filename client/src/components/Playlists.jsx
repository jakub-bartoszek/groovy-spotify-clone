import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/spotifyDataSlice";
import { NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export const Playlists = () => {
	const token = useSelector(selectToken);
	const [playlists, setPlaylists] = useState([]);

	useEffect(() => {
		const getPlaylist = async () => {
			const response = await axios.get(
				`https://api.spotify.com/v1/me/playlists/`,
				{
					headers: {
						Authorization: "Bearer " + token,
						"Content-Type": "application/json"
					}
				}
			);
			const items = response.data.items;
			setPlaylists(items);
		};

		getPlaylist();
	}, [token]);

	return (
		<>
			<li key={nanoid()}>
				<NavLink to="/liked">
					<div className="flex items-center gap-3 hover:bg-[#1a1a1a] rounded-md p-2 playlist">
						<img
							src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
							alt="Liked songs"
							className="h-12 w-12 rounded-md"
						></img>
						<p>Liked songs</p>
					</div>
				</NavLink>
			</li>
			{playlists.map((playlist) => (
				<li key={playlist.id}>
					<NavLink to={`/playlists/${playlist.id}`}>
						<div className="flex items-center gap-3 hover:bg-[#1a1a1a] rounded-md p-2 playlist">
							{playlist.images.length !== 0 ? (
								<img
									className="h-12 w-12 rounded-md"
									alt="playlist cover"
									src={playlist.images[0].url}
								/>
							) : (
								<div className="bg-black h-12 w-12 rounded-md" />
							)}

							<div>
								<p className=" font-bold">{playlist.name}</p>
								<p className="text-sm text-[#a4a4a4]">
									Playlist • {playlist.owner.display_name}
								</p>
							</div>
						</div>
					</NavLink>
				</li>
			))}
		</>
	);
};