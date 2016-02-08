var React = require('react');
var FluxAgendaItem = require('./FluxAgendaItem.react');
var FluxAgendaActions = require('../actions/FluxAgendaActions');

// Flux agenda View
var FluxAgenda = React.createClass({

	 selectPrevious: function() {
        var index = (this.props.items.indexOf(this.props.selected) - 1);
        var index = (0 > index) ? (this.props.items.length-1) : index;
        FluxAgendaActions.selectAgendaItem(index);
    },

    // Select next agenda item
    selectNext: function() {
        var index = (this.props.items.indexOf(this.props.selected) + 1);
        if(index < this.props.items.length)
            FluxAgendaActions.selectAgendaItem(index);
        else
            FluxAgendaActions.endMeeting();
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
                        <FluxAgendaItem items={items} index={selectedIndex - 1} level={1} />
                        <FluxAgendaItem items={items} index={selectedIndex} level={0} />
                        <FluxAgendaItem items={items} index={selectedIndex + 1} level={1} />
                        <FluxAgendaItem items={items} index={selectedIndex + 2} level={2} />
                    </ul>
                </div>
			</div>
		)
	}
})

module.exports = FluxAgenda;
