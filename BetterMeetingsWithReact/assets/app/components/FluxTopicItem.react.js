var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

// Flux agenda View
var FluxTopicItem = React.createClass({

	// Select agenda item via Action
	_onClick: function(event) {
		if(this.props.level === 0)
			FluxMeetingActions.toggleDoneTopic(this.props.index);
		else
			FluxMeetingActions.selectTopic(this.props.index);
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
	            <li className={"agenda-item level-" + level} onClick={this._onClick}>
	            	<label className={ item.done ? "form-checkbox form-icon form-no-label btn btn-primary active" : "form-checkbox form-icon form-no-label btn btn-primary active" }><input type="checkbox" checked={item.done}/></label>
	                <h3 className="agenda-title">{ item.title }</h3>
	            </li>
			);
		}
	}
})

module.exports = FluxTopicItem;
