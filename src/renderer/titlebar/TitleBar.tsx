/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useRecoilValue } from 'recoil';
import {
  CheckCircle,
  CheckSquare,
  ChevronRight,
  Circle,
  Minus,
  Square,
  X,
} from 'react-feather';
import React, { useMemo, useRef } from 'react';
import pathParse from 'path-parse';
import { ClickAwayListener } from '@mui/base';
import { ipcRenderer } from 'electron';

import TitleBarStateNode, {
  maximizedState,
  menuState,
  titleEmitter,
  titleState,
} from './TitleBarStateNode';
import appIcon from '../../../assets/icon-nobg.png';

import './TitleBar.scss';
import { mainProcessChannels, titleBarChannels } from '../../main/channels';

// Used to broadcast events to all menus
const eventTarget = new EventTarget();

// Also close all menus on window blur
window.addEventListener('blur', () =>
  eventTarget.dispatchEvent(new CustomEvent('blur'))
);

eventTarget.addEventListener('blur', () => {
  // Get all of the checkboxes that control menu visibility
  const els = Array.from(
    document.querySelectorAll('.MenuCheck')
  ) as HTMLInputElement[];
  els.forEach((el) => {
    el.checked = false; // Unckeck them to hide the menu
  });
});

// Allows the MainMenuItem radios to be deselected so that menus can be closed by clicking the label again
const onRadioClick = (
  ref: React.RefObject<HTMLInputElement> | null,
  e: React.MouseEvent<HTMLLabelElement, MouseEvent>
) => {
  if (e.target !== e.currentTarget) return; // Only catch events from current element
  const input = ref?.current; // ? Could use target.querySelector('input'), but this is cleaner
  if (input && input.checked) {
    input.checked = false;
    e.preventDefault();
    e.stopPropagation();
  }
};

/**
 * An item in a submenu popup.
 */
const SubMenuItem: React.FC<{
  /**
   * The menu item object
   */
  item: Electron.MenuItem;
  /**
   * A string identifier used to name radio groups and prevent conflict between them
   */
  menuID: string;
  /**
   * The group number of a radio input
   */
  radioGroup: number;
}> = ({ item, menuID, radioGroup }) => {
  const radioGroupString = `${menuID}-radio-${radioGroup}`;
  const ref = useRef<HTMLInputElement>(null);
  switch (item.type) {
    case 'normal': {
      // Just a plain button with a label and accelerator.
      return (
        <div
          className="MenuItem"
          onClick={(e) => {
            ipcRenderer.send(titleBarChannels.menuAction, item.commandId);
            eventTarget.dispatchEvent(new CustomEvent('blur'));
            e.preventDefault();
          }}
          role="button"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              eventTarget.dispatchEvent(new CustomEvent('blur'));
          }}
        >
          <p>{item.label}</p>
          <p className="Accelerator">{item.accelerator}</p>
        </div>
      );
    }
    case 'submenu': {
      // An item with a nested submenu
      return (
        <ClickAwayListener
          onClickAway={() => {
            if (ref.current) ref.current.checked = false;
          }}
        >
          <label
            className="MenuItem"
            onClickCapture={onRadioClick.bind(onRadioClick, null)}
            role="button"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                onRadioClick(
                  null,
                  e as unknown as React.MouseEvent<HTMLLabelElement, MouseEvent>
                );
            }}
          >
            {item.label}
            <ChevronRight
              className="SubMenuIcon"
              size="1rem"
              strokeWidth="2px"
            />
            <input type="checkbox" className="MenuCheck" ref={ref} />
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            <SubMenu menu={item.submenu! as Electron.Menu} />
          </label>
        </ClickAwayListener>
      );
    }
    case 'radio': {
      return (
        <label
          className="MenuItem"
          onClickCapture={(e) => {
            ipcRenderer.send(titleBarChannels.menuAction, item.commandId);
            eventTarget.dispatchEvent(new CustomEvent('blur'));
            e.stopPropagation();
          }}
          role="button"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              eventTarget.dispatchEvent(new CustomEvent('blur'));
          }}
        >
          {item.label}
          <input
            type="radio"
            name={radioGroupString}
            className="MenuItemRadio"
            defaultChecked={item.checked}
          />
          <Circle className="SubMenuIcon RadioUnselected" size="1rem" />
          <CheckCircle className="SubMenuIcon RadioSelected" size="1rem" />
        </label>
      );
    }
    case 'separator': {
      // Unselectable seperator
      return <div className="MenuSeperator" />;
    }
    case 'checkbox': {
      return (
        <label
          className="MenuItem"
          onClickCapture={(e) => {
            ipcRenderer.send(titleBarChannels.menuAction, item.commandId);
            eventTarget.dispatchEvent(new CustomEvent('blur'));
            e.stopPropagation();
          }}
          role="button"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              eventTarget.dispatchEvent(new CustomEvent('blur'));
          }}
        >
          {item.label}
          <input
            type="checkbox"
            className="MenuItemRadio"
            defaultChecked={item.checked}
          />
          <Square className="SubMenuIcon RadioUnselected" size="1rem" />
          <CheckSquare className="SubMenuIcon RadioSelected" size="1rem" />
        </label>
      );
    }
    default: {
      return null;
    }
  }
};

/**
 * A submenu popup.
 */
const SubMenu: React.FC<{
  /**
   * The menu object used to create the popup
   */
  menu: Partial<Electron.Menu>;
}> = ({ menu }) => {
  const menuID = `menu_${menu.items?.[0].commandId}`;
  const radioGroups: number[][] = useMemo(() => {
    const tempRadioGroups: number[][] = [];
    let currentGroup: number[] = [];

    for (const item of menu.items || []) {
      if (item.type === 'radio') currentGroup.push(item.commandId);
      if (item.type === 'separator') {
        tempRadioGroups.push(currentGroup);
        currentGroup = [];
      }
    }
    tempRadioGroups.push(currentGroup);

    return tempRadioGroups;
  }, [menu.items]);
  return (
    <div className="SubMenu">
      {menu.items?.map((item) => (
        <SubMenuItem
          key={item.commandId}
          item={item}
          menuID={menuID}
          radioGroup={radioGroups.findIndex((group) =>
            group.includes(item.commandId)
          )}
        />
      ))}
    </div>
  );
};

/**
 * A labeled item with a submenu that is in the main title/menu bar.
 */
const MenuBarItem: React.FC<{
  /**
   * The menu item objec to construct the label from
   */
  menuItem: Partial<Electron.MenuItem>;
}> = ({ menuItem }) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div role="button" tabIndex={-1} className="MenuBarItem MenuItem">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <ClickAwayListener
        onClickAway={() => {
          if (ref.current) ref.current.checked = false;
        }}
      >
        <label
          className="ItemLabel"
          onClick={onRadioClick.bind(onRadioClick, ref)}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              onRadioClick(
                ref,
                e as unknown as React.MouseEvent<HTMLLabelElement, MouseEvent>
              );
          }}
        >
          {menuItem.label}
          <input
            type="radio"
            name="MainMenuCheck"
            className="MenuCheck"
            ref={ref}
          />
          <SubMenu menu={menuItem.submenu! as Electron.Menu} />
        </label>
      </ClickAwayListener>
    </div>
  );
};

/**
 * The app's menu bar
 */
const AppMenu: React.FC = () => {
  const appMenu = useRecoilValue(menuState);
  const ref = useRef<HTMLElement>(null);

  return (
    <nav id="AppMenu" tabIndex={-1} role="menu" ref={ref}>
      {appMenu.items?.map((menuItem) => (
        <MenuBarItem key={menuItem.commandId} menuItem={menuItem} />
      ))}
    </nav>
  );
};

/**
 * The app's title/menu bar.
 */
const TitleBar: React.FC = () => {
  const isMaximized = useRecoilValue(maximizedState);
  const appTitle = useRecoilValue(titleState);
  return (
    <div id="TitleBar">
      <div>
        <img
          id="appicon"
          src={appIcon}
          alt="Dasher app icon"
          draggable="false"
        />
        <AppMenu />
      </div>
      <p className="AppTitle">{appTitle}</p>
      <div className="WindowControlls">
        <div
          role="button"
          className="WindowControl"
          onClick={() => ipcRenderer.send(titleBarChannels.minimize)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') ipcRenderer.send(titleBarChannels.minimize);
          }}
          tabIndex={-1}
        >
          <Minus size="1rem" />
        </div>
        <div
          role="button"
          className="WindowControl"
          onClick={() =>
            ipcRenderer.send(
              isMaximized
                ? titleBarChannels.unmaximize
                : titleBarChannels.maximize
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              ipcRenderer.send(
                isMaximized
                  ? titleBarChannels.unmaximize
                  : titleBarChannels.maximize
              );
          }}
          tabIndex={-1}
        >
          {isMaximized ? (
            <svg
              width="0.75rem"
              height="0.75rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-square"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="g868" transform="translate(-2,2)">
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  ry="2"
                  id="rect2"
                />
                <path
                  id="rect291"
                  d="M 9,-1 C 7.8920011,-1 7,-0.10799889 7,1 v 2 h 12 c 1.107999,0 2,0.8920011 2,2 v 12 h 2 c 1.107999,0 2,-0.892001 2,-2 V 1 c 0,-1.10799889 -0.892001,-2 -2,-2 z"
                />
              </g>
            </svg>
          ) : (
            <Square size="0.8rem" />
          )}
        </div>
        <div
          role="button"
          className="WindowControl closeButton"
          onClick={() => ipcRenderer.send(titleBarChannels.quit)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') ipcRenderer.send(titleBarChannels.quit);
            if (e.key === 'Enter') ipcRenderer.send(titleBarChannels.quit);
          }}
          tabIndex={-1}
        >
          <X size="1rem" />
        </div>
      </div>
      <TitleBarStateNode />
    </div>
  );
};

ipcRenderer.on(mainProcessChannels.openSequence, (_, filePath) => {
  if (typeof filePath !== 'string') return;
  const fileName = pathParse(filePath).base;

  titleEmitter.emit('setTitle', `Dasher Sequencer - Editing ${fileName}`);
});

export default TitleBar;
