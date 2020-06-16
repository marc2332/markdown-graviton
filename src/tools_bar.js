const ToolsBar = (puffin,state) => {
	const styleWrapper = puffin.style`
		& {
			padding: 10px;
			border-radius: 25px;
			color: black;
			background: rgba(0,0,0,0.1);
			width: 110px;
			height: 25px;
			flex: 1;
			display: flex;
			align-vertical: center;
			align-items: center;
		}
		& > div{
			border-radius: 100px;
			padding: 2px;
			min-width: 18px;
			min-height: 18px;
			max-width: 18px;
			max-height: 18px;
			margin: 5px;
			border: 2px solid transparent;
		}
		& > div[active=true] {
			border: 2px solid var(--accentColor);
		}
		& > div:nth-child(1){
			background: rgba(0,0,0,0.5)
		}
		& > div:nth-child(2){
			background: black;
		}
		& > div:nth-child(3){
			background: white;
		}
	`
	function barMounted(){
		state.keyChanged('theme',()=>{
			for ( const child of this.children ){
				child.update()
			}
		})
	}
	return () => {
		return puffin.element`
			<div class="${styleWrapper}" mounted="${barMounted}">
				<div title="Transparent" active="${()=>state.data.theme === 'transparent'}" :click="${()=>state.data.theme = 'transparent'}"/>
				<div title="Black" active="${()=>state.data.theme === 'black'}" :click="${()=>state.data.theme = 'black'}"/>
				<div title="White" active="${()=>state.data.theme === 'white'}" :click="${()=>state.data.theme = 'white'}"/>
			</div>
		`
	}
}

export default ToolsBar