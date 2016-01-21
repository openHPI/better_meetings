var React = require('react');
var FluxTodoListDoneItem = require('./FluxTodoListDoneItem.react');

// Flux todolist view
var FluxTodoListDone = React.createClass({

    getInitialState: function() {
        return { visible: false };
    },

    render: function(){

        var items = this.props.items;

        var listStyle = {
            display: (this.state.visible) ? 'block' : 'none'
        }

        return(
                    <div className="flux-todolistdone-list">
                        <h4 onDoubleClick={this._onDoubleClick}>Done: {items.length}</h4>
                        <ol style={listStyle}>
                            {Object.keys(items).map(function(index){
                                return (
                                    <FluxTodoListDoneItem item={items[index]} index={index} />
                                )
                            })}
                        </ol>
                    </div>
        );
    },

    _onDoubleClick: function() {
        this.setState({ visible: !this.state.visible });
    }

});

module.exports = FluxTodoListDone;