var React = require('react');
var FluxTodoListItem = require('./FluxTodoListItem.react');
var FluxTodoListForm = require('./FluxTodoListForm.react');

// Flux todolist view
var FluxTodoList = React.createClass({

    render: function(){
        var items = this.props.items;
        var member = this.props.member;
        var collapsed = this.props.collapsed;

        if (items.length > 0) {
            return(
                    <div className="flux-todolist-list">
                        <h4>Todo List</h4>
                        <button type="button" id="flux-todolist-newElementButton" className="close" data-toggle="modal" data-target="#newListElementModal"><i className="fa fa-2x fa-plus-square-o"></i></button> 
                        <ol>
                            {Object.keys(items).map(function(index){
                                var c = (collapsed === index) ? true : false;
                                return (
                                    <FluxTodoListItem item={items[index]} index={index} collapsed={c} />
                                )
                            })}
                        </ol>
                        <FluxTodoListForm member={member} />
                    </div>
            );
        }
        else {
            return(
                <div className="flux-todolist-list">
                    <h4>Todo List (empty)</h4>
                    <button type="button" className="close" data-toggle="modal" data-target="#newListElementModal"><i className="fa fa-2x fa-plus-square-o"></i></button>
                    <FluxTodoListForm member={member} />
                </div>
            );
        }
    }
});

module.exports = FluxTodoList;