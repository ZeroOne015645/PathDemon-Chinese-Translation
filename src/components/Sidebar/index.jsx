import React, { useState } from "react";
import StyledSidebar from "./Sidebar.styled";
import Slider from "@mui/material/Slider";
import {
	doChangeSize,
	doSetGenerating,
	doSetPathVisible,
	doSetSkip,
	doSetVisualizationOngoing,
	doSetReset,
	doChangeMazeType,
	doChangeSearchType,
	doChangeDelay,
} from "../../redux/Actions";
import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AlgoModal from "./AlgoModal";

function Sidebar({
	visualizationOngoing,
	setVisualizationOngoing,
	setGenerating,
	setPathVisible,
	setSkip,
	setReset,
	reset,
	changeSize,
	changeDelay,
	changeMazeType,
	changeSearchType,
	hiddenSidebarSetOpen,
	size,
	delay,
	mazeType,
	searchType,
}) {
	const [settings, setSettings] = useState({
		size,
		delay,
		mazeType,
		searchType,
	});
	const [algoModalOpen, setAlgoModalOpen] = useState(false);

	const handleChange = (e) => {
		setSettings((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		if (e.target.name === "size") {
			changeSize(e.target.value);
		} else if (e.target.name === "delay") {
			changeDelay(e.target.value);
		} else if (e.target.name === "mazeType") {
			changeMazeType(e.target.value);
		} else if (e.target.name === "searchType") {
			changeSearchType(e.target.value);
		}
	};

	const handleGenerate = (mode) => {
		if (hiddenSidebarSetOpen !== false) hiddenSidebarSetOpen(false);
		setVisualizationOngoing(true);
		setGenerating(mode);
		setPathVisible(false);
	};

	return (
		<StyledSidebar>
			<div className="sidebar-section">
				<div className="sidebar-element">
					網格大小
					<Slider
						disabled={visualizationOngoing}
						className="slider"
						name="size"
						value={settings.size}
						onChange={handleChange}
						step={1}
						min={10}
						max={70}
						valueLabelDisplay="auto"
						aria-label="size"
					/>
				</div>
				<div className="sidebar-element">
					延遲時間
					<Slider
						className="slider"
						name="delay"
						value={settings.delay}
						onChange={handleChange}
						min={0}
						max={500}
						valueLabelDisplay="auto"
						aria-label="delay"
					/>
				</div>
			</div>
			<div className="sidebar-section">
				<div className="sidebar-element">
					<FormControl fullWidth>
						<InputLabel className="label" id="select-label">
							迷宮演算法
						</InputLabel>
						<Select
							labelId="select-label"
							className="select"
							value={settings.mazeType}
							name={"mazeType"}
							onChange={handleChange}
						>
							<MenuItem value={"DFS"}>深度優先 (DFS)</MenuItem>
							<MenuItem value={"Kruskal"}>克魯斯克爾 (Kruskal)</MenuItem>
							<MenuItem value={"Prim"}>普林 (Prim)</MenuItem>
							<MenuItem value={"Recursive"}>遞迴分割 (Recursive)</MenuItem>
							<MenuItem value={"Aldous-Broder"}>
								阿爾多斯-布羅德 (Aldous-Broder)
							</MenuItem>
							<MenuItem value={"Wilson"}>威爾遜 (Wilson)</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="sidebar-element">
					<button
						disabled={visualizationOngoing}
						onClick={() => {
							handleGenerate("maze");
						}}
					>
						生成迷宮
					</button>
				</div>
			</div>
			<div className="sidebar-section">
				<div className="sidebar-element">
					<FormControl fullWidth>
						<InputLabel className="label" id="select-label">
							尋路演算法
						</InputLabel>
						<Select
							labelId="select-label"
							className="select"
							value={settings.searchType}
							name={"searchType"}
							onChange={handleChange}
						>
							<MenuItem value={"A*"}>A星 (A*)</MenuItem>
							<MenuItem value={"Dijkstra"}>戴克斯特拉 (Dijkstra)</MenuItem>
							<MenuItem value={"Greedy"}>貪婪演算法 (Greedy)</MenuItem>
							<MenuItem value={"Depth First"}>
								深度優先搜尋 (DFS)
							</MenuItem>
							<MenuItem value={"Breadth First"}>
								廣度優先搜尋 (BFS)
							</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="sidebar-element">
					<button
						disabled={visualizationOngoing}
						onClick={() => {
							handleGenerate("path");
						}}
					>
						生成路徑
					</button>
				</div>
			</div>
			<div className="sidebar-section">
				<div className="sidebar-element">
					<button
						value={false}
						disabled={!visualizationOngoing}
						onClick={() => {
							setSkip(true);
							if (hiddenSidebarSetOpen !== false)
								hiddenSidebarSetOpen(false);
						}}
					>
						跳過
					</button>
				</div>
				<div className="sidebar-element">
					<button
						value={reset}
						onClick={() => {
							setReset(true);
							if (hiddenSidebarSetOpen !== false)
								hiddenSidebarSetOpen(false);
						}}
					>
						清除網格
					</button>
				</div>
				<div className="sidebar-element">
					<button
						className="large"
						onClick={() => setAlgoModalOpen(true)}
					>
						演算法 <span>說明</span>
					</button>
				</div>
			</div>
			<AlgoModal open={algoModalOpen} setOpen={setAlgoModalOpen} />
		</StyledSidebar>
	);
}

const Actions = (dispatch) => ({
	changeSize: (size) => dispatch(doChangeSize(size)),
	changeDelay: (delay) => dispatch(doChangeDelay(delay)),
	setGenerating: (generating) => dispatch(doSetGenerating(generating)),
	setPathVisible: (bool) => dispatch(doSetPathVisible(bool)),
	setSkip: (bool) => dispatch(doSetSkip(bool)),
	setReset: (bool) => dispatch(doSetReset(bool)),
	changeMazeType: (mazeType) => dispatch(doChangeMazeType(mazeType)),
	changeSearchType: (searchType) => dispatch(doChangeSearchType(searchType)),
	setVisualizationOngoing: (visualizationOngoing) =>
		dispatch(doSetVisualizationOngoing(visualizationOngoing)),
});

const Props = (state) => ({
	visualizationOngoing: state.visualizationOngoing,
	reset: state.reset,
	mazeType: state.mazeType,
	searchType: state.searchType,
	size: state.size,
	delay: state.delay,
});

export default connect(Props, Actions)(Sidebar);
