import React from "react";
import FooterStyled from "./Footer.styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
	return (
		<FooterStyled>
			<div className="made-by">由 Jakub Koper 製作 | 由 ZeroOne015645 翻譯</div>
			<div className="contact">
				<div className="contact-title">Contact:</div>
				<div>
					<div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '10px' }}>
						<div className="contact-sub">
							<MailOutlineIcon sx={{ fontSize: "2.4rem" }} />
							<span>jakub.koper@wpc-huh.com</span>
						</div>
						<div className="contact-sub">
							<MailOutlineIcon sx={{ fontSize: "2.4rem" }} />
							<span>lyouxiang89@gmail.com</span>
						</div>
					</div>

					<a href="https://github.com/ZeroOne015645/PathDemon-Chinese-Translation">
						<div className="contact-sub github">
							<GitHubIcon sx={{ fontSize: "2.4rem" }} />
							Github (Traditional Chinese Version)
						</div>
					</a>
				</div>
			</div>
		</FooterStyled>
	);
}
