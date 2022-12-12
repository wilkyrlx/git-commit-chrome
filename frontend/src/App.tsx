import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { stripeItem, stripeItemType } from "./types/StripeItem";
import { ControlPanel } from "./components/ControlPanel";
import StripeList from "./components/StripeList";
import { pageView } from "./types/pageView";
import { Settings } from "./components/Settings";
import { loadLocalData, saveLocalData } from "./save-data/saveLocalData";
import { readGithub } from "./github-interface/GithubReader";
import OAuthInterface from "./github-interface/OAuthInterface";



// TODO: this is a messy way of doing this - try to let react manage the state and remove all occurences of "globalThis.homeItems"
declare global {
	var homeItems: stripeItem[];
}

export interface StripeItemsProps {
	setItems: Dispatch<SetStateAction<stripeItem[]>>,
	items: stripeItem[],
}

export interface AppProps {
	setItems: Dispatch<SetStateAction<stripeItem[]>>,
	items: stripeItem[],
	setView: Dispatch<SetStateAction<pageView>>,
}


function App() {
	const [items, setItems] = useState<stripeItem[]>([])
	const [view, setView] = useState<pageView>(pageView.MAIN)

	const itemsPack: StripeItemsProps = {setItems, items}
	const appPack: AppProps = {setItems, items, setView}

	return (
		<div className="app">
			<button onClick={() => saveLocalData(items)}>save data</button>
			<button onClick={() => loadLocalData({...itemsPack})}>load data</button>
			<button onClick={() => readGithub({...appPack})}>github API</button>
			<OAuthInterface />
			<ControlPanel {...appPack} />
			{ view === pageView.MAIN && <StripeList {...itemsPack} /> }
			{ view === pageView.SETTINGS && <Settings /> }
		</div>
	);
}

export default App;
