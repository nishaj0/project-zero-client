import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "./lib/sessions";

export async function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const pathname = url.pathname;
	const isProtected = pathname === "/";

	const session = await getSession(req.cookies.get("session")?.value);

	if (isProtected && !session) {
		url.pathname = "/signin";
		return NextResponse.redirect(url);
	}

	if ((pathname === "/signin" || pathname === "/signup") && session) {
		url.pathname = "/";
		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
