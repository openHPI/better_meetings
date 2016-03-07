var React = require('react');
var FluxMeetingActions = require('../actions/FluxMeetingActions');
var FluxTodoItem = require('./FluxTodoItem.react');
var FluxTodoItemUpdate = require('./FluxTodoItemUpdate.react');

var placeholder = document.createElement("li");
placeholder.className = "todo-item placeholder";

// Flux todolist view
var FluxTodoList = React.createClass({

    getInitialState: function() {
        return {data: this.props.items};
    },

    dragStart: function(e) {
        this.dragged = e.currentTarget;
        e.dataTransfer.effectAllowed = 'move';
        
        // Firefox requires dataTransfer data to be set
        e.dataTransfer.setData("text/html", e.currentTarget);
    },

    dragEnd: function(e) {
        this.dragged.style.display = "block";
        this.dragged.parentNode.removeChild(placeholder);

        // Update data
        var item = Number(this.dragged.dataset.id);
        var item2 = Number(this.over.dataset.id);
        if(item < item2) item2--;
        if(this.nodePlacement === "after") item2++;

        FluxMeetingActions.swapTodoItems(item, item2);
    },

    dragOver: function(e) {
        e.preventDefault();
        this.dragged.style.display = "none";
        if(e.target.className === "placeholder") return;
        
        this.over = e.target;
        // Inside the dragOver method
        var relY = e.clientY - this.over.offsetTop;
        var height = this.over.offsetHeight / 2;
        var parent = e.target.parentNode;
        
        if(relY > height) {
            console.log("after ", this.over.dataset.id);
            this.nodePlacement = "after";
            parent.insertBefore(placeholder, e.target.nextElementSibling);
        }
        
        else if(relY < height) {
            console.log("after ", this.over.dataset.id);
            this.nodePlacement = "before"
            parent.insertBefore(placeholder, e.target);
        }
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

            return sortedItems.map(function(item, i) {
                if(item.id === this.props.editingTodoItem) {
                    return(
                        <FluxTodoItemUpdate key={i} item={item} index={i} canEdit={canEdit} />
                    );
                }

                else {
                    return (
                        <FluxTodoItem key={i} draggable={draggable} onDragStart={this.dragStart} onDragEnd={this.dragEnd} item={item} index={i} canEdit={canEdit} />
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