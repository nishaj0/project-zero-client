"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/authentication";

export default function LogoutButton() {
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		await logout();
		setLoading(false);
	};

	return (
		<Button disabled={loading} onClick={handleLogout}>
			{loading ? "Logging out..." : "Logout"}
		</Button>
	);
}
