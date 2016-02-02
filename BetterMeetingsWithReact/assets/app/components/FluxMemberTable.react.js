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
            <aside id="aside-container">
               <div id="aside">
                  <div className="nano">
                     <div className="nano-content">
                        <div className="list-group bg-trans">
                            {Object.keys(member).map(function(index){
                                return (
                                    <FluxMemberTableData attendee={member[index]} index={index} />
                                );
                            })}
                        </div>
                        <button type="button" id="flux-memberlist-button" data-toggle="modal" data-target="#newMemberModal" style={editStyle}><i className="fa fa-plus-square-o"></i></button> 
                     </div>
                  </div>
               </div>
            </aside>
        );
    }
});

module.exports = FluxMemberTable;