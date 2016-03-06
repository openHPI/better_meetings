var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

// Flux agenda View
var FluxTopicItem = React.createClass({

	// Select agenda item via Action
	selectTopic: function(event) {
		FluxMeetingActions.selectTopic(this.props.index);
	},

	toggleDone: function(event) {
		FluxMeetingActions.toggleDoneTopic(this.props.item);
	},

	// Render agenda View
	render: function() {
		var item = this.props.item;
		var level = this.props.level;

		if(item === undefined || item === null){
			return (
	            <li className={"agenda-item level-" + level}></li>
			);
		}

		else {
			return (
	            <li className={"agenda-item level-" + level + ((item.done) ? " done" : "")}>
	            	<label className={ item.done ? "form-checkbox form-normal form-primary active" : "form-checkbox form-icon form-normal form-primary" }>
	            		<input type="checkbox" onChange={this.toggleDone} checked={item.done}/>
	            	</label>
	                <h3 className="agenda-title" onClick={this.selectTopic} >{ item.title }</h3>
	            </li>
			);
		}
	}
})

module.exports = FluxTopicItem;
