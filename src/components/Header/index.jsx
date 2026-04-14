import { StyledHeader } from "./Header.styles";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState, useEffect } from "react";
import InfoModal from "./InfoModal";

export default function Header() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			document.body.classList.add("open-modal-1");
		} else {
			document.body.classList.remove("open-modal-1");
		}
	}, [open]);

	return (
		<StyledHeader>
			<span>PATH DEMON</span>
			<div className="btns">
				<a href="https://github.com/ZeroOne015645/PathDemon-Chinese-Translation">
					<button>
						<GitHubIcon sx={{ fontSize: "2.4rem" }} />
					</button>
				</a>
				<button onClick={() => setOpen(true)}>
					<InfoIcon sx={{ fontSize: "2.4rem" }} />
				</button>
			</div>
			<InfoModal open={open} setOpen={setOpen} />
		</StyledHeader>
	);
}
