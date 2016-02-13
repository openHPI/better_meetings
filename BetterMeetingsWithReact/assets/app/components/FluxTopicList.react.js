var React = require('react');
var FluxTopicItem = require('./FluxTopicItem.react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');

/**
 * Provides an interface of actions for the components
 * 
 * @module FluxTopicList
 * @require AppDispatcher
 * @require FluxMeetingConstants
 *
 */
var FluxTopicList = React.createClass({

	 selectPrevious: function() {
        var index = (this.props.items.indexOf(this.props.selected) - 1);
        var index = (0 > index) ? (this.props.items.length-1) : index;
        FluxMeetingActions.selectAgendaItem(index);
    },

    // Select next agenda item
    selectNext: function() {
        var index = (this.props.items.indexOf(this.props.selected) + 1);
        if(index < this.props.items.length)
            FluxMeetingActions.selectAgendaItem(index);
        else
            FluxMeetingActions.endMeeting();
    },

	// Render agenda View
	render: function() {
		var items = this.props.items;
		var selected = this.props.selected;
		var selectedIndex = items.indexOf(selected);
    	var count = items.length;
		return (
			<div className="flux-agenda-container panel">
				<div className="panel-heading">
					<div className="panel-control">
						<ul className="pager">
							<li><a href="#" onClick={this.selectPrevious}><i className="fa fa-angle-double-left"></i></a></li>
							<li><a href="#" onClick={this.selectNext}><i className="fa fa-angle-double-right"></i></a></li>
						</ul>
					</div>
					<h3 className="panel-title"><span class="badge">{count}</span> Themen</h3>
				</div>
				<div className="flux-agenda-list panel-body">
					<ul>
                        <FluxTopicItem items={items} index={selectedIndex - 1} level={1} />
                        <FluxTopicItem items={items} index={selectedIndex} level={0} />
                        <FluxTopicItem items={items} index={selectedIndex + 1} level={1} />
                        <FluxTopicItem items={items} index={selectedIndex + 2} level={2} />
                    </ul>
                </div>
			</div>
		)
	}
});

module.exports = FluxTopicList;
