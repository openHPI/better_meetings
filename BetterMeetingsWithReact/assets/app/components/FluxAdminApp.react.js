var React = require('react');
var Link = require('react-router/modules/Link');

var FluxAdminApp = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="boxed">
          {this.props.children}
        </div>
        <nav id="mainnav-container">
          <div id="mainnav">

            <div id="mainnav-menu-wrap">
              <div class="nano">
                <div class="nano-content">
                  <ul id="mainnav-menu" class="list-group">

                    <li class="list-header">Navigation</li>

                    <li>
                      <Link to="/meetingseries">
                        <i class="fa fa-dashboard"></i>
                        <span class="menu-title">
                          <strong>Dashboard</strong>
                        </span>
                      </Link>
                    </li>

                    <li>
                      <a href="#">
                        <i class="fa fa-th"></i>
                        <span class="menu-title">
                          <strong>Layouts</strong>
                        </span>
                      </a>
                    </li>

                    <li>
                      <a href="widgets.html">
                        <i class="fa fa-flask"></i>
                        <span class="menu-title">
                          <strong>Widgets</strong>
                        </span>
                      </a>
                    </li>

                    <li class="list-divider"></li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }

});

module.exports = FluxAdminApp;
