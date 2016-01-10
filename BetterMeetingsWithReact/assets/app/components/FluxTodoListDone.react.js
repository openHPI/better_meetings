var React = require('react');
var FluxTodoListDoneItem = require('./FluxTodoListDoneItem.react');

// Flux todolist view
var FluxTodoListDone = React.createClass({

    render: function(){
        var items = this.props.items;
        if (items.length > 0) {
            return(
                    <div className="flux-todolistdone-list">
                        <h3>Already done</h3>
                        <ul>
                            {Object.keys(items).map(function(index){
                                return (
                                    <FluxTodoListDoneItem item={items[index]} index={index} />
                                )
                            })}
                        </ul>
                    </div>
            );
        }
        else {
            return(
                <div className="flux-todolistdone-list"></div>
            );
        }
    }
});

module.exports = FluxTodoListDone;