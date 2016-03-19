var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');
var FluxTodoItem = require('./FluxTodoItem.react');
var FluxTodoItemUpdate = require('./FluxTodoItemUpdate.react');

// Flux todolist view
var FluxTodoList = React.createClass({

    getInitialState: function() {
        return {data: this.props.items};
    },

    sort: function (items, dragging) {
        var data = this.state.data;
        data.items = items;
        data.dragging = dragging;
        this.setState({data: data});
    },

    renderTodoList: function(items, draggable) {
        var canEdit = this.props.canEdit;

      var sortedItems = [];

      for (var i = 0; i < items.length; i++) {
        if (items[i].important === undefined || items[i].important === null || !items[i].important)
          sortedItems.push(items[i]);
        else
          sortedItems.unshift(items[i]);
      }

      if (sortedItems.length > 0) {

        return sortedItems.map(function (item, i) {
          if (item.id === this.props.editingTodoItem) {
            return (
              <FluxTodoItemUpdate key={i} item={item} index={i} canEdit={canEdit}/>
            );
          }

          else {
            return (
              <FluxTodoItem sort={this.sort} data={this.state.data} key={i} item={item} index={i} canEdit={canEdit} draggable={draggable} />
            );
          }
            }, this);
        }
    },

    render: function() {
        var attendees = this.props.attendees;
        var canEdit = this.props.canEdit;

        return(
                    <div className="panel panel-secondary panel-colorful">
                         <div className="panel-heading">
                             <div className="panel-control">
                                 <ul className="nav nav-tabs">
                                    <li className="active"><a data-toggle="tab" href="#demo-tabs-box-1">FOR THIS TOPIC</a></li>
                                    <li><a data-toggle="tab" href="#demo-tabs-box-2">ALL TODOS</a></li>
                                 </ul>
                             </div>
                             <h3 className="panel-title">TODOS</h3>
                         </div>
                         <div className="panel-body">
                           <div className="tab-content">
                              <div id="demo-tabs-box-1" className="tab-pane fade in active">
                                 <div className="pad-ver">
                                     <ul onDragOver={this.dragOver} className="list-group bg-trans list-todo mar-no">
                                        {this.renderTodoList(this.props.items, true)}
                                     </ul>
                                 </div>
                                 <div className="input-group pad-all">
                                     <span className="input-group-btn">
                                         <button type="button" className="btn btn-info" data-toggle="modal" data-target="#createTodoItemModal"><i className="fa fa-plus"></i></button>
                                     </span>
                                 </div>
                              </div>
                              <div id="demo-tabs-box-2" className="tab-pane fade">
                                 <div className="pad-ver">
                                     <ul className="list-group bg-trans list-todo mar-no">
                                        {this.renderTodoList(this.props.allItems, false)}
                                     </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                    </div>

        );
    }
});

module.exports = FluxTodoList;
