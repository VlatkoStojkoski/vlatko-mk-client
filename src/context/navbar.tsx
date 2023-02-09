import type { Ref} from 'react';
import { createContext, useContext, useState } from 'react';

export type Navbar = {
	active: undefined | 'home' | 'portfolio' | 'contact' | 'blog';
	sections: [string, Ref<HTMLElement>][];
};

export type NavbarContextType = [
  Navbar,
	React.Dispatch<React.SetStateAction<Navbar>>
]

const Context = createContext<NavbarContextType | null>(null);

export function NavbarProvider({ children }: { children: React.ReactNode }) {
	const [navbar, setNavbar] = useState<Navbar>({
		active: undefined,
		sections: [],
	});

	return (
		<Context.Provider value={[navbar, setNavbar]}>{children}</Context.Provider>
	);
}

export function useNavbarContext(): NavbarContextType {
	const context = useContext(Context);

	if (context === null) {
		throw new Error('useNavbarContext must be used within a NavbarProvider');
	}

	return context;
}