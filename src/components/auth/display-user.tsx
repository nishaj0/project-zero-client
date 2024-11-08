import { getSession } from "@/lib/sessions";
import { cookies } from "next/headers";

export default async function DisplayUser() {
	const session = await getSession((await cookies()).get("session")?.value);

	if (!session) {
		return null;
	}

	return (
		<div>
			<p>First Name: {session.data.firstName}</p>
			<p>Last Name: {session.data.lastName}</p>
			<p>Username: {session.data.username}</p>
			<p>Email: {session.data.email}</p>
		</div>
	);
}
