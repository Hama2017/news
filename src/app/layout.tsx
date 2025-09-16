import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { Container } from "@mui/material";
import "./globals.css";


export const metadata: Metadata = {
	title: "News App",
	description: "News",
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<AppRouterCacheProvider>
				<body>
					<Container>
						<Header />
						{children}
						<Footer />
					</Container>
				</body>
			</AppRouterCacheProvider>
		</html>
	);
}

export default RootLayout;