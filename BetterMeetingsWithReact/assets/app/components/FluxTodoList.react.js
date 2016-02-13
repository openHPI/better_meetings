var React = require('react');
var FluxTodoListItem = require('./FluxTodoListItem.react');
var FluxTodoListForm = require('./FluxTodoListForm.react');

// Flux todolist view
var FluxTodoList = React.createClass({

    renderTodoList: function(items) {
        var collapsedIndex = this.props.collapsed;
        var canEdit = this.props.canEdit;
        if (items.length > 0) {
            return Object.keys(items).map(function(index){
                    var collapsed = (collapsedIndex === index) ? true : false;
                    return (
                        <FluxTodoListItem item={items[index]} index={index} collapsed={collapsed} canEdit={canEdit} />
                    );
            });
        }
    },

    render: function() {
        var attendees = this.props.attendees;

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
                                     <ul className="list-group bg-trans list-todo mar-no">
                                        {this.renderTodoList(this.props.items)}
                                     </ul>
                                 </div>
                                 <div className="input-group pad-all">
                                     <span className="input-group-btn">
                                         <button type="button" className="btn btn-info" data-toggle="modal" data-target="#newListElementModal"><i className="fa fa-plus"></i></button>
                                     </span>
                                 </div>
                              </div>
                              <div id="demo-tabs-box-2" className="tab-pane fade">
                                 <div className="pad-ver">
                                     <ul className="list-group bg-trans list-todo mar-no">
                                        {this.renderTodoList(this.props.allItems)}
                                     </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <FluxTodoListForm attendees={attendees} />
                    </div>

        );
    }
});

module.exports = FluxTodoList;