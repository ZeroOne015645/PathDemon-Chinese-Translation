import React from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import InfoModalStyled from "./InfoModal.styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FlagIcon from "@mui/icons-material/Flag";
import { motion, AnimatePresence } from "framer-motion";

export default function InfoModal({ open, setOpen }) {
	const outside = React.useRef(null);

	function onClose(e) {
		if (outside.current === e.target) {
			setOpen(false);
		}
	}

	return ReactDOM.createPortal(
		<AnimatePresence>
			{open && (
				<InfoModalStyled ref={outside} onClick={onClose}>
					<motion.div
						animate={{ y: 0 }}
						initial={{ y: "-50vh" }}
						exit={{ y: "-100vh" }}
						transition={{ ease: "easeOut", duration: 0.1 }}
						className="modal-bg"
					>
						<button
							onClick={() => setOpen(false)}
							className="close-modal"
						>
							<CloseIcon sx={{ fontSize: "2.7rem" }} />
						</button>
						<h3>圖例說明</h3>
						<div className="legend">
							<div className="legend-section">
								<div className="node start">
									<PlayArrowIcon
										sx={{ fontSize: "1.8rem" }}
									/>
								</div>
								起點節點
							</div>
							<div className="legend-section">
								<div className="node target">
									<FlagIcon sx={{ fontSize: "1.8rem" }} />
								</div>
								目標節點
							</div>
							<div className="legend-section">
								<div className="node empty"></div>未訪問節點
							</div>
							<div className="legend-section">
								<div className="node wall"></div>牆壁節點
							</div>
							<div className="legend-section">
								<div className="node visited"></div>已訪問節點
							</div>
							<div className="legend-section">
								<div className="node queued"></div>待訪問節點
							</div>
							<div className="legend-section">
								<div className="node path"></div>路徑節點
							</div>
						</div>
					</motion.div>
				</InfoModalStyled>
			)}
		</AnimatePresence>,
		document.getElementById("portal")
	);
}
