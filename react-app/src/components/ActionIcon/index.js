import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrashAlt, faCheck, faAngleUp, faAngleDown, faBars } from '@fortawesome/fontawesome-free-solid';

export default class ActionIcon extends React.PureComponent {
  static BACK = 'back';
  static REMOVE = 'remove';
  static APPLY = 'apply';
  static EXPAND = 'expand';
  static COLLAPSE = 'collapse';
  static SETTINGS = 'settings';

  static propTypes = {
    /**
     * The icon that this element will show.
     */
    icon: PropTypes.oneOf([
      ActionIcon.BACK,
      ActionIcon.REMOVE,
      ActionIcon.APPLY,
      ActionIcon.EXPAND,
      ActionIcon.COLLAPSE,
      ActionIcon.SETTINGS,
    ]).isRequired,

    /**
     * The function to call when this element is clicked.
     */
    onClick: PropTypes.func.isRequired,
  };

  _handleClick = () => this.props.onClick(this.props.icon);

  _getIcon = () => {
    switch (this.props.icon) {
      case ActionIcon.BACK:
        return faChevronLeft;
      case ActionIcon.REMOVE:
        return faTrashAlt;
      case ActionIcon.APPLY:
        return faCheck;
      case ActionIcon.EXPAND:
        return faAngleDown;
      case ActionIcon.COLLAPSE:
        return faAngleUp;
      case ActionIcon.SETTINGS:
        return faBars;
      default:
        return null;
    }
  }

  render() {
    const icon = this._getIcon();

    return (
      <FontAwesomeIcon
        icon={icon}
        onClick={this._handleClick}
      />
    );
  }
}
