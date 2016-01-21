var React = require('react');
var FluxMemberTableData = require('./FluxMemberTableData.react');

// Flux todolist view
var FluxMemberTable = React.createClass({

    render: function(){
        var member = this.props.member;
        var canEdit = this.props.canEdit;

        var editStyle = {
            display: (this.props.canEdit) ? 'inline-block' : 'none'
        };

        return(
            <div className="flux-memberlist-list">
                <ul>
                    {Object.keys(member).map(function(index){
                        return (
                            <FluxMemberTableData attendee={member[index]} index={index} />
                        )
                    })}
                    <li>
                        <button type="button" id="flux-memberlist-button" className="" data-toggle="modal" data-target="#newListElementModal" style={editStyle}><i className="fa fa-plus-square-o"></i></button> 
                    </li>
                </ul>
            </div>
        );
    }
});

module.exports = FluxMemberTable;