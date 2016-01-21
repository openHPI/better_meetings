var React = require('react');
var FluxMemberTableData = require('./FluxMemberTableData.react');

// Flux todolist view
var FluxMemberTable = React.createClass({

    render: function(){
        var member = this.props.member;

        return(
            <div className="flux-memberlist-list">
                <ul>
                    {Object.keys(member).map(function(index){
                        return (
                            <FluxMemberTableData attendee={member[index]} index={index} />
                        )
                    })}
                    <li>
                        <button type="button" id="flux-memberlist-button" className="close" data-toggle="modal" data-target="#newListElementModal"><i className="fa fa-plus-square-o"></i></button> 
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = FluxMemberTable;