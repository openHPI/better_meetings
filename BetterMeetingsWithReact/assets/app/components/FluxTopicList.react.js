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
        var index = this.props.selected - 1;
        var index = (0 > index) ? (this.props.items.length-1) : index;
        FluxMeetingActions.selectTopic(index);
    },

    // Select next agenda item
    selectNext: function() {
        var index = this.props.selected + 1;
        if(index < this.props.items.length)
            FluxMeetingActions.selectTopic(index);
        else
            FluxMeetingActions.endMeeting();
    },

	// Render agenda View
	render: function() {
		var items = this.props.items;
		var selected = this.props.selected;
    	var count = items.length;
    	
		return (
			<div className="flux-agenda-container panel">
				<div className="panel-heading">
					<div className="panel-control">
						<ul className="pager">
							<li><a onClick={this.selectPrevious}><i className="fa fa-angle-double-left"></i></a></li>
							<li><a onClick={this.selectNext}><i className="fa fa-angle-double-right"></i></a></li>
						</ul>
					</div>
					<h3 className="panel-title">TOPIC {selected + 1} / {count} </h3>
				</div>
				<div className="flux-agenda-list panel-body">
					<ul>
                        <FluxTopicItem item={items[selected - 1]} index={selected - 1} level={1} />
                        <FluxTopicItem item={items[selected]} index={selected} level={0} />
                        <FluxTopicItem item={items[selected + 1]} index={selected + 1} level={1} />
                        <FluxTopicItem item={items[selected + 2]} index={selected + 2} level={2} />
                    </ul>
                </div>
			</div>
		)
	}
});

module.exports = FluxTopicList;
