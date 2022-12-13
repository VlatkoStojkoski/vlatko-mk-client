import { createContext, useContext, useState } from 'react';

type Pointer = 'normal' | 'filled';

export type PointerContextType = [
  Pointer,
	React.Dispatch<React.SetStateAction<Pointer>>
]

const Context = createContext<PointerContextType | null>(null);

export function PointerProvider({ children }: { children: React.ReactNode }) {
	const [pointer, setPointer] = useState<Pointer>('normal');

	return (
		<Context.Provider value={[pointer, setPointer]}>{children}</Context.Provider>
	);
}

export function usePointerContext(): PointerContextType {
	const context = useContext(Context);

	if (context === null) {
		throw new Error('usePointerContext must be used within a PointerProvider');
	}

	return context;
}