import { Remarkable } from 'remarkable';
import ToolsBar from './src/tools_bar'

function render(Tab,puffin,editor){
	
	const configState = new puffin.state({
		theme: 'white'
	})
		
	const styleWrapper = puffin.style`
		& {
			padding:20px;
			width: 100%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
		& > div:nth-child(2){
			width: 100%;
		}
		& > div:nth-child(2) {
			height: 100%;
			overflow:auto;
		}
		&[theme="transparent"] {
			background: transparent;
		}
		&[theme="transparent"] * {
			color: var(--textColor);
		}
		&[theme="black"] {
			background: rgba(35,35,35);
		}
		&[theme="black"] * {
			color: white;
		}
		&[theme="white"] {
			background: white;
		}
		&[theme="white"] * {
			color: black;
		}
	`
	const containerComp = () => {
		return puffin.element({
			components: {
				ToolsBar: ToolsBar(puffin,configState)
			}
		})`
		<div theme="${()=>configState.data.theme}" class="${styleWrapper}">
			<ToolsBar/>
			<div mounted="${mountedContainer}"/>
		</div>`
	}
	new Tab({
		title: 'Markdown Preview',
		component: containerComp
	})
	
	function mountedContainer(){
		editor.client.do('onChanged',{
			instance: editor.instance,
			action: () => {
				updatePreview(this,editor.client.do('getValue',editor.instance))
			}
		})
		configState.keyChanged('theme', ()=>{
			this.parentElement.update()
		})
		
		updatePreview(this,editor.client.do('getValue',editor.instance))
	}
	
}
function updatePreview(containerElement,value){
	const markdown = new Remarkable({
		html: true
	});
	containerElement.innerHTML = markdown.render(value)
}

export const entry = ({ StatusBarItem, Tab, RunningConfig, puffin }) => {
	const item = new StatusBarItem({
		label: 'Live preview',
		action:()=>{
			RunningConfig.data.focusedEditor && render(Tab,puffin,RunningConfig.data.focusedEditor)
		}
	})
	RunningConfig.on('aTabHasBeenClosed',({ directory }) => {
		item.hide()
	})
	RunningConfig.on('aTabHasBeenFocused',({ directory }) => {
		if( directory.includes('.md') ){
			item.show()
		}else{
			item.hide()
		}
	})
	item.hide()
}
