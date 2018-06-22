import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBell, faStar, faShare, faSignOutAlt } from '@fortawesome/fontawesome-free-solid';

export default class SettingsOptionLabel extends PureComponent {
  static NOTIFICATION = 'notification';
  static STAR = 'star';
  static SHARE = 'share';
  static SIGNOUT = 'signout';

  static propTypes = {
    /**
     * The icon to display next to the label text
     */
    icon: PropTypes.oneOf([
      SettingsOptionLabel.NOTIFICATION,
      SettingsOptionLabel.STAR,
      SettingsOptionLabel.SHARE,
      SettingsOptionLabel.SIGNOUT,
    ]).isRequired,

    /**
     * The label text
     */
    text: PropTypes.string.isRequired,

    /**
     * An optional function to call when element is tapped
     */
    onClick: PropTypes.func,

    /**
     * An optional children to display
     */
    children: PropTypes.element,
  };

  static defaultProps = {
    onClick: null,
    children: null,
  }

  _handleClick = () => this.props.onClick ? this.props.onClick() : null;

  _getIcon = () => {
    switch (this.props.icon) {
      case SettingsOptionLabel.NOTIFICATION:
        return faBell;
      case SettingsOptionLabel.STAR:
        return faStar;
      case SettingsOptionLabel.SHARE:
        return faShare;
      case SettingsOptionLabel.SIGNOUT:
        return faSignOutAlt;
      default:
        return null;
    }
  }

  render() {
    const icon = this._getIcon();

    return (
      <div onClick={this._handleClick}>
        <div>
          <FontAwesomeIcon icon={icon} />
          {this.props.text}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
