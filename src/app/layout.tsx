import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container } from "@mui/material";


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