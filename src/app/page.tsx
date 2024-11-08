import DisplayUser from "@/components/auth/display-user";
import LogoutButton from "@/components/auth/logout-button";

export default function Home() {
	return (
		<div>
			<DisplayUser />
			<LogoutButton />
		</div>
	);
}
