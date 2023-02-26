import $ from "jquery";

class Editor {
	constructor(game) {
		this.game = game;
		this.containerDomWrap = $("<div/>").attr('id', 'editor-container-wrap');
		this.containerDom = $("<div/>").attr('id', 'editor-container');
		this.containerDomWrap.append(this.containerDom)

		$("body").append(this.containerDomWrap);

		this.containerDomBtn = $("<button>X</button>").attr('id', 'editor-gui-btn');
		this.containerDomBtn.on('click', _ => {
			this.containerDom.slideToggle();
		})
		this.containerDomWrap.append(this.containerDomBtn)
	}

	addButton() {
		let newButton = $("<button>Test</button>").attr('id', 'editor-gui-btn').addClass("btn btn-primary");
		this.containerDom.append(newButton);

	}

}

exports.Editor = Editor
