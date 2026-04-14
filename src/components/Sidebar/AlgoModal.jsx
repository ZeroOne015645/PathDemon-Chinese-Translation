import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import AlgoModalStyled from "./AlgoModal.styles";
import { MenuItem, Select } from "@mui/material";
import { connect } from "react-redux";

function AlgoModal({ open, setOpen, mazeType, searchType }) {
	const outside = useRef(null);

	const [mainSection, setMainSection] = useState("mazes");
	const [maze, setMaze] = useState(mazeType);
	const [search, setSearch] = useState(searchType);

	useEffect(() => {
		setMaze(mazeType);
	}, [mazeType]);

	useEffect(() => {
		setSearch(searchType);
	}, [searchType]);

	function onClose(e) {
		if (outside.current === e.target) {
			setOpen(false);
		}
	}

	const handleChange = (e) => {
		if (e.target.name === "maze") {
			setMaze(e.target.value);
		} else {
			setSearch(e.target.value);
		}
	};

	let description;
	if (mainSection === "mazes") {
		switch (maze) {
			case "DFS":
				description = (
					<>
						<p>
							這個演算法是<span>深度優先搜尋 (Depth-First Search)</span> 演算法的<span>隨機化</span>版本，也是使用電腦生成迷宮最簡單的方法之一。
						</p>
						<p>
							將迷宮空間視為一個由許多單元格組成的大型網格（就像一個大型棋盤），每個單元格一開始都有<span>四面牆壁</span>。電腦從一個隨機的單元格開始，接著選擇一個尚未被訪問過的隨機相鄰單元格。電腦會<span>移除</span>兩個單元格之間的牆壁，將新單元格標記為<span>已訪問</span>，並將其加入佇列以利於後續的回溯 (Backtracking)。
						</p>
						<p>
							電腦持續這個過程，當一個單元格<span>沒有任何未訪問的相鄰單元格</span>時，就會被視為<span>死胡同 (Dead-end)</span>。當到達死胡同時，它會沿著路徑<span>回溯</span>，直到找到一個擁有未訪問相鄰單元格的單元格為止，接著訪問這個新的、未訪問的單元格來<span>繼續生成路徑</span>（從而建立新的分岔）。
						</p>
						<p>
							這個過程會一直持續，直到<span>每一個</span>單元格都被訪問過，此時電腦會一路回溯<span>回到起始單元格</span>。我們可以<span>確定</span>每一個單元格都被訪問到了。
						</p>
						<p>
							使用<span>深度優先搜尋</span>生成的迷宮具有<span>較低的分支因子 (Branching factor)</span>，並且<span>包含許多長走廊</span>，因為該演算法會在回溯之前盡可能深地沿著每個分支探索。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								選擇初始單元格，標記為已訪問並將其推入佇列。
							</li>

							<li>當佇列不為空時：</li>
							<ol>
								<li>
									從佇列中彈出 (Pop) 一個單元格並將其設為當前單元格。
								</li>
								<li>
									如果當前單元格有任何尚未被訪問過的相鄰單元格：
								</li>
								<ol>
									<li>將當前單元格推入佇列。</li>
									<li>
										從未訪問的相鄰單元格中選擇一個。
									</li>
									<li>
										移除當前單元格與所選單元格之間的牆壁。
									</li>
									<li>
										將所選單元格標記為已訪問並推入佇列。
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Kruskal":
				description = (
					<>
						<p>
							這個演算法是 Kruskal 演算法的隨機化版本。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								建立一個包含所有牆壁的列表，並為每個單元格建立一個集合，每個集合最初只包含該單元格本身。
							</li>

							<li>以隨機順序遍歷每一面牆壁：</li>
							<ol>
								<li>
									如果被這面牆隔開的兩個單元格屬於不同的集合：
								</li>
								<ol>
									<li>移除當前牆壁。</li>
									<li>
										將這兩個原本被隔開的單元格所在的集合聯集。
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Prim":
				description = (
					<>
						<p>
							這個演算法是 Prim 演算法的隨機化版本。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>從一個充滿牆壁的網格開始。</li>

							<li>
								隨機挑選一個單元格，將其標記為迷宮的一部分。將該單元格周圍的牆壁加入牆壁列表。
							</li>
							<li>當牆壁列表中還有牆壁時：</li>
							<ol>
								<li>
									從列表中隨機挑選一面牆。如果這面牆所隔開的兩個單元格中，只有一個被訪問過，則：
								</li>
								<ol>
									<li>
										將這面牆變成通道，並將那個未被訪問過的單元格標記為迷宮的一部分。
									</li>
									<li>
										將這個新加入單元格周圍的牆壁加入牆壁列表。
									</li>
								</ol>
								<li>將該牆壁從列表中移除。</li>
							</ol>
						</ol>
					</>
				);
				break;
			case "Recursive":
				description = (
					<>
						<p>
							可以使用遞迴分割法 (Recursive Division) 來建立迷宮，其運作方式如下：從一個沒有任何牆壁的迷宮空間開始，我們稱之為一個隔間 (Chamber)。用隨機位置的牆壁（或多面牆）將隔間一分為二，每面牆上都包含一個隨機位置的通道開口。接著，對劃分出的子隔間遞迴重複此過程，直到所有隔間都達到最小尺寸。
						</p>
						<p>
							這種方法產生的迷宮會有一些長而直的牆壁橫跨整個空間，使得人們更容易看出哪些區域是死路而應當避開。
						</p>
					</>
				);
				break;
			case "Aldous-Broder":
				description = (
					<>
						<p>
							Aldous-Broder 演算法由於其隨機性，能夠產生均勻生成樹 (Uniform spanning trees)。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								隨機挑選一個單元格作為當前單元格，並將其標記為已訪問。
							</li>

							<li>當還有未被訪問過的單元格時：</li>
							<ol>
								<li>隨機挑選一個相鄰單元格。</li>
								<li>
									如果所選的相鄰單元格尚未被訪問過：
								</li>
								<ol>
									<li>
										移除當前單元格與所選相鄰單元格之間的牆壁。
									</li>
									<li>
										將所選相鄰單元格標記為已訪問。
									</li>
								</ol>
								<li>
									將所選相鄰單元格設為當前單元格。
								</li>
							</ol>
						</ol>
					</>
				);
				break;
			case "Wilson":
				description = (
					<>
						<p>
							上述所有演算法都有不同種類的<span>偏差 (Biases)</span>：深度優先搜尋偏好長走廊，而 Kruskal / Prim 演算法則偏好大量短小的死胡同。另一方面，Wilson 演算法使用<span>消除迴圈的隨機漫步 (Loop-erased random walks)</span>，能從所有迷宮的均勻分佈中產生<span>無偏差 (Unbiased)</span> 的樣本。
						</p>
						<p>
							演算法開始時，我們先初始化迷宮，<span>任意選擇一個單元格加入迷宮</span>。接著，我們從另一個任意選擇的單元格開始，並<span>執行隨機漫步，直到我們走到一個已經在迷宮中的單元格</span>。然而，如果隨機漫步在任何時候走到了<span>它自己剛才走過的路徑</span>（形成了一個迴圈），我們在繼續前進之前會<span>將這個迴圈從路徑中消除</span>。當路徑接觸到迷宮主體時，我們<span>將這條路徑加入迷宮中</span>。接著，我們再從另一個任意起始點執行<span>另一次</span>消除迴圈的隨機漫步，重複這個過程直到所有單元格都被填滿。
						</p>
						<p>
							無論我們使用哪種方法來任意選擇起始單元格，這個過程都能保持無偏差。因此，為了簡單起見，我們總是可以按照由左至右、由上至下的順序，選擇第一個尚未被填滿的單元格作為起點。
						</p>
					</>
				);
				break;
			default:
				description = <></>;
		}
	} else {
		switch (search) {
			case "A*":
				description = (
					<>
						<p>
							A* 是一種啟發式搜尋 (Informed search) 演算法，保證能找到最短路徑。
						</p>
						<p>
							A* 是 Dijkstra 和貪婪演算法 (Greedy) 的結合。它利用「從起始節點出發的實際距離」加上「到達目標節點的啟發式預估距離」。當我們找到目標節點時，演算法就會終止。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								將所有節點的距離 dis[v] 設為 INT_MAX（包含從起始節點出發的距離 + 每個節點的啟發值）。
							</li>

							<li>
								將起始節點的距離 dis[root] = 0 + heuristic(root, goal)（起始節點到自身的距離 + 啟發值）。
							</li>
							<li>將起始節點加入優先佇列 (Priority queue)。</li>
							<li>
								只要佇列不為空，就持續迴圈：
							</li>
							<ol>
								<li>
									在每次迴圈中，選擇佇列中（從起始點的距離 + 啟發值）最小的節點（起始節點會最先被選中）。
								</li>
								<li>
									將當前選中的節點從佇列中移除 (vis[current] = true)。
								</li>
								<li>
									如果當前節點是目標節點，則回傳它。
								</li>
								<li>
									對當前節點的每一個子節點，執行以下操作：
								</li>
								<ol>
									<li>
										指派 temp = distance(root, current) + distance(current, child) + heuristic(child, goal)。
									</li>
									<li>
										如果
										{` temp < dis[child]，則指派 dis[child] = temp`}
										。這表示我們找到了一條通往子節點更短的路徑。
									</li>
									<li>
										如果子節點不在佇列中，則將其加入佇列（因此它現在再次被標記為未訪問）。
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Dijkstra":
				description = (
					<>
						<p>
							Dijkstra 是一種啟發式搜尋演算法，保證能找到最短路徑。
						</p>
						<p>
							Dijkstra 演算法試圖找出從起始（根）節點到每一個節點的最短路徑，因此我們可以得到從起始節點到目標的最短路徑。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								將所有節點的距離 dis[v] 設為 INT_MAX（從起始節點到所有其他節點的距離）。
							</li>

							<li>
								將起始節點的距離 dis[root] = 0（起始節點到自身的距離）。
							</li>
							<li>將所有節點加入優先佇列。</li>
							<li>
								只要佇列不為空，就持續迴圈：
							</li>
							<ol>
								<li>
									在每次迴圈中，選擇佇列裡距離起始節點最近的節點（起始節點會最先被選中）。
								</li>
								<li>
									將當前選中的節點從佇列中移除 (vis[current] = true)。
								</li>
								<li>
									如果當前選中的節點是目標節點，則回傳它。
								</li>
								<li>
									對當前節點的每一個子節點，執行以下操作：
								</li>
								<ol>
									<li>
										如果子節點不在佇列中（已被訪問過），則跳過本次迭代。
									</li>
									<li>
										指派 temp = dis[current] + (從當前節點到子節點的距離)。
									</li>
									<li>
										如果{" "}
										{
											"temp < dis[child]，則指派 dis[child] = temp"
										}
										。這表示我們找到了一條通往子節點更短的路徑。
									</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Greedy":
				description = (
					<>
						<p>
							貪婪演算法 (Greedy) 是一種啟發式搜尋演算法，但不保證能找到最短路徑。
						</p>
						<p>
							貪婪演算法在每個階段都會根據經驗法則（啟發式預估，Heuristics）做出選擇。啟發式距離目標節點最短的節點將會被優先探索。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								將所有節點的距離 dis[v] 設為 INT_MAX（從每個節點到目標節點的預估距離）。
							</li>

							<li>
								將起始節點的距離 dis[root] = 0（起始節點到自身的距離）。
							</li>
							<li>將起始節點加入優先佇列。</li>
							<li>
								只要佇列不為空，就持續迴圈：
							</li>
							<ol>
								<li>
									在每次迴圈中，選擇佇列裡距離目標節點啟發式距離最小的節點（起始節點會最先被選中）。
								</li>
								<li>
									將當前選中的節點從佇列中移除 (vis[current] = true)。
								</li>
								<li>
									如果當前選中的節點是目標節點，則回傳它。
								</li>
								<li>
									對當前節點的每一個子節點，執行以下操作：
								</li>
								<ol>
									<li>
										如果子節點已經被訪問過（之前已從佇列中移除），則跳過本次迭代。
									</li>
									<li>
										指派 dis[current] = heuristics(current, goal)（即當前節點的啟發值）。
									</li>
									<li>將子節點加入佇列。</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Depth First":
				description = (
					<>
						<p>
							深度優先搜尋 (Depth-First Search) 不是一種啟發式搜尋演算法，且不保證能找到最短路徑。
						</p>
						<p>
							它從起始節點開始，探索其中一個相鄰節點的子樹，然後再移動到下一個相鄰節點的子樹，依此類推。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>將起始節點加入佇列（此處實作通常為堆疊 Stack 行為）。</li>

							<li>
								只要佇列不為空，就持續迴圈：
							</li>
							<ol>
								<li>
									取得佇列頂部的節點 (current)，將其標記為已訪問並移除它。
								</li>
								<li>
									對當前節點的每一個未被訪問過的相鄰節點，執行以下操作：
								</li>
								<ol>
									<li>
										檢查它是否為目標節點。如果是，則回傳此相鄰節點。
									</li>
									<li>否則，將其推入佇列中。</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			case "Breadth First":
				description = (
					<>
						<p>
							廣度優先搜尋 (Breadth-First Search) 不是一種啟發式搜尋演算法，但保證能找到最短路徑（在無權重圖中）。
						</p>
						<p>
							它從起始節點開始，在移動到下一層之前會先探索當前層級的所有相鄰節點。接著，它會探索這些相鄰節點的相鄰節點，依此類推。
						</p>
						<h3>演算法步驟</h3>
						<ol>
							<li>
								將起始節點加入佇列，並標記為已訪問（已探索過）。
							</li>

							<li>
								只要佇列不為空，就持續迴圈：
							</li>
							<ol>
								<li>
									取得並移除佇列最前面的節點 (current)。
								</li>
								<li>
									對當前節點的每一個未被訪問過的相鄰節點，執行以下操作：
								</li>
								<ol>
									<li>將其標記為已訪問。</li>
									<li>
										檢查它是否為目標節點。如果是，則回傳它。
									</li>
									<li>否則，將其推入佇列中。</li>
								</ol>
							</ol>
						</ol>
					</>
				);
				break;
			default:
				description = <></>;
		}
	}

	return ReactDOM.createPortal(
		<AnimatePresence>
			{open && (
				<AlgoModalStyled ref={outside} onClick={onClose}>
					<motion.div
						animate={{ y: 0 }}
						initial={{ y: "-50vh" }}
						exit={{ y: "-100vh" }}
						transition={{ ease: "easeOut", duration: 0.1 }}
						className="modal-bg"
					>
						<div className="main-btns">
							<button
								className={`main-btn ${
									mainSection === "mazes"
										? "current-main"
										: null
								}`}
								onClick={() => setMainSection("mazes")}
							>
								迷宮生成 (MAZES)
							</button>
							<button
								className={`main-btn ${
									mainSection === "searches"
										? "current-main"
										: null
								}`}
								onClick={() => setMainSection("searches")}
							>
								尋路演算法 (SEARCHES)
							</button>
						</div>
						<div className="content">
							{mainSection === "mazes" ? (
								<Select
									labelId="select-label"
									className="select"
									value={maze}
									name={"maze"}
									onChange={handleChange}
								>
									<MenuItem value={"DFS"}>DFS (深度優先)</MenuItem>
									<MenuItem value={"Kruskal"}>Kruskal</MenuItem>
									<MenuItem value={"Prim"}>Prim</MenuItem>
									<MenuItem value={"Recursive"}>遞迴分割 (Recursive)</MenuItem>
									<MenuItem value={"Aldous-Broder"}>Aldous-Broder</MenuItem>
									<MenuItem value={"Wilson"}>Wilson</MenuItem>
								</Select>
							) : (
								<Select
									className="select"
									value={search}
									name={"search"}
									onChange={handleChange}
								>
									<MenuItem value={"A*"}>A*</MenuItem>
									<MenuItem value={"Dijkstra"}>Dijkstra</MenuItem>
									<MenuItem value={"Greedy"}>Greedy (貪婪)</MenuItem>
									<MenuItem value={"Depth First"}>深度優先 (Depth First)</MenuItem>
									<MenuItem value={"Breadth First"}>廣度優先 (Breadth First)</MenuItem>
								</Select>
							)}
							{description}
							<button
								onClick={() => setOpen(false)}
								className="close-modal"
							>
								<CloseIcon sx={{ fontSize: "2.7rem" }} />
							</button>
						</div>
					</motion.div>
				</AlgoModalStyled>
			)}
		</AnimatePresence>,
		document.getElementById("portal")
	);
}

const Props = (state) => ({
	mazeType: state.mazeType,
	searchType: state.searchType,
});

export default connect(Props, null)(AlgoModal);
